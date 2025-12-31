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
    slug: 'sloom',
    name: 'Tech Insights',
    title: 'Tech Insights Blog',
    subtitle: 'Exploring the future of technology',
    logo: undefined,
    footer_data: {
      physical_address: '123 Tech Street, San Francisco, CA 94105',
      social_links: [
        { name: 'x', url: '/images/socials/x.png' },
        { name: 'github', url: '/images/socials/github.png' },
        { name: 'linkedin', url: '/images/socials/linkedin.png' },
      ],
      footer_text: 'Building the future, one post at a time.',
    },
    website_direction: 'ltr',
    has_paid_subscription: false,
  },
  {
    uuid: '550e8400-e29b-41d4-a716-446655440002',
    slug: 'saleem',
    name: 'Design Matters',
    title: 'Design Matters',
    subtitle: 'Where creativity meets functionality',
    logo: undefined,
    footer_data: {
      physical_address: '456 Design Ave, New York, NY 10001',
      social_links: [
        { name: 'dribbble', url: '/images/socials/dribbble.png' },
        { name: 'instagram', url: '/images/socials/instagram.png' },
        { name: 'behance', url: '/images/socials/behance.png' },
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
    logo: undefined,
    footer_data: {
      physical_address: '789 Startup Blvd, Austin, TX 78701',
      social_links: [
        { name: 'x', url: '/images/socials/x.png' },
        { name: 'linkedin', url: '/images/socials/linkedin.png' },
      ],
      footer_text: 'Every startup has a story.',
    },
    website_direction: 'ltr',
    has_paid_subscription: true,
  },
];
