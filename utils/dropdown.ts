// show dropdown options if there are more than 1 option
export const isDropdownVisible = (options: Record<string, string | number>[]): boolean => {
  return options.length > 1;
};
