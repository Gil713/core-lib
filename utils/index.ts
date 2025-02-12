import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import sanitizeHtml from "sanitize-html";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getIpxPath = (imageName: string) => {
  return `${imageName}`;
};

export const getRelativeIpxPath = (imageName: string) => {
  return `_ipx/_/images/${imageName}`;
};

export const isErc20Wallet = (walletString: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/g.test(walletString);
};

export const isTrc20Wallet = (walletString: string) => {
  return /^(T)[0-9A-Za-z]{33}$/g.test(walletString);
};

export const formatNumberWithCommas = (number: number, prefix = ","): string => {
  if (number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, prefix);
  }
  return "0";
};

export const isVietnamesePhoneNumber = (phoneString: string) => {
  return /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g.test(phoneString);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  const match =
    cleaned.length === 10 ? cleaned.match(/^(\d{4})(\d{3})(\d{3})$/) : cleaned.match(/^(\d{5})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : "";
};

export const formatFixNumber = (num: number | string, places = 0) => Number(num).toFixed(places);

/**
 * Formats the time for news articles.
 * @param {string} time - The input time string (e.g., "2024-12-07T09:00:00.000Z")
 * @returns {Array<string>} - An array with 2 strings (e.g., ["16:00", "07/12/24"]).
 */
export const getDateTimeForNews = (time: string): Array<string> => {
  return dayjs(time).format(DATE_TIME_NEWS_FORMAT).split(" ");
};

export const formatTwoDigitsTime = (timeUnit: number): string => {
  return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
};

export const createBaseEndpoint = (version: API_BASE_VERSION) => (endpoint: string) => {
  return `/api/${version}/${endpoint}`;
};

export const createPromotionEndpoint = (version: API_PROMOTION_VERSION) => (endpoint: string) => {
  return `/api/promotion/${version}/${endpoint}`;
};

// formatAmountUnit(1234567, 1000) => "1,234.567"
export const formatAmountUnit = (str: string | number, divider: number = 1000): string => {
  if (str) {
    const amount = parseFloat((Number(str) / divider).toString());
    return amount.toLocaleString("en-US");
  }
  return "0";
};

export const createPath =
  (baseURL: BaseUrlEnum) =>
  (path: string = "") => {
    let fullPath = `/${baseURL}`;
    if (path) fullPath += `/${path}`;
    return fullPath;
  };

// Useful for debugging
export const pause = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, delay);
  });

type IFormatNumberOptions = {
  delimiter?: string;
  currencySymbol?: CurrencySymbolEnum;
  defaultValue?: string;
};

/**
 * Formats a numeric value with a thousand separators and currency symbol
 * @param value - The number or string to be formatted
 * @param options - Formatting options object
 * @param options.delimiter - Symbol for a thousand separation (default: ",")
 * @param options.currencySymbol - Currency symbol to append (default: VND)
 * @param options.defaultValue - Value to show when input is invalid (default: "0")
 * @returns Formatted string with currency symbol (e.g., "1,234,567 VND")
 *
 * @example
 * formatVNDCurrency(1000000)  // "1,000,000 VND"
 * formatVNDCurrency(1000000, { delimiter: "." })  // "1.000.000 VND"
 */
export const formatVNDCurrency = (
  value?: number | string,
  { delimiter = ",", currencySymbol = CurrencySymbolEnum.VND, defaultValue = "0" }: IFormatNumberOptions = {},
): string => {
  if (!value || isNaN(Number(String(value).trim()))) {
    return `${defaultValue} ${currencySymbol}`;
  }
  const str = `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)} ${currencySymbol}`;
  return str.trim();
};

export const formatAmountUnitEvent = (str: string): string => {
  const amount = Math.round(Number(str));
  return amount.toLocaleString("en-US");
};

export const formatNumberToPrecision = (number: number, base = 1000): number => {
  const data = Math.round(number * base) / base;
  return data;
};

/**
 * Creates a curried function to generate formatted strings.
 * @param {string} main - The primary prefix or base string.
 * @returns {(sub: string) => string} - A function that takes a `sub` string and returns a formatted string in the format `<main>-<sub>`.
 */
export const uniqueKeyGenerator = (main: string) => (sub: string) => `${main}-${sub}`;

/**
 * sanitizeHTMLContent is a security-focused function that cleanses HTML content to prevent XSS (Cross-Site Scripting) attacks and other security vulnerabilities.
 *
 * @returns {string} - The sanitized HTML content.
 * @param htmlContent
 */
export const sanitizeHTMLContent = (htmlContent?: string): string => {
  const defaultOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat("img", "p"),
    nonBooleanAttributes: sanitizeHtml.defaults.nonBooleanAttributes.concat("style"),
    allowedAttributes: false,
    allowedSchemes: ["data", "http", "https"],
  };
  return sanitizeHtml(htmlContent || "", defaultOptions);
};

/**
 * Converts an object of query parameters into a URL-encoded query string.
 *
 * @param {Record<string, string | string[] | undefined> | undefined} query -
 *   The query object to convert. Supports single values, arrays, and ignores undefined.
 *
 * @returns {string} - A URL-encoded query string, or an empty string if `query` is undefined.
 *
 * @example
 * convertToQueryString({ type: "live-stream", provider_code: ["b52", "rik"] });
 * // Output: "type=live-stream&provider_code=b52&provider_code=rik"
 */
export const convertObjectToQueryString = (query?: Record<string, string | string[] | undefined>): string => {
  if (!query) return ""; // Handle undefined or null query

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (value !== undefined) {
      params.append(key, value);
    }
  }

  return params.toString();
};

export const openInNewTab = (url?: string) => {
  if (url) window.open(url, "_blank");
};

/**
 * Normalizes a string by:
 * - Converting to lowercase.
 * - Trimming leading and trailing spaces.
 * - Replacing multiple spaces with a single space.
 * - Removing diacritical marks (e.g., accents, tildes).
 * - Mapping specific characters (e.g., "đ" to "d").
 * - Retaining only alphanumeric characters, with custom mappings.
 *
 * @param str - The input string to normalize.
 * @returns A normalized version of the input string.
 *
 * @example
 * normalizeDiacritics("Đây là ví dụ thử nghiệm!");
 * // Output: "day la vi du thu nghiem"
 *
 * normalizeDiacritics("Học lập trình! Đường dẫn 123.");
 * // Output: "hoc lap trinh duong dan 123"
 */
export const normalizeDiacritics = (str: string): string => {
  const accentMap: Record<string, string> = {
    đ: "d",
  };

  return str
    .toLowerCase()
    .trim()
    .replace(/\s\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[^a-z0-9]/g, (char) => accentMap[char] || char);
};

export const autoFocusForm = (formSelector: string) => {
  const form = document.querySelector(formSelector);
  const firstInput = form?.querySelector("input");
  firstInput?.focus();
};
