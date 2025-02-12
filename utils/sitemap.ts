import dayjs from "dayjs";
/**
 * Loops through months starting from a specified month and year until the current month (exclusive).
 * Returns an array of months in the format "YYYY-MM".
 *
 * @param {number} startMonth - The month to start from (1 for January, 12 for December).
 * @param {number} startYear - The year to start from.
 *
 * @throws {Error} Throws an error if `startMonth` is not between 1 and 12.
 *
 * @returns {string[]} An array of months from the start date to the current month, formatted as "YYYY-MM".
 *
 * @example
 * // For example, calling loopThroughMonths(3, 2023) in March 2023 will return:
 * // ['2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08']
 */
export const loopThroughMonths = (startMonth: number, startYear: number) => {
  if (startMonth < 1 || startMonth > 12) {
    throw new Error("Invalid month. Must be between 1 and 12.");
  }

  const startDate = dayjs()
    .year(startYear)
    .month(startMonth - 1)
    .startOf("month");

  const currentDate = dayjs().startOf("month");

  let current = startDate;
  const months: string[] = [];

  // Loop until the current date reaches the current month (exclusive)
  while (current.isBefore(currentDate, "month")) {
    months.push(current.format("YYYY-MM"));
    current = current.add(1, "month");
  }

  return months;
};
