/**
 * SubscribeForm Component
 *
 * Simple email subscription form for the footer.
 * In production, connect to your newsletter service (e.g., ConvertKit, Mailchimp).
 */

'use client';

import { useState } from 'react';
import { Tenant } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SubscribeFormProps {
  tenant: Tenant;
}

export function SubscribeForm({ tenant }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: In production, call your newsletter API
      // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm text-green-800 dark:text-green-200">
          ✓ Thanks for subscribing! Check your email to confirm.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          className="w-full"
          disabled={isSubmitting}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !email}
        className="w-full bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}
