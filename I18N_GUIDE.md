# Internationalization (i18n) Guide

## Overview

The application supports multi-language translations based on the tenant's `website_language` field from the API. All static labels are automatically translated based on the configured language.

## Supported Languages

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `ar` | Arabic | RTL |
| `es` | Spanish | LTR |
| `pt` | Portuguese | LTR |
| `fr` | French | LTR |
| `de` | German | LTR |
| `zh` | Chinese (Simplified) | LTR |
| `hi` | Hindi | LTR |
| `ja` | Japanese | LTR |
| `id` | Indonesian | LTR |

## How It Works

### 1. Language Detection

The language is automatically detected from the tenant's API response:

```typescript
// API returns:
{
  "website_language": "ar",  // Language code
  "website_direction": "rtl", // Text direction
  ...
}
```

### 2. Translation Files

All translations are stored in JSON files:

```
translations/
├── en.json  (English)
├── ar.json  (Arabic)
├── es.json  (Spanish)
├── pt.json  (Portuguese)
├── fr.json  (French)
├── de.json  (German)
├── zh.json  (Chinese)
├── hi.json  (Hindi)
├── ja.json  (Japanese)
└── id.json  (Indonesian)
```

### 3. Translation Structure

Each translation file follows this structure:

```json
{
  "common": {
    "subscribe": "Subscribe",
    "email_placeholder": "Enter your email address",
    ...
  },
  "home": {
    "empty_title": "We're just getting started...",
    ...
  },
  "magic_link": {
    "subscribe": "Subscribe",
    "already_subscribed": "Already Subscribed",
    ...
  },
  "errors": {
    "email_already_subscribed": "This email is already subscribed.",
    ...
  }
}
```

## Usage

### In Server Components

```typescript
import { getTranslations } from '@/lib/i18n';

export default async function Page({ params }: PageProps) {
  const tenant = await getTenantBySlug(params.subdomain);
  const tenantLanguage = tenant.website_language || 'en';
  const translations = getTranslations(tenantLanguage);

  return (
    <div>
      <h1>{translations.home.empty_title}</h1>
      <p>{translations.common.subscribe}</p>
    </div>
  );
}
```

### In Client Components

```typescript
'use client';

import { useTranslations } from '@/lib/i18n';
import { Tenant } from '@/types';

export function MyComponent({ tenant }: { tenant: Tenant }) {
  const language = tenant.website_language || 'en';
  const { t } = useTranslations(language);

  return (
    <div>
      <button>{t('common.subscribe')}</button>
      <input placeholder={t('common.email_placeholder')} />
    </div>
  );
}
```

## Translation Keys

### Common Keys

Used across the application:

```typescript
common.powered_by
common.subscribe
common.subscribing
common.subscribed
common.email_placeholder
common.email_required
common.invalid_email
common.subscription_success
common.subscription_error
common.explore
```

### Home Page Keys

```typescript
home.empty_title
home.page
home.of
home.previous
home.next
```

### Magic Link Keys

```typescript
magic_link.subscribe
magic_link.subscribing
magic_link.already_subscribed
magic_link.already_subscribed_message
magic_link.check_email
magic_link.check_email_message
magic_link.you_are_in
magic_link.subscribed_to
magic_link.your_email
```

### Error Keys

```typescript
errors.tenant_not_found
errors.post_not_found
errors.email_already_subscribed
errors.subscription_failed
errors.generic_error
```

## Adding a New Language

1. **Create translation file:**

```bash
cp translations/en.json translations/fr.json
```

2. **Translate all keys:**

```json
{
  "common": {
    "subscribe": "S'abonner",
    ...
  }
}
```

3. **Add language to type definition:**

Edit `lib/i18n/translations.ts`:

```typescript
export type SupportedLanguage = 'en' | 'ar' | 'es' | 'pt' | 'fr' | 'new-lang';

const translations: Record<SupportedLanguage, Translations> = {
  en,
  ar,
  ...
  'new-lang': newLang,
};

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  ...
  'new-lang': 'New Language Name',
};
```

4. **Update RTL detection (if needed):**

```typescript
export function isRTL(language: string): boolean {
  return ['ar', 'new-rtl-lang'].includes(language);
}
```

## Adding New Translation Keys

1. **Add to English file first** (`translations/en.json`):

```json
{
  "common": {
    "new_key": "New Text"
  }
}
```

2. **Add to all other language files**

3. **Use in components:**

```typescript
// Server Component
const translations = getTranslations(language);
translations.common.new_key

// Client Component
const { t } = useTranslations(language);
t('common.new_key')
```

## Best Practices

### ✅ DO

- Always provide fallback to English: `tenant.website_language || 'en'`
- Keep translation keys descriptive
- Group related translations (common, home, magic_link, etc.)
- Test with RTL languages (Arabic)
- Use the `t()` function for nested keys: `t('common.subscribe')`

### ❌ DON'T

- Don't hardcode strings in components
- Don't forget to translate ALL language files when adding new keys
- Don't use special characters in translation keys
- Don't mix static and dynamic content in translation strings

## RTL Support

The application automatically handles RTL languages:

```typescript
const direction = tenant.website_direction || 'ltr';
const isRTL = direction === 'rtl';

return (
  <div dir={direction}>
    {/* Content automatically mirrors for RTL */}
  </div>
);
```

## Testing Translations

### Test Different Languages

```typescript
// In your browser console
localStorage.setItem('test-language', 'ar');
window.location.reload();
```

### Verify All Keys Exist

Check that all translation files have the same keys:

```bash
# Compare translation files
diff <(jq -S 'keys' translations/en.json) <(jq -S 'keys' translations/ar.json)
```

## Example: Complete Component

```typescript
'use client';

import { useTranslations } from '@/lib/i18n';
import { Tenant } from '@/types';

interface Props {
  tenant: Tenant;
}

export function SubscribeButton({ tenant }: Props) {
  const language = tenant.website_language || 'en';
  const direction = tenant.website_direction || 'ltr';
  const { t } = useTranslations(language);

  return (
    <button dir={direction}>
      {t('common.subscribe')}
    </button>
  );
}
```

## Troubleshooting

### Issue: Translation not showing

**Check:**
1. Is the key correct? `t('common.subscribe')` not `t('subscribe')`
2. Does the key exist in the translation file?
3. Is the language code valid?

### Issue: Fallback to English

**Reason:** Language not supported or translation file missing

**Solution:** Add the language translation file

### Issue: RTL layout broken

**Check:**
1. Is `dir={direction}` set on parent container?
2. Is CSS using logical properties (`margin-inline-start` vs `margin-left`)?

## Related Files

- `lib/i18n/translations.ts` - Translation utilities
- `lib/i18n/use-translations.ts` - React hook for translations
- `lib/i18n/index.ts` - Main export
- `translations/*.json` - Translation files

## Performance

- Translations are loaded once per language
- `useMemo` prevents re-parsing on every render
- Tree-shaking removes unused languages in production

---

**Questions?** Check the code examples in:
- `app/s/[subdomain]/page.tsx` - Server Component usage
- `components/blog/subscribe-form.tsx` - Client Component usage
- `app/s/[subdomain]/magic/[identifier]/magic-link-client.tsx` - Full example
