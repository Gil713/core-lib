import { cva } from "class-variance-authority";

export enum MaintenanceStatusIndicatorBtnStatusEnum {
  DEFAULT = "default",
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
}

export const maintenanceStatusIndicatorBtnVariants = cva(
  "relative flex items-center justify-center border rounded-lg cursor-pointer",
  {
    variants: {
      status: {
        [MaintenanceStatusIndicatorBtnStatusEnum.ACTIVE]: "border-tab-payment-borderActive bg-tab-payment-bgActive",
        [MaintenanceStatusIndicatorBtnStatusEnum.MAINTENANCE]:
          "bg-tab-payment-bgDisabled pointer-events-none border-none",
        [MaintenanceStatusIndicatorBtnStatusEnum.DEFAULT]:
          "border-tab-payment-borderInactive bg-tab-payment-bgInactive",
      },
    },
    defaultVariants: {
      status: MaintenanceStatusIndicatorBtnStatusEnum.DEFAULT,
    },
  },
);
