// src/isDocker.ts
import { OnServer } from './onServer';

export const isDocker = (): boolean => {
  // If we're not on the server, we're definitely not in Docker
  if (!OnServer()) {
    return false;
  }

  // Use environment variable detection, which works across platforms
  if (process.env.DOCKER === 'true' || process.env.IS_DOCKER === '1') {
    return true;
  }

  // For Node.js environments, add fallback file-based checks
  if (typeof window === 'undefined' && typeof process !== 'undefined') {
    try {
      // Use process-based checks instead of fs
      const indicators = [
        // Check for Docker-specific environment variables
        () => !!process.env.DOCKER,
        () => !!process.env.CONTAINER,
        
        // Fallback to file checks if possible
        () => {
          try {
            // Only require fs if absolutely necessary
            const fs = require('fs');
            return (
              (fs.existsSync('/proc/self/cgroup') && 
               fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker')) ||
              fs.existsSync('/.dockerenv')
            );
          } catch {
            return false;
          }
        }
      ];

      return indicators.some(check => {
        try {
          return check();
        } catch {
          return false;
        }
      });
    } catch {
      return false;
    }
  }

  return false;
};