export const useDataLayer = () => {
  const pushToDataLayer = (event: string, formName: string) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: event,
        formName: formName,
      });
    }
  };

  return { pushToDataLayer };
};
