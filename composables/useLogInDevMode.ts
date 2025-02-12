export const useLogInfo = (message?: unknown, ...optionalParams: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, optionalParams);
  }
};

export const useLogError = (message?: unknown, ...optionalParams: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.error(message, optionalParams);
  }
};
