type IOpenDialogConfig = { updateQueryUrl?: boolean };

export type IUseDialog = {
  isOpen: Ref<boolean>;
  config?: IOpenDialogConfig;
  data: Ref<unknown>;
  openDialog: (payload?: unknown, options?: IOpenDialogConfig) => void;
  closeDialog: () => void;
  openCallback: (dialogInstance: IUseDialog, type: DialogTypeEnum) => void;
};
type IGlobalDialog = Pick<IUseDialog, "openDialog" | "closeDialog"> & { isOpen: boolean };

export const useGlobalDialog = createSharedComposable(() => {
  const currentDialog = ref<IGlobalDialog>();
  const updateGlobalDialog = (dialog?: IUseDialog) => {
    if (!dialog) currentDialog.value = undefined;
    else {
      currentDialog.value = {
        closeDialog: dialog.closeDialog,
        openDialog: dialog.openDialog,
        isOpen: dialog.isOpen.value,
      };
    }
  };

  return {
    updateGlobalDialog,
    currentDialog: computed(() => currentDialog.value),
  };
});

export const useDialog = (payload?: unknown, config?: IOpenDialogConfig): IUseDialog => {
  const { currentDialog, updateGlobalDialog } = useGlobalDialog();
  const route = useRoute();
  const router = useRouter();
  const isOpen = ref<boolean>(false);
  const data = ref<unknown>(payload);

  const openDialog = async (payload?: unknown) => {
    currentDialog.value?.closeDialog();
    if (payload) data.value = payload;
    isOpen.value = true;
  };

  const closeDialog = () => {
    const query = { ...route.query };
    delete query.id;
    delete query.ignoreQuery;
    delete query.popup;
    router.push({
      query: { ...query, popup: undefined },
    });

    updateGlobalDialog(undefined);
    isOpen.value = false;
  };

  const openCallback = (dialogInstance: IUseDialog, type: DialogTypeEnum) => {
    console.log(type);
    updateGlobalDialog(dialogInstance);
  };

  return {
    isOpen,
    config,
    data,
    openDialog,
    closeDialog,
    openCallback,
  };
};
