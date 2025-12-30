/**
 * InputField Component
 *
 * Text input field with label and error message support.
 */

'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  dir?: 'ltr' | 'rtl';
}

export function InputField({
  label,
  error,
  className,
  dir = 'ltr',
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2" dir={dir}>
      {label && (
        <Label htmlFor={props.id || props.name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Input
        className={cn(
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
