// URL validation utilities for security

/**
 * Validates if a URL is safe for use as product image
 * Prevents malicious URLs and ensures proper format
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Allow only HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Block potentially dangerous domains
    const dangerousDomains = ['localhost', '127.0.0.1', '0.0.0.0', '10.', '192.168.', '172.'];
    if (dangerousDomains.some(domain => urlObj.hostname.includes(domain))) {
      return false;
    }
    
    // Check for common image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExtension = imageExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    );
    
    return hasValidExtension;
  } catch {
    return false;
  }
};

/**
 * Sanitizes image URL by removing potentially dangerous parameters
 */
export const sanitizeImageUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // Remove potentially dangerous query parameters
    const dangerousParams = ['script', 'eval', 'javascript', 'data', 'onload', 'onerror'];
    
    dangerousParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    return urlObj.toString();
  } catch {
    return '';
  }
};

/**
 * Rate limiting utility for authentication attempts
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Reset if window has passed
    if (now - record.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Check if under limit
    if (record.count < this.maxAttempts) {
      record.count++;
      record.lastAttempt = now;
      return true;
    }
    
    return false;
  }
  
  getRemainingTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return 0;
    
    const elapsed = Date.now() - record.lastAttempt;
    return Math.max(0, this.windowMs - elapsed);
  }
}