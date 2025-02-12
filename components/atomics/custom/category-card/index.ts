import { cva, type VariantProps } from "class-variance-authority";

export const cardCategoryVariants = cva(
  "relative rounded-lg shadow-md bg-neutral-700 overflow-hidden min-w-32 min-h-12 flex items-center",
  {
    variants: {
      width: {
        small: "w-40", // 160px
        medium: "w-64", // 256px
        large: "w-80", // 320px
        auto: "",
      },
    },
    defaultVariants: {
      width: "auto",
    },
  },
);

export type ICardCategoryVariants = VariantProps<typeof cardCategoryVariants>;
