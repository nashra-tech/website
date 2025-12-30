# Multi-Tenant Blog Architecture

This document explains the Next.js multi-tenant blog architecture, including folder structure, data flow, and migration strategy.

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Data Architecture](#data-architecture)
4. [Tenant Configuration](#tenant-configuration)
5. [Post Management](#post-management)
6. [Routing Strategy](#routing-strategy)
7. [Migration to API](#migration-to-api)
8. [Component Reference](#component-reference)

---

## Overview

This is a **production-ready multi-tenant blog platform** built with:

- **Next.js 14** (App Router)
- **TypeScript** (full type safety)
- **shadcn/ui** (UI components)
- **Static data** (easily replaceable with API calls)

Each tenant has:
- Unique subdomain or route
- Independent blog posts
- Custom branding and footer
- RTL/LTR support
- Subscription functionality

---

## Folder Structure

```
website-demo/
├── app/
│   ├── s/
│   │   └── [subdomain]/
│   │       ├── page.tsx                    # Post list (homepage)
│   │       └── posts/
│   │           └── [slug]/
│   │               ├── page.tsx            # Server component (data fetching)
│   │               └── post-detail-client.tsx  # Client component (interactivity)
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Main landing page
│
├── components/
│   └── blog/
│       ├── website-layout.tsx              # Header & tenant wrapper
│       ├── website-footer.tsx              # Footer with subscribe form
│       ├── subscribe-form.tsx              # Email subscription
│       ├── blog-post-item.tsx              # Post list item
│       └── pagination.tsx                  # Pagination component
│
├── lib/
│   └── data/
│       ├── index.ts                        # Data access layer (DAL)
│       ├── tenants.ts                      # Static tenant data
│       └── posts.ts                        # Static post data
│
├── types/
│   ├── tenant.ts                           # Tenant type definitions
│   ├── post.ts                             # Post type definitions
│   └── index.ts                            # Type exports
│
└── middleware.ts                           # Subdomain routing logic
```

---

## Data Architecture

### **Three-Layer Approach**

```
┌─────────────────┐
│   Components    │  ← Use data access functions
└────────┬────────┘
         │
┌────────▼────────┐
│  Data Access    │  ← getTenantBySlug(), getPosts()
│  Layer (DAL)    │     getPostBySlug(), getMorePosts()
└────────┬────────┘
         │
┌────────▼────────┐
│  Static Data    │  ← TENANTS_DB[], POSTS_DB[]
│  (lib/data)     │     (Replace with API calls later)
└─────────────────┘
```

### **Why This Matters**

- **Components never access raw data** - they use DAL functions
- **Switching to an API** only requires changing the DAL
- **Type safety** is maintained throughout

---

## Tenant Configuration

### **Tenant Data Structure**

Each tenant has:

```typescript
{
  uuid: string;
  slug: string;              // Used for subdomain/routing
  name: string;              // Display name
  title: string;             // SEO title
  subtitle: string;          // Tagline
  description: string;       // Meta description
  logo?: string;             // Optional logo URL

  footer_data: {
    physical_address?: string;
    social_links: SocialLink[];
    footer_text?: string;
  };

  website_direction?: 'ltr' | 'rtl';  // Text direction
  has_paid_subscription?: boolean;     // Branding control
}
```

### **Example Tenant**

```typescript
{
  slug: 'tech-insights',
  name: 'Tech Insights',
  description: 'Exploring emerging technologies...',
  footer_data: {
    physical_address: '123 Tech Street, San Francisco, CA 94105',
    social_links: [
      { name: 'Twitter', url: 'https://twitter.com/techinsights' },
      { name: 'GitHub', url: 'https://github.com/techinsights' },
    ],
  },
  website_direction: 'ltr',
}
```

### **Location**

Defined in: `lib/data/tenants.ts`

---

## Post Management

### **Post Data Structure**

```typescript
{
  uuid: string;
  slug: string;              // URL-friendly identifier
  tenant_slug: string;       // Reference to tenant

  title: string;
  subtitle?: string;
  website_content: string;   // HTML content

  main_image_url?: string;
  main_image_thumb_url?: string;

  publish_date: string;      // ISO 8601 format
  created_at: string;
  updated_at: string;

  published: boolean;        // Visibility control
}
```

### **Example Post**

```typescript
{
  slug: 'getting-started-with-nextjs-14',
  tenant_slug: 'tech-insights',
  title: 'Getting Started with Next.js 14',
  subtitle: 'A comprehensive guide...',
  website_content: '<div class="prose">...</div>',
  publish_date: '2024-12-15T10:00:00Z',
  published: true,
}
```

### **Location**

Defined in: `lib/data/posts.ts`

---

## Routing Strategy

### **Subdomain-Based Multi-Tenancy**

| URL | Route | Description |
|-----|-------|-------------|
| `tech-insights.localhost/` | `/s/tech-insights` | Post list homepage |
| `tech-insights.localhost/posts/my-post` | `/s/tech-insights/posts/my-post` | Post detail |
| `example.com/` | `/` | Main landing page |

### **How It Works**

1. **Middleware** (`middleware.ts`) extracts subdomain
2. **Rewrites** URL to internal route structure
3. **Pages** receive tenant slug and fetch data

### **Example Flow**

```
User visits: tech-insights.localhost/
      ↓
Middleware extracts: "tech-insights"
      ↓
Rewrites to: /s/tech-insights
      ↓
Page fetches tenant & posts data
      ↓
Renders: Homepage with blog posts
```

---

## Migration to API

### **Current: Static Data**

```typescript
// lib/data/index.ts
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const tenant = TENANTS_DB.find((t) => t.slug === slug);
  return tenant || null;
}
```

### **Future: API Calls**

```typescript
// lib/data/index.ts
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const response = await fetch(`${process.env.API_URL}/api/tenants/${slug}`, {
    cache: 'no-store', // or use Next.js revalidation
  });

  if (!response.ok) {
    return null;
  }

  const tenant = await response.json();
  return tenant;
}
```

### **Migration Checklist**

- [ ] Create API endpoints (`/api/tenants`, `/api/posts`)
- [ ] Replace static data imports in `lib/data/index.ts`
- [ ] Update data access functions to call API
- [ ] Add error handling and loading states
- [ ] Configure caching strategy (ISR, on-demand revalidation)
- [ ] Remove `lib/data/tenants.ts` and `lib/data/posts.ts`

**✅ All component code remains unchanged!**

---

## Component Reference

### **WebsiteLayout**

Header wrapper with logo and subscribe button.

```tsx
import { WebsiteLayout } from '@/components/blog/website-layout';

<WebsiteLayout tenant={tenant}>
  {children}
</WebsiteLayout>
```

### **WebsiteFooter**

Footer with subscription form and social links.

```tsx
import { WebsiteFooter } from '@/components/blog/website-footer';

<WebsiteFooter tenant={tenant} />
```

### **BlogPostItem**

List item for displaying posts.

```tsx
import { BlogPostItem } from '@/components/blog/blog-post-item';

<BlogPostItem
  post={post}
  tenantSlug={subdomain}
  tenantDirection="ltr"
  isFirst={index === 0}
/>
```

### **Pagination**

Pagination controls for post lists.

```tsx
import { Pagination } from '@/components/blog/pagination';

<Pagination
  currentPage={posts.current_page}
  totalPages={posts.last_page}
  perPage={posts.per_page}
  total={posts.total}
  from={posts.from}
  to={posts.to}
  tenantDirection="ltr"
/>
```

---

## Data Access Functions

All available in `lib/data/index.ts`:

### **Tenant Functions**

```typescript
getTenants(): Promise<Tenant[]>
getTenantBySlug(slug: string): Promise<Tenant | null>
getTenantByUuid(uuid: string): Promise<Tenant | null>
```

### **Post Functions**

```typescript
getPosts(tenantSlug: string, options?: { page, perPage, published }): Promise<PaginatedPosts>
getPostBySlug(tenantSlug: string, postSlug: string): Promise<Post | null>
getMorePosts(tenantSlug: string, currentPostUuid: string, limit?: number): Promise<Post[]>
searchPosts(tenantSlug: string, query: string): Promise<Post[]>
getPostCount(tenantSlug: string): Promise<number>
```

---

## Key Features

### **✅ Production-Ready**
- Full TypeScript support
- SEO-optimized metadata
- Server-side rendering
- Error handling (404 pages)

### **✅ Scalable**
- Clean separation of concerns
- Easy API migration path
- Reusable components
- Type-safe data access

### **✅ Multi-Tenant**
- Subdomain-based routing
- Independent tenant data
- RTL/LTR support
- Custom branding per tenant

### **✅ Developer Experience**
- Modular architecture
- Clear migration path
- Well-documented code
- Consistent patterns

---

## Quick Start

1. **Add a new tenant:**
   ```typescript
   // lib/data/tenants.ts
   {
     slug: 'my-blog',
     name: 'My Blog',
     // ... other fields
   }
   ```

2. **Add posts for that tenant:**
   ```typescript
   // lib/data/posts.ts
   {
     tenant_slug: 'my-blog',
     slug: 'my-first-post',
     // ... other fields
   }
   ```

3. **Access your tenant:**
   ```
   my-blog.localhost:3000
   ```

---

## Questions?

- **Data Access Layer**: `lib/data/index.ts`
- **Type Definitions**: `types/`
- **Components**: `components/blog/`
- **Routing**: `middleware.ts` and `app/s/[subdomain]/`

Built with ❤️ using Next.js 14, TypeScript, and shadcn/ui.
