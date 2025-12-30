/**
 * Static Post Data
 *
 * This file contains static post data objects.
 * In production, replace this with API calls to fetch post data from a database.
 *
 * Migration path:
 * 1. Replace POSTS_DB with: await fetch('/api/posts')
 * 2. Keep the Post type interface unchanged
 * 3. Update getPosts() and getPostBySlug() to call the API
 */

import { Post } from '@/types';

export const POSTS_DB: Post[] = [
  // Tech Insights posts
  {
    uuid: '750e8400-e29b-41d4-a716-446655440001',
    slug: 'getting-started-with-nextjs-14',
    tenant_slug: 'sloom',
    title: 'Getting Started with Next.js 14',
    subtitle: 'A comprehensive guide to the latest features in Next.js 14',
    website_content: `
      <div class="prose prose-lg">
        <p>Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. Let's explore what makes this release special.</p>

        <h3>Server Actions</h3>
        <p>Server Actions provide a seamless way to handle form submissions and data mutations without writing API routes. This reduces boilerplate and improves developer experience significantly.</p>

        <h3>Partial Prerendering</h3>
        <p>This experimental feature combines the best of static and dynamic rendering, allowing you to serve static content instantly while streaming dynamic content.</p>

        <h3>Improved Metadata API</h3>
        <p>SEO has never been easier with the enhanced Metadata API, supporting dynamic OG images, Twitter cards, and more.</p>

        <p>Next.js 14 is a game-changer for modern web development. Start building today!</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-15T10:00:00Z',
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z',
    published: true,
  },
  {
    uuid: '750e8400-e29b-41d4-a716-446655440002',
    slug: 'typescript-best-practices-2024',
    tenant_slug: 'tech-insights',
    title: 'TypeScript Best Practices for 2024',
    subtitle: 'Write safer, more maintainable code',
    website_content: `
      <div class="prose prose-lg">
        <p>TypeScript continues to evolve, and so should our coding practices. Here are the essential best practices for 2024.</p>

        <h3>1. Use Strict Mode</h3>
        <p>Always enable strict mode in your tsconfig.json. It catches potential bugs early and enforces better coding patterns.</p>

        <h3>2. Prefer Type Inference</h3>
        <p>Let TypeScript infer types when possible. Explicit types are great, but over-annotation can make code harder to read.</p>

        <h3>3. Leverage Utility Types</h3>
        <p>Built-in utility types like Partial, Pick, Omit, and Record can significantly reduce boilerplate and improve type safety.</p>

        <h3>4. Use Discriminated Unions</h3>
        <p>Discriminated unions provide excellent type narrowing and make state management more predictable.</p>

        <p>Master these practices to write production-ready TypeScript code!</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-10T14:30:00Z',
    created_at: '2024-12-10T14:30:00Z',
    updated_at: '2024-12-10T14:30:00Z',
    published: true,
  },
  {
    uuid: '750e8400-e29b-41d4-a716-446655440003',
    slug: 'building-scalable-apis-with-graphql',
    tenant_slug: 'tech-insights',
    title: 'Building Scalable APIs with GraphQL',
    subtitle: 'From basics to advanced patterns',
    website_content: `
      <div class="prose prose-lg">
        <p>GraphQL has transformed how we build and consume APIs. This guide covers everything from fundamentals to advanced patterns.</p>

        <h3>Why GraphQL?</h3>
        <p>Unlike REST, GraphQL allows clients to request exactly the data they need, reducing over-fetching and under-fetching issues.</p>

        <h3>Schema Design</h3>
        <p>A well-designed schema is the foundation of a great GraphQL API. Focus on modeling your domain, not your database.</p>

        <h3>DataLoader Pattern</h3>
        <p>Solve the N+1 query problem with DataLoader. It batches and caches requests, dramatically improving performance.</p>

        <h3>Security Considerations</h3>
        <p>Implement query depth limiting, cost analysis, and proper authentication to protect your GraphQL endpoint.</p>

        <p>GraphQL empowers you to build flexible, efficient APIs that scale with your application.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-05T09:15:00Z',
    created_at: '2024-12-05T09:15:00Z',
    updated_at: '2024-12-05T09:15:00Z',
    published: true,
  },
  {
    uuid: '750e8400-e29b-41d4-a716-446655440004',
    slug: 'react-server-components-explained',
    tenant_slug: 'tech-insights',
    title: 'React Server Components Explained',
    subtitle: 'The future of React architecture',
    website_content: `
      <div class="prose prose-lg">
        <p>React Server Components represent a fundamental shift in how we think about React applications. Let's demystify this powerful feature.</p>

        <h3>What Are Server Components?</h3>
        <p>Server Components run exclusively on the server, allowing you to access backend resources directly without exposing sensitive data to clients.</p>

        <h3>Benefits</h3>
        <p>Reduced bundle size, faster initial page loads, and direct database access without API routes make Server Components incredibly powerful.</p>

        <h3>When to Use Client Components</h3>
        <p>Use Client Components for interactivity: event handlers, hooks, and browser APIs. Everything else can be a Server Component.</p>

        <p>Server Components are not just a feature—they're the future of React development.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-11-28T11:00:00Z',
    created_at: '2024-11-28T11:00:00Z',
    updated_at: '2024-11-28T11:00:00Z',
    published: true,
  },

  // Design Matters posts
  {
    uuid: '750e8400-e29b-41d4-a716-446655440005',
    slug: 'design-systems-101',
    tenant_slug: 'design-matters',
    title: 'Design Systems 101',
    subtitle: 'Building consistency at scale',
    website_content: `
      <div class="prose prose-lg">
        <p>A design system is more than a component library—it's a shared language that unifies teams and accelerates product development.</p>

        <h3>Core Components</h3>
        <p>Start with foundations: typography, color palettes, spacing scales, and basic UI components. Build complexity gradually.</p>

        <h3>Documentation Matters</h3>
        <p>Great documentation is the difference between a design system that's adopted and one that's ignored. Show, don't just tell.</p>

        <h3>Governance and Evolution</h3>
        <p>Establish clear ownership and contribution guidelines. Your design system should evolve with your product.</p>

        <p>Invest in your design system, and it will pay dividends in velocity and consistency.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-12T13:00:00Z',
    created_at: '2024-12-12T13:00:00Z',
    updated_at: '2024-12-12T13:00:00Z',
    published: true,
  },
  {
    uuid: '750e8400-e29b-41d4-a716-446655440006',
    slug: 'color-theory-for-digital-design',
    tenant_slug: 'design-matters',
    title: 'Color Theory for Digital Design',
    subtitle: 'Creating harmonious color palettes',
    website_content: `
      <div class="prose prose-lg">
        <p>Color is one of the most powerful tools in a designer's arsenal. Understanding color theory elevates your design from good to exceptional.</p>

        <h3>The Color Wheel</h3>
        <p>Complementary, analogous, and triadic color schemes each create different moods and serve different purposes.</p>

        <h3>Accessibility First</h3>
        <p>Always ensure sufficient contrast ratios. Beautiful design that's inaccessible is not good design.</p>

        <h3>Psychology of Color</h3>
        <p>Colors evoke emotions. Blue builds trust, red creates urgency, green suggests growth. Choose intentionally.</p>

        <p>Master color theory to create designs that are both beautiful and effective.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-08T10:30:00Z',
    created_at: '2024-12-08T10:30:00Z',
    updated_at: '2024-12-08T10:30:00Z',
    published: true,
  },

  // Startup Journey posts
  {
    uuid: '750e8400-e29b-41d4-a716-446655440007',
    slug: 'from-idea-to-mvp-in-30-days',
    tenant_slug: 'startup-journey',
    title: 'From Idea to MVP in 30 Days',
    subtitle: 'Our sprint to launch',
    website_content: `
      <div class="prose prose-lg">
        <p>We built and launched our MVP in just 30 days. Here's exactly how we did it and what we learned.</p>

        <h3>Week 1: Validation</h3>
        <p>We talked to 50 potential customers before writing a single line of code. This saved us months of building the wrong thing.</p>

        <h3>Week 2-3: Building</h3>
        <p>Focus on the core value proposition. Everything else is a distraction. We shipped with just three features.</p>

        <h3>Week 4: Launch</h3>
        <p>Perfect is the enemy of done. We launched on Product Hunt with bugs we knew about. Users were forgiving because we were responsive.</p>

        <h3>Key Learnings</h3>
        <p>Speed matters. Customer feedback is gold. Technical debt is okay in the beginning. Ship, learn, iterate.</p>

        <p>Your MVP doesn't need to be perfect—it needs to solve a real problem.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-14T08:00:00Z',
    created_at: '2024-12-14T08:00:00Z',
    updated_at: '2024-12-14T08:00:00Z',
    published: true,
  },
  {
    uuid: '750e8400-e29b-41d4-a716-446655440008',
    slug: 'raising-our-seed-round',
    tenant_slug: 'startup-journey',
    title: 'Raising Our Seed Round',
    subtitle: 'Lessons from 47 investor meetings',
    website_content: `
      <div class="prose prose-lg">
        <p>We pitched 47 investors and closed a $2M seed round. Here's what worked, what didn't, and what I wish I knew before we started.</p>

        <h3>The Numbers Game</h3>
        <p>Most investors will say no. That's okay. You only need one yes. But you need a lot of nos to get there.</p>

        <h3>Narrative Matters</h3>
        <p>Your deck needs to tell a compelling story. Traction helps, but vision closes deals.</p>

        <h3>Finding the Right Investors</h3>
        <p>Look for investors who understand your market and can add strategic value beyond capital.</p>

        <h3>The Process</h3>
        <p>From first meeting to signed term sheet took us 4 months. It's a marathon, not a sprint.</p>

        <p>Fundraising is hard, but with the right approach and persistence, it's achievable.</p>
      </div>
    `,
    main_image_url: undefined,
    main_image_thumb_url: undefined,
    publish_date: '2024-12-01T09:00:00Z',
    created_at: '2024-12-01T09:00:00Z',
    updated_at: '2024-12-01T09:00:00Z',
    published: true,
  },
];
