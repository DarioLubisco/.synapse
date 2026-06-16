#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Load Token from ~/.gemini/config/mcp_config.json
const configPath = path.join(process.env.HOME, '.gemini/config/mcp_config.json');
let token = '';
try {
  const configRaw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(configRaw);
  token = config.mcpServers?.notion?.env?.NOTION_API_TOKEN;
  if (!token) throw new Error('NOTION_API_TOKEN not found in mcp_config.json');
} catch (e) {
  console.error('Failed to load Notion token:', e.message);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node sync_notion_state.js <TASK_ID> <STATE>');
  process.exit(1);
}

function normalizeState(state) {
  const lower = state.toLowerCase().replace(/[-_]/g, ' ');
  if (lower === 'in progress') return 'In progress';
  if (lower === 'done' || lower === 'completed' || lower === 'complete') return 'Done';
  if (lower === 'not started' || lower === 'to do' || lower === 'todo') return 'Not started';
  return state; // fallback
}

const taskId = args[0];
const targetState = normalizeState(args[1]);

function request(endpoint, method, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      path: `/v1${endpoint}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!res.statusCode.toString().startsWith('2')) {
            reject(new Error(json.message || `HTTP ${res.statusCode}`));
          } else {
            resolve(json);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  try {
    console.log(`[Notion Sync] Searching for task: ${taskId}...`);
    // Search for the task globally. The unique ID is typically queryable.
    const searchRes = await request('/search', 'POST', { query: taskId });
    const pages = searchRes.results.filter(r => r.object === 'page');
    
    if (pages.length === 0) {
      console.log(`[Notion Sync] No page found for ${taskId}. Skipping Notion sync.`);
      return;
    }
    
    // We assume the first result that matches the query is the correct page
    const pageId = pages[0].id;
    console.log(`[Notion Sync] Found page ${pageId}. Updating status to '${targetState}'...`);
    
    // Update the state
    await request(`/pages/${pageId}`, 'PATCH', {
      properties: {
        'Estado': {
          status: { name: targetState }
        }
      }
    });
    
    console.log(`[Notion Sync] Successfully updated ${taskId} to '${targetState}'.`);
  } catch (err) {
    console.error('[Notion Sync] Error:', err.message);
  }
}

main();
