export const useUploadImage = (emit: (event: "change-file", file: string) => void) => {
  const nuxt = useNuxtApp();
  const { createToast } = useToast();
  const route = useRoute();
  const uploadFileName = ref<string | undefined>(undefined);
  const processingUpload = ref<boolean>(false);
  const acceptType = ref<string[]>([]);
  const limitFileSize = ref<number>(10485760);
  const element = ref<HTMLInputElement | undefined>(undefined);

  const changeFile = async (id: string, idTransaction: string, isAcceptType: string[], isLimitFileSize: number) => {
    const inputElement = document.getElementById(id) as HTMLInputElement | undefined;
    element.value = inputElement || undefined;
    acceptType.value = isAcceptType;
    limitFileSize.value = isLimitFileSize;
    if (element.value instanceof HTMLInputElement) {
      await uploadImage(idTransaction, element.value);
    }
  };

  const isWrongLimitFileSize = (file: File) => {
    return file.size > limitFileSize.value;
  };

  const isWrongFileFormat = (file: File) => {
    if (!file) {
      return true;
    }
    const str = file.name;
    const extension = str.substr(str.lastIndexOf("."));
    if (!extension) {
      return true;
    }
    return !acceptType.value.includes(extension.toLowerCase());
  };

  const resetFile = () => {
    if (!element?.value) return;
    element.value = undefined;
    uploadFileName.value = undefined;
  };

  watch(route, () => {
    resetFile();
  });

  const handleUploadImageSuccess = async (idTransaction: string, file: string, path: string) => {
    try {
      const response = await nuxt.$transactionHistoryService.updateImageTransaction(idTransaction, {
        statement_img: path,
      });

      if (!response) {
        createToast({
          variant: "destructive",
          description: "Cập nhật hình ảnh giao dịch thất bại",
        });
        resetFile();
        return;
      }

      emit("change-file", file);

      createToast({
        description: "Cập nhật hình ảnh giao dịch thành công",
      });
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  };

  const uploadImage = async (idTransaction: string, element: HTMLInputElement): Promise<void> => {
    if (!document) return;
    if (!element || !element.files) return;
    const docElement: FileList = element.files;
    processingUpload.value = true;
    const file: File = docElement![0];

    if (!file) {
      processingUpload.value = false;
      return;
    }

    const formData: FormData = new FormData();
    formData.append("file", file);

    if (isWrongFileFormat(file)) {
      createToast({
        variant: "destructive",
        description: "Định dạng không hỗ trợ, vui lòng tải ảnh:jpg:jpeg:png dưới 5MB!",
      });
      resetFile();
      processingUpload.value = false;
      return;
    }

    if (isWrongLimitFileSize(file)) {
      createToast({
        variant: "destructive",
        description: "Hình ảnh phải nhỏ hơn 5MB!",
      });
      resetFile();
      processingUpload.value = false;
      return;
    }

    try {
      const { data, status } = await nuxt.$transactionHistoryService.uploadImageTransaction(formData, {
        "Content-Type": file.type,
      });

      if (status !== ResponseStatusEnum.OK) {
        processingUpload.value = false;
        createToast({
          variant: "destructive",
          description: "Tải lên ảnh giao dịch thất bại",
        });
        resetFile();
        return;
      }

      processingUpload.value = false;
      uploadFileName.value = file.name;

      await handleUploadImageSuccess(idTransaction, URL.createObjectURL(file), data.path);
    } catch (error) {
      processingUpload.value = false;
      resetFile();
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  };

  return {
    uploadImage,
    changeFile,
    isWrongLimitFileSize,
    isWrongFileFormat,
    processingUpload,
    uploadFileName,
    resetFile,
    handleUploadImageSuccess,
  };
};
