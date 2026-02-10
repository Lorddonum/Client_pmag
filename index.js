// Simple entry point - just run npm start
import { spawn } from 'child_process';

console.log('Starting Paralight application...');

const child = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
});

child.on('error', (err) => {
    console.error('Failed to start:', err);
    process.exit(1);
});
