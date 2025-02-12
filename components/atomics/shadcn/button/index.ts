import { cva, type VariantProps } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-neutral-600 disabled:border-neutral-600 disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border bg-primary-400 border-primary-400 text-white",
        secondary: "bg-secondary-400 border-secondary-400 text-white",
        dark: "border bg-neutral-700 border-neutral-700 text-white",
        outline: "border border-white text-white",
        ghost: "",
        link: "text-white  underline-offset-4 disabled:bg-transparent",
      },
      hovered: {
        none: "",
        default: "active:bg-primary-500 hover:border-primary-500 hover:bg-primary-500 active:border-primary-500",
        secondary:
          "hover:bg-secondary-500 active:bg-secondary-500 hover:border-secondary-500 active:border-secondary-500",
        dark: "hover:bg-neutral-750 active:bg-neutral-750 hover:border-neutral-750 active:border-neutral-750",
        outline: "hover:text-neutral-100 active:text-neutral-100 hover:border-neutral-100 active:border-neutral-100",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground",
        link: "hover:text-neutral-100 active:text-neutral-100 hover:underline active:underline hover:disabled:no-underline active:disabled:no-underline",
      },
      size: {
        default: "min-h-8 px-3 lg:px-4",
        sm: "min-h-7 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-4",
        xl: "min-h-12 rounded-md text-base px-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hovered: "default",
    },
  },
);

export type IButtonVariants = VariantProps<typeof buttonVariants>;
