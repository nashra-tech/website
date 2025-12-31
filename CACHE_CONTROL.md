# API Cache Control

## Overview

The API layer supports dynamic cache control via environment variable, allowing you to enable or disable caching for testing and development purposes.

## Environment Variable

```bash
NEXT_PUBLIC_ENABLE_API_CACHE=false  # Disable caching
NEXT_PUBLIC_ENABLE_API_CACHE=true   # Enable caching (default)
```

## Usage

### Development/Testing (Disable Cache)

When testing API integration or debugging, you want to disable caching to see real-time changes:

```bash
# .env.local
NEXT_PUBLIC_ENABLE_API_CACHE=false
```

**Benefits:**
- ✅ Every request hits the API (no stale data)
- ✅ Immediate feedback on API changes
- ✅ Easier to test error scenarios
- ✅ Verify API responses in real-time

### Production (Enable Cache)

For production, enable caching to improve performance:

```bash
# .env.production
NEXT_PUBLIC_ENABLE_API_CACHE=true
```

**Benefits:**
- ✅ Reduced API load
- ✅ Faster page loads
- ✅ Lower bandwidth usage
- ✅ Better user experience

## How It Works

### When Cache is Enabled (`true`)

The API client uses Next.js caching with different revalidation times:

```typescript
// Tenant info - cached for 1 hour
await getTenantBySlug('example');

// Posts (page 1) - cached for 10 minutes
await getPosts('example', { page: 1 });

// Post detail - cached for 30 minutes
await getPostBySlug('example', 'post-slug');
```

### When Cache is Disabled (`false`)

All API requests use `cache: 'no-store'`:

```typescript
// Every request bypasses cache and hits the API
await getTenantBySlug('example');  // Fresh data
await getPosts('example');          // Fresh data
await getPostBySlug('example', 'post-slug');  // Fresh data
```

## Implementation Details

### Config (`lib/api/config.ts`)

```typescript
export const API_CONFIG = {
  // Reads from environment variable
  enableCache: process.env.NEXT_PUBLIC_ENABLE_API_CACHE !== 'false',

  // Cache times (only used when enableCache is true)
  revalidate: {
    tenant: 3600,      // 1 hour
    postsPage1: 600,   // 10 minutes
    postsOther: 900,   // 15 minutes
    postDetail: 1800,  // 30 minutes
    magicLink: 1800,   // 30 minutes
  },
};
```

### Client (`lib/api/client.ts`)

```typescript
// Apply Next.js caching strategy
if (!API_CONFIG.enableCache) {
  // Cache disabled globally
  requestOptions.cache = 'no-store';
} else if (revalidate !== undefined) {
  // Cache enabled, use revalidation times
  requestOptions.next = { revalidate };
}
```

## Examples

### Example 1: Testing API Integration

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENABLE_API_CACHE=false
```

Start your dev server:
```bash
pnpm dev
```

Now every page load will fetch fresh data from your API.

### Example 2: Production Deployment

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_ENABLE_API_CACHE=true
```

Build and deploy:
```bash
pnpm build
pnpm start
```

The app will use optimized caching for better performance.

### Example 3: Testing Specific Scenarios

**Test 404 errors:**
```bash
# Disable cache
NEXT_PUBLIC_ENABLE_API_CACHE=false pnpm dev

# Visit non-existent tenant
http://localhost:3000/s/nonexistent
```

**Test subscription flow:**
```bash
# Disable cache to see real-time subscription status
NEXT_PUBLIC_ENABLE_API_CACHE=false pnpm dev
```

## Best Practices

### ✅ Development
- **Disable cache** during active development
- Easier to debug API issues
- See changes immediately

### ✅ Staging
- **Enable cache** to test production-like behavior
- Verify cache invalidation works correctly
- Test with realistic load

### ✅ Production
- **Always enable cache** for optimal performance
- Monitor cache hit rates
- Adjust revalidation times based on data freshness needs

## Troubleshooting

### Issue: Not seeing API changes

**Solution:** Check if cache is enabled

```bash
# Disable cache temporarily
NEXT_PUBLIC_ENABLE_API_CACHE=false
```

### Issue: Slow page loads in development

**Solution:** Enable cache to improve dev server performance

```bash
# Enable cache
NEXT_PUBLIC_ENABLE_API_CACHE=true
```

### Issue: Stale data in production

**Solution:**
1. Verify cache is enabled
2. Check revalidation times in `lib/api/config.ts`
3. Consider reducing cache times for frequently changing data

## Verifying Cache Status

You can check if caching is enabled in your app:

```typescript
import { API_CONFIG } from '@/lib/api/config';

console.log('Cache enabled:', API_CONFIG.enableCache);
console.log('Cache times:', API_CONFIG.revalidate);
```

## Notes

- ⚠️ **Environment variable must start with `NEXT_PUBLIC_`** to be accessible in the browser
- ⚠️ **Rebuild required** after changing environment variables
- ⚠️ **POST requests** are never cached (always use `cache: 'no-store'`)
- ✅ **Server Components** automatically deduplicate requests even without caching

## Related Files

- `lib/api/config.ts` - Cache configuration
- `lib/api/client.ts` - Cache implementation
- `.env.local` - Development settings
- `.env.example` - Example configuration

---

**Quick Reference:**

```bash
# Development - Fresh data every time
NEXT_PUBLIC_ENABLE_API_CACHE=false

# Production - Optimized caching
NEXT_PUBLIC_ENABLE_API_CACHE=true
```
