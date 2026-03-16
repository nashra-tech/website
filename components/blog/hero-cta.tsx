import { Tenant } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroCtaProps {
  tenant: Tenant;
}

export function HeroCta({ tenant }: HeroCtaProps) {
  if (!tenant.cta_enabled || !tenant.cta_label || !tenant.cta_link) return null;

  const buttonStyle = tenant.button_style || 'filled';
  const buttonVariant = buttonStyle === 'outline' ? ('outline' as const) : ('default' as const);

  // Ensure the link has a protocol
  const href = tenant.cta_link.startsWith('http') ? tenant.cta_link : `https://${tenant.cta_link}`;

  return (
    <div className="mt-5">
      <Button
        asChild
        variant={buttonVariant}
        className="group h-10 px-5 rounded-[var(--blog-radius)] font-medium text-sm shadow-md hover:shadow-lg transition-shadow duration-200 ease-out"
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {tenant.cta_label}
          <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </a>
      </Button>
    </div>
  );
}
