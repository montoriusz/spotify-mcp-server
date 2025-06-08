#!/usr/bin/env node

import { authorizeSpotify } from './utils/authorize-spotify.js';

const terminalMode = process.stdout.isTTY;

if (terminalMode) {
  console.log('Starting Spotify authentication flow...');
}

authorizeSpotify(terminalMode)
  .then(() => {
    if (terminalMode) {
      console.log('Authentication completed successfully!');
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error('Authentication failed:', error);
    process.exit(1);
  });
