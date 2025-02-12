import { useAutoAnimate } from "@formkit/auto-animate/vue";

type IDirection = "horizontal" | "vertical";

export const useScrollTo = (direction: IDirection) => {
  const [parent] = useAutoAnimate();

  const scrollTo = (index: number) => {
    const targetEl = parent.value?.children[index];
    const options: ScrollIntoViewOptions = {
      behavior: "smooth",
      inline: direction === "horizontal" ? "center" : "nearest",
      block: direction === "vertical" ? "center" : "nearest",
    };

    if (targetEl) {
      targetEl.scrollIntoView(options);
    }
  };

  return {
    scrollContainerRef: parent,
    scrollTo,
  };
};
