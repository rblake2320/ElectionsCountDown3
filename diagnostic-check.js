#!/usr/bin/env node

/**
 * Comprehensive Diagnostic Script
 * Identifies why the server connection is being refused
 */

import { spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 COMPREHENSIVE DIAGNOSTIC CHECK');
console.log('=================================\n');

// 1. Check if required files exist
console.log('📁 Checking file structure...');
const requiredFiles = [
  'server/index.ts',
  'client/index.html',
  'client/src/main.tsx',
  'client/src/App.tsx',
  'package.json'
];

let missingFiles = [];
requiredFiles.forEach(file => {
  if (existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} MISSING`);
    missingFiles.push(file);
  }
});

// 2. Check package.json scripts
console.log('\n📋 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts || {};
  
  console.log('Available scripts:');
  Object.entries(scripts).forEach(([name, command]) => {
    console.log(`  ${name}: ${command}`);
  });
  
  if (!scripts.dev) {
    console.log('❌ Missing "dev" script');
  }
  if (!scripts['dev:frontend']) {
    console.log('❌ Missing "dev:frontend" script');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// 3. Check if ports are available
console.log('\n🔌 Checking port availability...');
async function checkPort(port) {
  try {
    const response = await fetch(`http://localhost:${port}/api/health`, {
      timeout: 2000
    });
    return { port, status: 'occupied', response: response.status };
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return { port, status: 'available', error: 'Connection refused' };
    }
    return { port, status: 'unknown', error: error.message };
  }
}

const ports = [3000, 5000, 5173, 8080];
for (const port of ports) {
  const result = await checkPort(port);
  console.log(`Port ${result.port}: ${result.status} ${result.error ? `(${result.error})` : ''}`);
}

// 4. Try to start the server and check if it responds
console.log('\n🚀 Testing server startup...');
function testServerStartup() {
  return new Promise((resolve) => {
    const serverProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });
    
    let output = '';
    let errorOutput = '';
    
    serverProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log('STDOUT:', data.toString().trim());
    });
    
    serverProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.log('STDERR:', data.toString().trim());
    });
    
    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code: ${code}`);
      resolve({ code, output, errorOutput });
    });
    
    serverProcess.on('error', (error) => {
      console.log('Server process error:', error.message);
      resolve({ error: error.message, output, errorOutput });
    });
    
    // Kill the process after 10 seconds
    setTimeout(() => {
      serverProcess.kill();
      resolve({ timeout: true, output, errorOutput });
    }, 10000);
  });
}

const serverResult = await testServerStartup();

// 5. Check environment variables
console.log('\n🌍 Checking environment...');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`PORT: ${process.env.PORT || 'not set (will default to 5000)'}`);

// 6. Check if we're in a container/replit environment
console.log('\n🏠 Environment detection...');
if (process.env.REPL_ID) {
  console.log('✅ Running in Replit environment');
  console.log(`REPL_ID: ${process.env.REPL_ID}`);
} else {
  console.log('ℹ️  Not in Replit environment');
}

// 7. Final diagnosis
console.log('\n🩺 DIAGNOSIS');
console.log('============');

if (missingFiles.length > 0) {
  console.log('❌ CRITICAL: Missing required files:', missingFiles.join(', '));
  console.log('   → Need to create missing files first');
} else if (serverResult.error) {
  console.log('❌ CRITICAL: Server startup error:', serverResult.error);
  console.log('   → Fix server configuration issues');
} else if (serverResult.code !== null && serverResult.code !== 0) {
  console.log(`❌ CRITICAL: Server exited with code ${serverResult.code}`);
  console.log('   → Check server logs above for specific errors');
} else if (serverResult.timeout) {
  console.log('⚠️  Server started but may have issues');
  console.log('   → Check if server is binding to correct host/port');
} else {
  console.log('✅ Server appears to start correctly');
  console.log('   → Issue may be with frontend or port configuration');
}

console.log('\n💡 RECOMMENDED ACTIONS:');
if (missingFiles.length > 0) {
  console.log('1. Create missing files');
}
console.log('2. Ensure both backend (npm run dev) and frontend (npm run dev:frontend) are running');
console.log('3. Check that preview is pointing to the correct port');
console.log('4. Try accessing http://localhost:5000 directly if possible');