/**
 * Generates a UUID v4 compatible string
 * Uses crypto.randomUUID() if available, otherwise falls back to a custom implementation
 * This ensures compatibility across all browsers and devices
 */
export function generateUUID(): string {
  // Check if crypto.randomUUID is available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch (error) {
      // Fall through to fallback implementation
    }
  }

  // Fallback implementation for older browsers and mobile devices
  // RFC4122 version 4 compliant UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

