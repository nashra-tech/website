/**
 * Static Tenant Data
 *
 * This file contains static tenant data objects.
 * In production, replace this with API calls to fetch tenant data from a database.
 *
 * Migration path:
 * 1. Replace TENANTS_DB with: await fetch('/api/tenants')
 * 2. Keep the Tenant type interface unchanged
 * 3. Update getTenantBySlug() to call the API
 */

import { Tenant } from '@/types';

export const TENANTS_DB: Tenant[] = [
  {
    uuid: '550e8400-e29b-41d4-a716-446655440001',
    slug: 'tech-insights',
    name: 'Tech Insights',
    title: 'Tech Insights Blog',
    subtitle: 'Exploring the future of technology',
    description: 'A blog dedicated to exploring emerging technologies, software development best practices, and digital innovation.',
    logo: undefined,
    footer_data: {
      physical_address: '123 Tech Street, San Francisco, CA 94105',
      social_links: [
        { name: 'Twitter', url: 'https://twitter.com/techinsights' },
        { name: 'GitHub', url: 'https://github.com/techinsights' },
        { name: 'LinkedIn', url: 'https://linkedin.com/company/techinsights' },
      ],
      footer_text: 'Building the future, one post at a time.',
    },
    website_direction: 'ltr',
    has_paid_subscription: false,
  },
  {
    uuid: '550e8400-e29b-41d4-a716-446655440002',
    slug: 'design-matters',
    name: 'Design Matters',
    title: 'Design Matters',
    subtitle: 'Where creativity meets functionality',
    description: 'Exploring UI/UX design, creative processes, and design thinking principles.',
    logo: undefined,
    footer_data: {
      physical_address: '456 Design Ave, New York, NY 10001',
      social_links: [
        { name: 'Dribbble', url: 'https://dribbble.com/designmatters' },
        { name: 'Instagram', url: 'https://instagram.com/designmatters' },
        { name: 'Behance', url: 'https://behance.net/designmatters' },
      ],
      footer_text: 'Crafting beautiful experiences.',
    },
    website_direction: 'ltr',
    has_paid_subscription: false,
  },
  {
    uuid: '550e8400-e29b-41d4-a716-446655440003',
    slug: 'startup-journey',
    name: 'Startup Journey',
    title: 'The Startup Journey',
    subtitle: 'From zero to launch',
    description: 'Real stories from founders building products, raising capital, and scaling startups.',
    logo: undefined,
    footer_data: {
      physical_address: '789 Startup Blvd, Austin, TX 78701',
      social_links: [
        { name: 'Twitter', url: 'https://twitter.com/startupjourney' },
        { name: 'LinkedIn', url: 'https://linkedin.com/company/startupjourney' },
      ],
      footer_text: 'Every startup has a story.',
    },
    website_direction: 'ltr',
    has_paid_subscription: true,
  },
];
