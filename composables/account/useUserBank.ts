import { toTypedSchema } from "@vee-validate/zod";

type IFormAddBank = {
  bank_code?: string;
  bank_account_name?: string;
  bank_account_no?: string;
};

type IFormField = {
  key: string;
  type: "text" | "tel";
  label: string;
  minLength: number;
  maxLength: number;
  disabled?: boolean;
};

enum FieldEnum {
  BANK_CODE = "bank_code",
  BANK_ACCOUNT_NO = "bank_account_no",
  BANK_ACCOUNT_NAME = "bank_account_name",
}

const BANK_ACCOUNT_NO_LENGTH = {
  MIN: 4,
  MAX: 20,
};

const BANK_ACCOUNT_NAME_LENGTH = {
  MIN: 2,
  MAX: 50,
};

const addBankValidationSchema = toTypedSchema(
  createSchemaValidationBuilder()
    .buildBankAccountNoSchema(BANK_ACCOUNT_NO_LENGTH.MIN, BANK_ACCOUNT_NO_LENGTH.MAX)
    .buildBankAccountNameSchema(BANK_ACCOUNT_NAME_LENGTH.MIN, BANK_ACCOUNT_NAME_LENGTH.MAX)
    .build(),
);

export const useUserBank = async () => {
  const { $userService } = useNuxtApp();

  const appStore = useAppStore();
  const { data: systemBankPayment } = await useSystemBankPayment();
  const addBankDialogController = useDialog();
  const { createToast } = useToast();
  const { mappedUserBankList, isUserBankAvailable } = storeToRefs(appStore);

  const bankListNotUsed = computed(() => {
    const bankCodeUsed = mappedUserBankList.value?.map((item) => item.bank_code) || [];

    return (
      systemBankPayment.value?.banks_master?.filter((bank) => {
        return !bankCodeUsed.includes(bank.bank_code);
      }) || []
    );
  });

  const formAddBankValues = reactive<IFormAddBank>({
    bank_account_name: mappedUserBankList.value?.[0]?.bank_account_name,
    bank_account_no: undefined,
    bank_code: bankListNotUsed?.value[0]?.bank_code,
  });

  const fieldBankAccountNo: IFormField = {
    key: FieldEnum.BANK_ACCOUNT_NO,
    label: "Số tài khoản",
    type: "tel",
    minLength: BANK_ACCOUNT_NO_LENGTH.MIN,
    maxLength: BANK_ACCOUNT_NO_LENGTH.MAX,
    disabled: false,
  };

  const fieldBankAccountName: IFormField = {
    key: FieldEnum.BANK_ACCOUNT_NAME,
    label: "Tên chủ thẻ",
    type: "text",
    minLength: BANK_ACCOUNT_NAME_LENGTH.MIN,
    maxLength: BANK_ACCOUNT_NAME_LENGTH.MAX,
    disabled: !!formAddBankValues.bank_account_name,
  };

  const isSubmitting = ref(false);

  const isAddBankDisabled = computed<boolean>(() => {
    return Object.values(formAddBankValues).some((value) => !value);
  });

  const bankSelected = computed(() => {
    if (!bankListNotUsed.value) return;
    return bankListNotUsed.value?.find((bank: IBankPaymentInfo) => bank.bank_code === formAddBankValues.bank_code);
  });

  const resetFormAddBankValues = () => {
    formAddBankValues.bank_account_name = mappedUserBankList.value?.[0]?.bank_account_name;
    formAddBankValues.bank_account_no = undefined;
    formAddBankValues.bank_code = bankListNotUsed?.value[0]?.bank_code;
  };

  const submitAddBank = async () => {
    isSubmitting.value = true;
    try {
      const formData: IFormAddBank = {
        ...formAddBankValues,
        bank_account_name: formAddBankValues.bank_account_name?.toUpperCase(),
        bank_account_no: formAddBankValues.bank_account_no?.replace(/\s/g, ""),
      };

      const bank = await $userService.addUserBankInfo(formData);
      appStore.systemDepositPayment?.userBanks?.push(bank);
      addBankDialogController.closeDialog();
      resetFormAddBankValues();

      createToast({
        description: "Thêm ngân hàng thành công",
      });
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError)?.message,
      });
    } finally {
      isSubmitting.value = false;
    }
  };

  // watch(
  //   () => bankListNotUsed.value.length,
  //   () => {
  //     console.log("111111");
  //     if (bankListNotUsed.value.length) {
  //       formAddBankValues.bank_code = bankListNotUsed.value[0].bank_code;
  //     }
  //   },
  // );

  return {
    isSubmitting,
    fieldBankAccountNo,
    fieldBankAccountName,
    formAddBankValues,
    addBankValidationSchema,
    mappedUserBankList,
    isUserBankAvailable,
    systemBankPayment,
    addBankDialogController,
    bankListNotUsed,
    bankSelected,
    isAddBankDisabled,
    resetFormAddBankValues,
    submitAddBank,
  };
};
