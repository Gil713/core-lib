enum FieldEnum {
  USERNAME = "username",
  FULLNAME = "fullname",
  EMAIL = "email",
  PHONE = "phone",
  MASK_PASSWORD = "maskPassword",
  PASSWORD = "password",
  NEW_PASSWORD = "newPassword",
  CONFIRM_NEW_PASSWORD = "confirmNewPassword",
}

type IProfileForm = {
  username?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
  newPassword?: string;
  maskPassword?: string;
  confirmNewPassword?: string;
};

type IFormField = {
  key: FieldEnum;
  type: "text" | "email" | "password" | "tel";
  label: string;
  minLength: number;
  maxLength: number;
  disabled?: Ref<boolean>;
  isShow?: boolean;
};

type IDomVirtual = HTMLElement & { focus: () => void };

const DEFAULT_DISPLAY_PASSWORD = "***********";

const passwordRelatedFields = [FieldEnum.PASSWORD, FieldEnum.NEW_PASSWORD, FieldEnum.CONFIRM_NEW_PASSWORD];

export const useProfileInfo = () => {
  const { $userService } = useNuxtApp();
  const { refreshUserInfo } = useRefresh();

  const appStore = useAppStore();
  const { currentUser } = storeToRefs(appStore);
  const { createToast } = useToast();
  const isChangingPassword = ref<boolean>(false);
  const isSendingVerifyEmail = ref<boolean>(false);
  const dynamicRefs = ref<Record<string, IDomVirtual | undefined>>({});

  const isVerifiedEmail = computed(() => currentUser.value?.is_verify_email ?? false);
  const isVerifiedPhone = computed(() => currentUser.value?.is_verify_phone ?? false);
  const isDisplayNameUpdated = computed(() => currentUser.value?.fullname !== currentUser.value?.username);

  const formProfileValues = reactive<IProfileForm>({
    username: currentUser.value?.username,
    fullname: isDisplayNameUpdated.value ? currentUser.value?.fullname : undefined,
    email: isVerifiedEmail.value ? currentUser.value?.emailmask : currentUser.value?.email,
    phone: isVerifiedPhone.value ? currentUser.value?.phonemask : currentUser.value?.phone,
    maskPassword: DEFAULT_DISPLAY_PASSWORD,
    password: undefined,
    newPassword: undefined,
  });

  watchEffect(() => {
    formProfileValues.email = isVerifiedEmail.value ? currentUser.value?.emailmask : currentUser.value?.email;
    formProfileValues.phone = isVerifiedPhone.value ? currentUser.value?.phonemask : currentUser.value?.phone;
    formProfileValues.fullname = isDisplayNameUpdated.value ? currentUser.value?.fullname : undefined;
  });

  const formFields = reactive<IFormField[]>([
    {
      key: FieldEnum.USERNAME,
      label: "Tên đăng nhập",
      type: "text",
      minLength: 6,
      maxLength: 29,
      disabled: ref(true),
      isShow: true,
    },
    {
      key: FieldEnum.FULLNAME,
      label: "Tên hiển thị",
      type: "text",
      minLength: 6,
      maxLength: 15,
      isShow: true,
      disabled: isDisplayNameUpdated,
    },
    {
      key: FieldEnum.EMAIL,
      label: "Email",
      type: "email",
      minLength: 6,
      maxLength: 32,
      isShow: true,
      disabled: computed(() => isVerifiedEmail.value || isSendingVerifyEmail.value),
    },
    {
      key: FieldEnum.PHONE,
      label: "Số điện thoại",
      type: "tel",
      minLength: 10,
      maxLength: 10,
      isShow: true,
      disabled: isVerifiedPhone,
    },
    {
      key: FieldEnum.MASK_PASSWORD,
      label: "Mật khẩu",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: true,
      disabled: ref(true),
    },
    {
      key: FieldEnum.PASSWORD,
      label: "Mật khẩu",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
      disabled: ref(false),
    },
    {
      key: FieldEnum.NEW_PASSWORD,
      label: "Mật khẩu mới",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
    },
    {
      key: FieldEnum.CONFIRM_NEW_PASSWORD,
      label: "Nhập lại mật khẩu mới",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
    },
  ]);

  const changePasswordValidationSchema = computed(() => {
    const changePasswordSchema = createSchemaValidationBuilder().buildNewPasswordSchema();
    return toTypedSchema(changePasswordSchema);
  });

  const profileValidationSchema = computed(() => {
    // Schema for changing password
    if (isChangingPassword.value) {
      return changePasswordValidationSchema.value;
    }

    // Schema for changing profile
    const profileFormSchema = createSchemaValidationBuilder()
      .buildEmailSchema(true)
      .buildFullnameSchema()
      .buildPhoneSchema()
      .build();
    return toTypedSchema(profileFormSchema);
  });

  const isValidChangePassword = computed(
    () =>
      isChangingPassword.value &&
      !!formProfileValues.password &&
      !!formProfileValues.newPassword &&
      !!formProfileValues.confirmNewPassword,
  );

  const isValidChangeProfile = computed(
    () =>
      (formProfileValues.email && currentUser.value?.email !== formProfileValues.email) ||
      (!!formProfileValues.fullname && currentUser.value?.fullname !== formProfileValues.fullname) ||
      currentUser.value?.phone !== formProfileValues.phone,
  );

  const isEnableButtonSubmit = computed(() => isValidChangeProfile.value || isValidChangePassword.value);

  const setRef = (el: unknown, key: string) => {
    if (el) {
      dynamicRefs.value[key] = el as IDomVirtual;
    } else {
      delete dynamicRefs.value?.[key];
    }
  };

  const allowChangePassword = () => {
    const idxMaskPassword = formFields.findIndex((field) => field.key === FieldEnum.MASK_PASSWORD);
    formFields[idxMaskPassword].isShow = false;
    formFields.filter((field) => passwordRelatedFields.includes(field.key)).forEach((field) => (field.isShow = true));

    isChangingPassword.value = true;

    // Focus to password field
    nextTick(() => {
      dynamicRefs.value?.[FieldEnum.PASSWORD as string]?.focus();
    });
  };

  // TODO confirm again
  const cancelChangePassword = () => {
    const idxMaskPassword = formFields.findIndex((field) => field.key === FieldEnum.MASK_PASSWORD);
    formFields[idxMaskPassword].isShow = true;
    formFields
      .filter((field) => passwordRelatedFields.includes(field.key as FieldEnum))
      .forEach((field) => {
        field.isShow = false;
        formProfileValues[field.key as FieldEnum] = undefined;
      });

    isChangingPassword.value = false;

    window?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  };

  const submitUpdatePassword = async (showToast = true): Promise<boolean> => {
    try {
      const message = await $userService.updatePassword({
        password: formProfileValues.password,
        newPassword: formProfileValues.newPassword || "",
      });

      if (message) {
        throw new Error(message);
      }

      cancelChangePassword();

      if (showToast) {
        createToast({
          variant: "success",
          description: "Thay đổi mật khẩu thành công.",
        });
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });

      return false;
    }
  };

  const updateProfile = async (showToast = true): Promise<boolean> => {
    try {
      // Update Password if changing password is true
      if (isValidChangePassword.value) {
        const isSucceeded = await submitUpdatePassword(false);
        if (!isSucceeded) return false;
      }

      // Update Profile
      const payload: Partial<IProfileForm> = {};

      if (!isDisplayNameUpdated.value && !!formProfileValues.fullname) {
        payload.fullname = formProfileValues.fullname;
      }

      if (!isVerifiedEmail.value && !!formProfileValues.email) {
        payload.email = formProfileValues.email;
      }

      if (!isVerifiedPhone.value) {
        payload.phone = formProfileValues.phone;
      }

      if (Object.keys(payload).length > 0) {
        await $userService.updateProfileInfo(payload);
        await refreshUserInfo();

        if (showToast) {
          createToast({
            description: "Cập nhật thông tin tài khoản thành công.",
          });
        }
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });

      return false;
    }
  };

  const sendVerifyEmail = async (showToast = true): Promise<boolean> => {
    try {
      if (!formProfileValues.email) {
        return false;
      }

      isSendingVerifyEmail.value = true;

      // Update email before send verify email
      if (isValidChangeProfile.value) {
        const isUpdateProfileSucceeded = await updateProfile(false);
        if (!isUpdateProfileSucceeded) {
          isSendingVerifyEmail.value = false;
          return false;
        }
      }

      const message = await $userService.sendVerifyEmail({
        email: formProfileValues.email,
      });

      if (showToast) {
        createToast({
          description: message || "Vui lòng kiểm tra email để xác thực.",
        });
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message || "Xác thực email thất bại.",
      });

      isSendingVerifyEmail.value = false;
      return false;
    }
  };

  return {
    isDisplayNameUpdated,
    formFields,
    formProfileValues,
    isVerifiedEmail,
    isVerifiedPhone,
    FieldEnum,
    allowChangePassword,
    isChangingPassword,
    cancelChangePassword,
    profileValidationSchema,
    updateProfile,
    isEnableButtonSubmit,
    isSendingVerifyEmail,
    sendVerifyEmail,
    setRef,
    isValidChangeProfile,
    submitUpdatePassword,
    changePasswordValidationSchema,
    dynamicRefs,
  };
};
