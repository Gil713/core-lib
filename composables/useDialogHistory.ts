export const useDialogHistory = () => {
  const contentTooltip = ref<string>("Nhấn để Copy");
  const fillColor = ref<string>("text-secondary-foreground");
  const statement_img = ref<string>("");

  const showButtonCopyFields = new Set<string>([
    TransactionFieldDetailEnum.MATCH_CODE,
    TransactionFieldDetailEnum.CODE,
    TransactionFieldDetailEnum.WALLET,
    TransactionFieldDetailEnum.CHECKED,
    TransactionFieldDetailEnum.WALLET_RECEIVED,
  ]);

  const isShowButtonCopy = (field: string): boolean => {
    return showButtonCopyFields.has(field);
  };

  const setContentTooltip = (text: string) => {
    contentTooltip.value = text;
    fillColor.value = "text-disable";
    stop();
    start();
  };

  const handleChangeFile = (file: string) => {
    statement_img.value = file;
  };

  const { start, stop } = useTimeoutFn(() => {
    contentTooltip.value = "Nhấn để Copy";
    fillColor.value = "text-secondary-foreground";
  }, 3000);

  return {
    isShowButtonCopy,
    setContentTooltip,
    handleChangeFile,
    statement_img,
    contentTooltip,
    fillColor,
  };
};
