#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const project = fileURLToPath(new URL('../example/', import.meta.url));
const [action = 'dev', ...args] = process.argv.slice(2);
async function run(command, parameters) {
  const child = spawn(command, parameters, { cwd: project, stdio: 'inherit' });
  const stop = signal => { if (!child.killed) child.kill(signal); };
  const onInterrupt = () => stop('SIGINT');
  const onTerminate = () => stop('SIGTERM');
  process.on('SIGINT', onInterrupt);
  process.on('SIGTERM', onTerminate);
  try {
    return await new Promise((resolve, reject) => {
      child.once('error', reject);
      child.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
    });
  } finally {
    process.removeListener('SIGINT', onInterrupt);
    process.removeListener('SIGTERM', onTerminate);
  }
}
if (action === 'setup') {
  let status = args.includes('--component') ? 0 : await run('npm', ['ci', '--no-audit', '--no-fund']);
  const proxyArgs = process.execArgv.includes('--use-env-proxy') ? ['--use-env-proxy'] : [];
  if (status === 0) status = await run(process.execPath, [...proxyArgs, 'scripts/setup-reactbits.mjs', ...args]);
  process.exitCode = status;
} else if (['dev', 'preview'].includes(action)) {
  const vite = path.join(project, 'node_modules/vite/bin/vite.js');
  process.exitCode = await run(process.execPath, [vite, ...(action === 'preview' ? ['preview'] : []), '--host', '127.0.0.1', ...args]);
} else if (action === 'docs') {
  process.exitCode = await run(process.execPath, ['tooling/progressive/rebuild-kit-docs.mjs', ...args]);
} else if (action === 'build') {
  const verified = await run(process.execPath, ['scripts/verify-upstream.mjs']);
  process.exitCode = verified === 0 ? await run(process.execPath, [path.join(project, 'node_modules/vite/bin/vite.js'), 'build', ...args]) : verified;
} else {
  throw new Error('Usage: node scripts/example.mjs setup|dev|preview|docs|build [arguments]');
}
