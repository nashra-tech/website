# API Migration Documentation

This document explains the migration from static data to API-driven architecture in the Next.js frontend.

## Overview

The application has been migrated from using static/mock data to consuming real Laravel backend APIs. This migration maintains backward compatibility - all existing pages and components work without modification.

## Architecture

### Directory Structure

```
lib/
├── api/
│   ├── config.ts              # API configuration and settings
│   ├── client.ts              # Core HTTP client (GET/POST)
│   ├── errors.ts              # Error handling and custom error classes
│   ├── adapters.ts            # API-to-App type conversion
│   ├── services/
│   │   ├── tenants.ts         # Tenant API calls
│   │   ├── posts.ts           # Posts API calls
│   │   ├── magic-links.ts     # Magic link API calls
│   │   └── subscriptions.ts   # Newsletter subscription API calls
│   └── index.ts               # Main export
├── data/
│   ├── index.ts               # Data access layer (uses API now)
│   └── magic-links.ts         # Magic link helpers (uses API now)
types/
└── api.ts                     # API response type definitions
```

### Key Components

#### 1. API Client (`lib/api/client.ts`)

Core HTTP client providing:
- `apiGet<T>()` - GET requests with caching support
- `apiPost<T>()` - POST requests
- Built-in timeout handling
- Next.js caching integration (`revalidate`, `cache: 'no-store'`)

#### 2. Error Handling (`lib/api/errors.ts`)

Custom `ApiError` class with:
- Error code mapping
- User-friendly error messages
- Validation error details
- Network error handling

#### 3. Type Adapters (`lib/api/adapters.ts`)

Converts API response types to internal application types:
- `adaptTenant()` - API Tenant → Internal Tenant
- `adaptPostDetail()` - API Post → Internal Post
- `adaptPaginatedPosts()` - API Paginated Response → Internal PaginatedPosts
- `adaptMagicLinkForm()` - API Magic Link → Internal MagicLinkForm

#### 4. Service Layer (`lib/api/services/`)

Domain-specific API calls:
- **Tenants**: `getTenantBySlug()`
- **Posts**: `getPosts()`, `getPostBySlug()`, `getMorePosts()`
- **Magic Links**: `getMagicLinkFormByIdentifier()`, `subscribeMagicLink()`
- **Subscriptions**: `subscribeToNewsletter()`

## Data Fetching Strategy

### Server Components (Preferred)

All main pages use Server Components with API calls:

```typescript
// app/s/[subdomain]/page.tsx
export default async function TenantHomePage({ params, searchParams }: PageProps) {
  const tenant = await getTenantBySlug(subdomain);
  const posts = await getPosts(subdomain, { page, perPage: 10 });
  // ...
}
```

**Benefits:**
- No client-side JavaScript for data fetching
- SEO-friendly (fully rendered HTML)
- Automatic request deduplication by Next.js
- Built-in caching with `revalidate`

### Client Components

Used only for interactive features:
- Subscribe forms
- Magic link subscription forms

Dynamic imports prevent bundling API code in client bundles:

```typescript
const { subscribeToNewsletter } = await import('@/lib/api');
```

## Caching Strategy

### Cache Times (configured in `lib/api/config.ts`)

| Resource | Cache Duration | Endpoint |
|----------|----------------|----------|
| Tenant info | 1 hour | `GET /api/v1/tenants/{slug}` |
| Posts (page 1) | 10 minutes | `GET /api/v1/tenants/{slug}/posts?page=1` |
| Posts (other pages) | 15 minutes | `GET /api/v1/tenants/{slug}/posts?page=N` |
| Post detail | 30 minutes | `GET /api/v1/tenants/{slug}/posts/{slug}` |
| Magic link form | 30 minutes | `GET /api/v1/tenants/{slug}/magic-links/{id}` |

### Implementation

```typescript
// Cached GET request
const response = await apiGet<ApiTenant>(`/tenants/${slug}`, {
  revalidate: 3600, // 1 hour
});

// No cache (write operations)
const response = await apiPost<Request, Response>(`/subscribe`, data, {
  cache: 'no-store',
});
```

## API Endpoints

### 1. Get Tenant Information

```typescript
GET /api/v1/tenants/{slug}

Response:
{
  "data": {
    "slug": "example",
    "name": "Example Newsletter",
    "logo": "https://...",
    "website_language": "en",
    "website_direction": "ltr",
    "is_rtl": false,
    "has_active_subscription": true,
    "newsletter": {
      "name": "Example Newsletter",
      "requires_confirmation": false
    }
  }
}
```

### 2. Get Posts List

```typescript
GET /api/v1/tenants/{slug}/posts?page=1&per_page=10

Response:
{
  "data": [
    {
      "id": 123,
      "uuid": "550e8400-...",
      "title": "Post Title",
      "slug": "post-slug",
      "subtitle": "Subtitle",
      "publish_date": "2025-12-31",
      "main_image_url": "https://...",
      "main_image_thumb_url": "https://..."
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50,
    "from": 1,
    "to": 10
  }
}
```

### 3. Get Single Post

```typescript
GET /api/v1/tenants/{slug}/posts/{post_slug}

Response:
{
  "data": {
    "id": 123,
    "uuid": "550e8400-...",
    "title": "Post Title",
    "content": "<h1>HTML content</h1>",
    // ... other fields
  }
}
```

### 4. Subscribe to Newsletter

```typescript
POST /api/v1/tenants/{slug}/subscribe
Body: { "email": "user@example.com", "name": "John Doe" }

Response:
{
  "data": {
    "uuid": "550e8400-...",
    "email": "user@example.com",
    "first_name": "John",
    "subscribed_at": "2025-12-31T12:00:00+00:00"
  },
  "message": "Successfully subscribed to newsletter"
}
```

### 5. Magic Link Subscription

```typescript
GET /api/v1/tenants/{slug}/magic-links/{identifier}
POST /api/v1/tenants/{slug}/magic-links/{identifier}

Response Headers:
- X-Already-Subscribed: true/false
- X-Has-Published-Posts: true/false
```

## Error Handling

### Error Codes

```typescript
enum ApiErrorCode {
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',
  POST_NOT_FOUND = 'POST_NOT_FOUND',
  MAGIC_LINK_INVALID = 'MAGIC_LINK_INVALID',
  EMAIL_ALREADY_SUBSCRIBED = 'EMAIL_ALREADY_SUBSCRIBED',
  SUBSCRIPTION_FAILED = 'SUBSCRIPTION_FAILED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}
```

### Usage

```typescript
try {
  await subscribeToNewsletter(slug, email);
} catch (error) {
  if (error instanceof ApiError) {
    // Get user-friendly message
    const message = error.getUserMessage();

    // Check specific error
    if (error.is(ApiErrorCode.EMAIL_ALREADY_SUBSCRIBED)) {
      // Handle already subscribed
    }

    // Get validation errors
    const validationErrors = error.getValidationErrors();
  }
}
```

## Page Rendering Strategy

### Home Page (`/s/[subdomain]`)
- **Type**: Server Component
- **Rendering**: Dynamic (depends on `page` query param)
- **Data**: Tenant info + paginated posts
- **Cache**: Tenant (1h), Posts (10-15min)

### Post Detail (`/s/[subdomain]/posts/[slug]`)
- **Type**: Server Component
- **Rendering**: Static with revalidation
- **Data**: Tenant info + post content + related posts
- **Cache**: 30 minutes

### Magic Link Page (`/s/[subdomain]/magic/[identifier]`)
- **Type**: Server Component + Client Component
- **Rendering**: Dynamic
- **Data**: Tenant info + magic link form config
- **Cache**: 30 minutes (form config)

## Environment Configuration

### Required Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1
```

### Production Setup

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_API_VERSION=v1
```

## Migration Checklist

- [✅] API client infrastructure
- [✅] Error handling system
- [✅] Type definitions for API responses
- [✅] Service layer for all endpoints
- [✅] Adapter functions for type conversion
- [✅] Updated data access layer
- [✅] Updated all pages to use API
- [✅] Updated components (subscribe forms)
- [✅] Environment configuration
- [✅] Caching strategy implementation

## Testing

### Manual Testing Checklist

1. **Home Page**
   - [ ] Tenant loads correctly
   - [ ] Posts list displays
   - [ ] Pagination works
   - [ ] Empty state shows when no posts

2. **Post Detail Page**
   - [ ] Post content displays
   - [ ] Related posts show
   - [ ] 404 for invalid slug

3. **Subscribe Form**
   - [ ] Email validation
   - [ ] Success message
   - [ ] Error handling (already subscribed)
   - [ ] Loading state

4. **Magic Link Page**
   - [ ] Form loads correctly
   - [ ] Subscription works
   - [ ] Already subscribed message
   - [ ] Error handling

### API Testing

```bash
# Test tenant endpoint
curl http://localhost:8000/api/v1/tenants/sloom

# Test posts endpoint
curl http://localhost:8000/api/v1/tenants/sloom/posts?page=1&per_page=10

# Test post detail
curl http://localhost:8000/api/v1/tenants/sloom/posts/getting-started-with-nextjs-14

# Test subscription
curl -X POST http://localhost:8000/api/v1/tenants/sloom/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Performance Optimization

### Implemented Optimizations

1. **Next.js Caching**: Uses `revalidate` for automatic cache management
2. **Request Deduplication**: Next.js automatically deduplicates identical requests
3. **Streaming**: Server Components stream content as it loads
4. **Dynamic Imports**: Client-side API code only loaded when needed

### Future Optimizations

- Implement Redis caching on backend
- Add CDN for static assets
- Consider ISR (Incremental Static Regeneration) for popular posts
- Implement optimistic UI updates for subscriptions

## Troubleshooting

### Common Issues

**Issue**: 404 errors for all API calls
- **Solution**: Check `NEXT_PUBLIC_API_URL` in `.env.local`

**Issue**: CORS errors
- **Solution**: Ensure Laravel backend has CORS configured for your domain

**Issue**: Stale data showing
- **Solution**: Check cache times in `lib/api/config.ts`, consider reducing `revalidate` values

**Issue**: Type errors after API updates
- **Solution**: Update types in `types/api.ts` to match new API response structure

## Best Practices

1. **Always use Server Components** for data fetching when possible
2. **Handle errors gracefully** with user-friendly messages
3. **Use type adapters** to isolate API changes from app logic
4. **Configure appropriate cache times** based on data freshness requirements
5. **Test error states** - network failures, 404s, validation errors
6. **Use dynamic imports** for client-side API calls to reduce bundle size

## Further Reading

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Laravel API Resources](https://laravel.com/docs/eloquent-resources)
