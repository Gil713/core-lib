import type { IBreadcrumb } from "../../components/atomics/custom/breadcumb/type";

type ITabDetail = {
  icon: string;
  name: string;
  key: string;
  content?: string;
};
export const usePromotionByAlias = (alias: string) => {
  const { $systemService } = useNuxtApp();

  const appStore = useAppStore();
  const currentRoute = useRoute();
  const authDialogController = useDialog(DialogTypeEnum.LOGIN);

  const { categories } = useCategoriesByAlias({ alias: CategoryAliasEnum.KHUYEN_MAI });

  const {
    data: promotionDetail,
    status,
    error,
  } = useAsyncData(currentRoute.fullPath + "events", () => $systemService.getPromotionByAlias(alias), {
    lazy: true,
    immediate: alias !== "vip",
  });

  const tabs = computed<ITabDetail[]>(() =>
    [
      {
        icon: "SvgoBonus",
        name: "Bảng Thưởng",
        key: "bonus",
        content: promotionDetail.value?.event_type?.includes("event") ? "bonus" : undefined,
      },
      {
        icon: "SvgoCondition",
        name: "Mô Tả",
        key: "description",
        content: promotionDetail.value?.content?.short_description,
      },
      {
        icon: "SvgoRule",
        name: "Thể Lệ",
        key: "rule",
        content: promotionDetail.value?.content?.rules,
      },
      {
        icon: "SvgoRule",
        name: "Cơ Cấu",
        key: "award_structure",
        content: promotionDetail.value?.content?.award_structure,
      },
      {
        icon: "SvgoCondition",
        name: "Điều Kiện",
        key: "condition",
        content: promotionDetail.value?.content?.term_condition,
      },
    ].filter((tab) => !!tab.content),
  );

  const breadcrumbs = computed<IBreadcrumb[]>(() => {
    const currentCategory = categories.value?.find((category) => category.alias === promotionDetail.value?.paths?.[0]);
    return [
      {
        label: "Khuyến mãi",
        url: APP_PATH.PROMOTION,
      },
      {
        label: currentCategory?.display_name || "Chi tiết",
        url: `${APP_PATH.PROMOTION_CATEGORY}/${currentCategory?.alias}`,
      },
      {
        label: promotionDetail.value?.event_name || "",
        url: currentRoute.path,
      },
    ];
  });

  const createNewDeposit = async () => {
    if (appStore.isLoggedIn) {
      navigateTo(promotionDetail.value?.content?.cta_navigation_link ?? APP_PATH.DEPOSIT_CODEPAY);
      return;
    }
    await navigateTo({
      query: { ...currentRoute.query, openUrl: promotionDetail.value?.content?.cta_navigation_link },
    });

    authDialogController.openDialog();
  };

  watchEffect(() => {
    useBaseSeo({
      content_title: promotionDetail?.value?.seo?.meta_title || "",
      meta_title: promotionDetail?.value?.seo?.meta_title || "",
      meta_description: promotionDetail?.value?.seo?.meta_description || "",
      meta_keyword: promotionDetail?.value?.seo?.meta_keyword || "",
      alias: `${useNuxtApp().$domainUrl}${APP_PATH.PROMOTION}/${useRoute().params.slug as string}`,
      seo_img: promotionDetail?.value?.seo?.img || "",
    });
  });

  const generateCTA = computed(() => ({
    style: {
      width: promotionDetail.value?.content?.cta_width,
      height: promotionDetail.value?.content?.cta_height,
      backgroundColor: promotionDetail.value?.content.cta_background_color,
    },
    text: promotionDetail.value?.content?.cta_text,
  }));

  return {
    status,
    error,
    promotionDetail,
    tabs,
    createNewDeposit,
    authDialogController,
    breadcrumbs,
    generateCTA,
  };
};
