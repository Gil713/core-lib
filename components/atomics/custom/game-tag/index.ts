import { cva, type VariantProps } from "class-variance-authority";

export { default as GameTag } from "./GameTag.vue";

export const gameTagVariants = cva(
  "flex items-center gap-1 px-1.5 absolute right-0 top-0 z-image-top overflow-hidden rounded-bl-lg",
  {
    variants: {
      variant: {
        [GameTagEnum.HOT]: "bg-[#DE0811]",
        [GameTagEnum.NEW]: "bg-positive-500",
        [GameTagEnum.MAINTAIN]: "bg-neutral-200 text-neutral-500",
      },
    },
  },
);

export type IGameTagVariants = VariantProps<typeof gameTagVariants>;
