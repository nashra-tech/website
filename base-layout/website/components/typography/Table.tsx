import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  TableCell as BaseTableCell,
  TableHead as BaseTableHead,
  Table as BaseTable,
  TableHeader as BaseTableHeader,
  TableBody as BaseTableBody,
  TableFooter,
  TableRow as BaseTableRow,
  TableCaption as BaseTableCaption
} from "@/components/ui/table";

// Table variants
const tableVariants = cva("", {
  variants: {
    variant: {
      bordered: "border border-base-200 dark:border-neutral-800",
      borderless: "border-0"
    }
  },
  defaultVariants: {
    variant: "borderless"
  }
});

const tableHeadVariants = cva(
  "box-border font-bold text-base leading-normal text-base-900 dark:text-base-50 px-4 py-2 text-sm",
  {
    variants: {
      variant: {
        bordered: "[\u0026:not(:first-child)]:border-l border-base-200 dark:[\u0026:not(:first-child)]:border-neutral-800",
        borderless: ""
      }
    },
    defaultVariants: {
      variant: "borderless"
    }
  }
);

const tableCellVariants = cva(
  "box-border font-normal text-base leading-normal text-base-900 dark:text-base-50 px-4 py-2 text-sm",
  {
    variants: {
      variant: {
        bordered: "border-t border-base-200 dark:border-neutral-800 [&:not(:first-child)]:border-l border-base-200 dark:[&:not(:first-child)]:border-neutral-800",
        borderless: ""
      }
    },
    defaultVariants: {
      variant: "borderless"
    }
  }
);

// Create a context to pass variant down to children
const TableVariantContext = React.createContext<"bordered" | "borderless">("borderless");

// Re-export base components with custom styling
interface TableProps extends React.ComponentProps<typeof BaseTable>, VariantProps<typeof tableVariants> { }

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ variant, className, children, ...props }, ref) => {
    return (
      <TableVariantContext.Provider value={variant || "borderless"}>
        <BaseTable
          ref={ref}
          className={cn(tableVariants({ variant }), className)}
          {...props}
        >
          {children}
        </BaseTable>
      </TableVariantContext.Provider>
    );
  }
);
Table.displayName = "Table";

export const TableHeader = BaseTableHeader;
export const TableBody = BaseTableBody;
export const TableRow = BaseTableRow;
export const TableCaption = BaseTableCaption;
export { TableFooter };

export function TableHead(props: React.ComponentProps<typeof BaseTableHead>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <BaseTableHead
      {...props}
      className={cn(
        tableHeadVariants({ variant }),
        props.className
      )}
    />
  );
}

export function TableCell(props: React.ComponentProps<typeof BaseTableCell>) {
  const variant = React.useContext(TableVariantContext);
  return (
    <BaseTableCell
      {...props}
      className={cn(
        tableCellVariants({ variant }),
        props.className
      )}
    />
  );
}

// Custom Wrappers
export function TableContentWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-row justify-between items-center p-[0px_1px] border border-base-200 dark:border-neutral-800  w-[377px] h-[160px] box-border',
        className
      )}
      {...props}
    />
  );
}

export function TableColumn({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col items-start p-0 w-[187.5px] h-[160px] box-border',
        className
      )}
      {...props}
    />
  );
}

export function TableItem({
  bold = false,
  background = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { bold?: boolean; background?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-row items-center px-4 py-2 gap-2 border-t border-base-200 dark:border-neutral-800 box-border w-[187.5px] h-[40px]',
        bold ? 'font-bold dark:text-base-50' : 'font-normal dark:text-base-50',
        background ? 'bg-base-100 dark:bg-neutral-800' : '',
        className
      )}
      {...props}
    />
  );
}
