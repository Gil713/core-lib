import * as z from "zod";
type ISchemaBuilder = {
  password: z.ZodEffects<z.ZodString, unknown, unknown>;
  username: z.ZodEffects<z.ZodString, string, string>;
  fullname: z.ZodEffects<z.ZodString, unknown, unknown>;
  phone: z.ZodEffects<z.ZodString, unknown, unknown>;
  amount: z.ZodEffects<z.ZodNumber, unknown, unknown>;
  package_id: z.ZodEffects<z.ZodNumber, unknown, unknown>;
  wallet_address: z.ZodEffects<z.ZodString, string, string>;
  card_serial: z.ZodEffects<z.ZodString, string, unknown>;
  card_code: z.ZodEffects<z.ZodString, string, unknown>;
  email: z.ZodEffects<z.ZodString, unknown, unknown>;
  newPassword: z.ZodEffects<
    z.ZodObject<{ newPassword: z.ZodString; confirmNewPassword: z.ZodString }>,
    unknown,
    unknown
  >;
  amount_withdraw: z.ZodEffects<z.ZodNumber, unknown, unknown>;
  bank_account_name: z.ZodEffects<z.ZodString, unknown, unknown>;
  bank_account_no: z.ZodEffects<z.ZodString, unknown, unknown>;
  bank_code: z.ZodEffects<z.ZodString, unknown, unknown>;
  forgotPasswordForm: z.ZodEffects<
    z.ZodObject<{ password: z.ZodString; confirmPassword: z.ZodString }>,
    unknown,
    unknown
  >;
};

type ISchemaBuilderUnknown = {
  password: unknown;
  username: unknown;
  phone: unknown;
  wallet_address: unknown;
  amount: unknown;
  fullname: unknown;
  email: unknown;
  newPassword: unknown;
};

const validate = {
  username: {
    min: 6,
    max: 24,
  },
  fullname: {
    min: 6,
    max: 15,
  },
  phone: {
    length: 10,
  },
  email: {
    min: 6,
    max: 32,
  },
  password: {
    min: 6,
    max: 32,
  },
  withdrawCrypto: {
    min: 100,
  },
  deposit: {
    min: 50,
    max: 300000,
  },
  cardSerial: {
    zingMin: CARD_SERIAL_LENGTH.ZING_MIN,
    min: CARD_SERIAL_LENGTH.MIN,
    max: CARD_SERIAL_LENGTH.MAX,
  },
  cardCode: {
    zingMin: CARD_CODE_LENGTH.ZING_MIN,
    min: CARD_CODE_LENGTH.MIN,
    max: CARD_CODE_LENGTH.MAX,
  },
  amountWithdrawBank: {
    min: 100,
  },
  codePayTimeOut: 480,
};

export default function createSchemaValidationBuilder() {
  const schema: Partial<ISchemaBuilder> = {};

  return {
    buildPasswordSchema() {
      schema.password = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập mật khẩu",
          })
          .min(validate.password.min, {
            message: `Vui lòng không nhập ít hơn ${validate.password.min} ký tự`,
          })
          .max(validate.password.max, {
            message: `Vui lòng không nhập nhiều hơn ${validate.password.max} ký tự`,
          }),
      );

      return this;
    },
    buildNewPasswordSchema() {
      return z
        .object({
          newPassword: z.preprocess(
            (val) => val || undefined,
            z
              .string({
                required_error: "Vui lòng nhập mật khẩu mới",
              })
              .min(validate.password.min, {
                message: `Vui lòng không nhập ít hơn ${validate.password.min} ký tự`,
              })
              .max(validate.password.max, {
                message: `Vui lòng không nhập nhiều hơn ${validate.password.max} ký tự`,
              }),
          ),
          confirmNewPassword: z.string(),
        })
        .refine((data) => data.newPassword === data.confirmNewPassword, {
          message: "Mật khẩu mới không giống nhau",
          path: ["confirmNewPassword"],
        });
    },
    buildDisplayNameSchema(username?: string) {
      const message = "Từ 6-15 ký tự, không chứa ký tự đặc biệt. \nKhông được trùng lặp với tên đăng nhập";
      schema.fullname = z
        .string({ message })
        .refine(
          (displayName) =>
            displayName !== username &&
            displayName.length >= Number(validate.fullname.min) &&
            displayName.length <= Number(validate.fullname.max),
          {
            message,
          },
        );

      return this;
    },
    buildUsernameSchema() {
      schema.username = z
        .string({
          required_error: "Vui lòng nhập tên đăng nhập",
        })
        .refine(
          (value) => value.length >= Number(validate.username.min) && value.length <= Number(validate.username.max),
          {
            message: "Tên đăng nhập không hợp lệ",
          },
        );

      return this;
    },
    buildPhoneSchema() {
      schema.phone = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập số điện thoại",
          })
          .min(validate.phone.length, {
            message: `Vui lòng không nhập ít hơn ${validate.phone.length} ký tự`,
          })
          .refine((value) => value.length === validate.phone.length && isVietnamesePhoneNumber(value), {
            message: "Số điện thoại không hợp lệ",
          }),
      );

      return this;
    },
    buildAmountDepositSchema() {
      schema.amount = z.preprocess(
        (val) => {
          if (!val) return undefined;
          return +val;
        },
        z
          .number({
            required_error: "Vui lòng nhập số tiền nạp",
          })
          .min(Number(validate.deposit.min), {
            message: `Số tiền nạp tối thiểu là ${formatVNDCurrency(validate.deposit.min * RATE_K_VND)}`,
          })
          .max(Number(validate.deposit.max), {
            message: `Số tiền nạp tối đa là ${formatVNDCurrency(validate.deposit.max * RATE_K_VND)}`,
          }),
      );

      return this;
    },
    buildAmountWithdrawCryptoSchema(availableBalance: number) {
      schema.amount = z.preprocess(
        (val) => {
          if (!val) return undefined;
          return +val;
        },
        z
          .number({
            required_error: "Vui lòng nhập số tiền cần rút",
          })
          .min(Number(validate.withdrawCrypto.min), {
            message: `Số tiền rút tối thiểu là ${validate.withdrawCrypto.min} K`,
          })
          .max(Number(availableBalance), {
            message: "Vượt quá số tiền khả dụng",
          }),
      );

      return this;
    },
    buildWalletAddressWithdrawCryptoSchema() {
      schema.wallet_address = z.preprocess(
        (val) => {
          if (!val) return undefined;
          return val;
        },
        z
          .string({
            required_error: "Vui lòng nhập địa chỉ ví của bạn",
          })
          .refine((value) => isTrc20Wallet(value) || isErc20Wallet(value), {
            message: "Địa chỉ ví không hợp lệ",
          }),
      );

      return this;
    },
    buildPackageDepositSchema() {
      schema.package_id = z.preprocess(
        (val) => {
          if (!val) return undefined;
          return +val;
        },
        z.number({
          required_error: "Vui lòng chọn gói nạp",
        }),
      );

      return this;
    },
    buildCardSerialSchema(networkKey: SystemPhoneCardPaymentNameEnum) {
      const minLength =
        networkKey === SystemPhoneCardPaymentNameEnum.ZING
          ? Number(validate.cardSerial.zingMin)
          : Number(validate.cardSerial.min);

      schema.card_serial = z.preprocess(
        (val) => {
          return val || undefined;
        },
        z
          .string({
            required_error: "Vui lòng nhập số seri thẻ",
          })
          .min(minLength, {
            message: `Vui lòng không nhập ít hơn ${minLength} chữ số`,
          })
          .max(validate.cardSerial.max, {
            message: `Vui lòng không nhập nhiều hơn ${validate.cardSerial.max} chữ số`,
          }),
      );

      return this;
    },
    buildCardCodeSchema(networkKey: SystemPhoneCardPaymentNameEnum) {
      const minLength =
        networkKey === SystemPhoneCardPaymentNameEnum.ZING
          ? Number(validate.cardCode.zingMin)
          : Number(validate.cardCode.min);

      schema.card_code = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập mã thẻ (mã pin)",
          })
          .min(minLength, {
            message: `Vui lòng không nhập ít hơn ${minLength} chữ số`,
          })
          .max(validate.cardCode.max, {
            message: `Vui lòng không nhập nhiều hơn ${validate.cardCode.max} chữ số`,
          }),
      );

      return this;
    },
    buildEmailSchema(isNullish: boolean = false) {
      const validateSchema = z
        .string({
          required_error: "Vui lòng nhập email",
        })
        .min(validate.email.min, {
          message: `Vui lòng không nhập ít hơn ${validate.email.min} ký tự`,
        })
        .max(validate.email.max, {
          message: `Vui lòng không nhập nhiều hơn ${validate.email.max} ký tự`,
        })
        .email({
          message: "Địa chỉ email không hợp lệ",
        });

      schema.email = z.preprocess((val) => val || undefined, isNullish ? validateSchema.nullish() : validateSchema);

      return this;
    },
    buildFullnameSchema() {
      schema.fullname = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập tên hiển thị",
          })
          .min(validate.fullname.min, {
            message: `Vui lòng không nhập ít hơn ${validate.fullname.min} ký tự`,
          })
          .max(validate.fullname.max, {
            message: `Vui lòng không nhập nhiều hơn ${validate.fullname.max} ký tự`,
          })
          .regex(/^[a-zA-Z0-9]+$/g, {
            message: "Tên hiển thị không chứa các kí tự đặc biệt",
          })
          .nullish(),
      );

      return this;
    },
    buildAmountWithdrawBankSchema(availableBalance: number) {
      schema.amount_withdraw = z.preprocess(
        (val) => {
          if (!val) return undefined;
          return +val;
        },
        z
          .number({
            required_error: "Vui lòng nhập số tiền cần rút",
          })
          .min(Number(validate.amountWithdrawBank.min), {
            message: `Số tiền rút tối thiểu là ${validate.amountWithdrawBank.min} K`,
          })
          .max(Number(availableBalance), {
            message: "Vượt quá số tiền khả dụng",
          }),
      );

      return this;
    },
    buildBankAccountNoSchema(minLength: number, maxLength: number) {
      schema.bank_account_no = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập số tài khoản",
          })
          .min(minLength, {
            message: `Vui lòng không nhập ít hơn ${minLength} ký tự`,
          })
          .max(maxLength, {
            message: `Vui lòng không nhập nhiều hơn ${maxLength} ký tự`,
          }),
      );

      return this;
    },
    buildBankAccountNameSchema(minLength: number, maxLength: number) {
      schema.bank_account_name = z.preprocess(
        (val) => val || undefined,
        z
          .string({
            required_error: "Vui lòng nhập tên chủ thẻ",
          })
          .min(minLength, {
            message: `Vui lòng không nhập ít hơn ${minLength} ký tự`,
          })
          .max(maxLength, {
            message: `Vui lòng không nhập nhiều hơn ${maxLength} ký tự`,
          })
          .regex(/^[a-zA-Z ]+$/g, {
            message: "Tên chủ thẻ không chứa các kí tự đặc biệt",
          }),
      );

      return this;
    },
    buildConfirmPasswordSchema() {
      return z
        .object({
          password: z
            .string({
              required_error: "Vui lòng nhập mật khẩu",
            })
            .min(validate.password.min, {
              message: `Vui lòng không nhập ít hơn ${validate.password.min} ký tự`,
            })
            .max(validate.password.max, {
              message: `Vui lòng không nhập nhiều hơn ${validate.password.max} ký tự`,
            }),
          confirmPassword: z
            .string({
              required_error: "Vui lòng nhập mật khẩu mới",
            })
            .min(validate.password.min, {
              message: `Vui lòng không nhập ít hơn ${validate.password.min} ký tự`,
            })
            .max(validate.password.max, {
              message: `Vui lòng không nhập nhiều hơn ${validate.password.max} ký tự`,
            }),
        })
        .refine((values) => values.password === values.confirmPassword, {
          message: "Mật khẩu xác nhận không khớp với mật khẩu",
          path: ["confirmPassword"],
        });
    },
    build(): z.ZodObject<Partial<ISchemaBuilder>, "strip", z.ZodTypeAny, Partial<ISchemaBuilderUnknown>> {
      return z.object(schema);
    },
  };
}
