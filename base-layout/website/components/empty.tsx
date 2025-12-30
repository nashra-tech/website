import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from '@/components/ui/icons';
import type { IconFC } from '@/components/ui/icons';

interface EmptyProps {
  title?: string
  description?: string
  icons?: IconFC[]
  className?: string
  action?: React.ReactNode
}

export const Empty = ({
  title,
  description,
  icons = [],
  action,
  className
}: EmptyProps) => {
  return (
    <div className={cn(
      "flex justify-center py-30",
      className
    )}>
      <div className={cn(
        "text-center",
        "w-full",
        "group transition duration-500 hover:duration-200"
      )}>
        <div className="flex justify-center isolate">
          {icons.length === 3 ? (
            <>
              <div className="bg-base-50 size-12 grid place-items-center rounded-lg relative left-2.5 top-1.5 -rotate-6 shadow-lg ring-1 ring-border group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                {React.createElement(icons[0], {
                  className: "w-6 h-6 text-muted-foreground"
                })}
              </div>
              <div className="bg-base-50 size-12 grid place-items-center rounded-lg relative z-10 shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                {React.createElement(icons[1], {
                  className: "w-6 h-6 text-muted-foreground"
                })}
              </div>
              <div className="bg-base-50 size-12 grid place-items-center rounded-lg relative right-2.5 top-1.5 rotate-6 shadow-lg ring-1 ring-border group-hover:translate-x-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                {React.createElement(icons[2], {
                  className: "w-6 h-6 text-muted-foreground"
                })}
              </div>
            </>
          ) : icons.length === 2 ? (
            <>
              <div className="bg-base-50 size-12 grid place-items-center rounded-lg relative left-2 top-1 -rotate-6 shadow-lg ring-1 ring-border group-hover:-translate-x-3 group-hover:-rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                {React.createElement(icons[0], {
                  className: "w-6 h-6 text-muted-foreground"
                })}
              </div>
              <div className="bg-base-50 size-12 grid place-items-center rounded-lg relative right-2 top-1 rotate-6 shadow-lg ring-1 ring-border group-hover:translate-x-3 group-hover:rotate-12 group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
                {React.createElement(icons[1], {
                  className: "w-6 h-6 text-muted-foreground"
                })}
              </div>
            </>
          ) : icons.length === 1 ? (
            <div className="bg-base-50 size-12 grid place-items-center rounded-lg shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              {React.createElement(icons[0], {
                className: "w-6 h-6 text-muted-foreground"
              })}
            </div>
          ) : (
            <div className="bg-base-50 size-12 grid place-items-center rounded-lg shadow-lg ring-1 ring-border group-hover:-translate-y-0.5 transition duration-500 group-hover:duration-200">
              <Icons.empty className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <h2 className="text-foreground font-semibold mt-6">
          {title ?? 'No relevant data found.'}
        </h2>
        {description && (
          <p className="text-sm mt-1 whitespace-pre-line text-base-500 font-medium">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-4 flex justify-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};
