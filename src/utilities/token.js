import crypto from 'crypto';

/**
 * Generate Key
 * @return {String}
 */
export function generateKey() {
  return crypto.randomBytes(20).toString('hex');
}
