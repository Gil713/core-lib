import type { DefineComponent, SlotsType } from "vue";
type IslandComponent<T extends DefineComponent> = T &
  DefineComponent<
    {},
    { refresh: () => Promise<void> },
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    SlotsType<{ fallback: { error: unknown } }>
  >;
interface _GlobalComponents {
  Image: (typeof import("./atomics/custom/Image.vue"))["default"];
  LoadingSpinner: (typeof import("./atomics/custom/LoadingSpinner.vue"))["default"];
  Container: (typeof import("./atomics/custom/container/Container.vue"))["default"];
  GameTag: (typeof import("./atomics/custom/game-tag/GameTag.vue"))["default"];
  Swiper: (typeof import("./atomics/custom/swiper/Swiper.vue"))["default"];
  FeatureGrid8: (typeof import("./molecules/featued-grid/FeatureGrid8-v1.vue"))["default"];
  ListWrapper: (typeof import("./molecules/ListWrapper.vue"))["default"];
  IconInput: (typeof import("./molecules/icon-input/index.vue"))["default"];
  NotiBell: (typeof import("./molecules/noti-bell/index.vue"))["default"];
  DHeader: (typeof import("./organisms/d-header/index.vue"))["default"];
  FooterDesktop: (typeof import("./organisms/footer/FooterDesktop.vue"))["default"];
  FooterMobile: (typeof import("./organisms/footer/FooterMobile.vue"))["default"];
  FeaturedCategories: (typeof import("./organisms/games/featured-aliases/FeaturedCategories.vue"))["default"];
  LiveCasino: (typeof import("./organisms/games/live-casino/LiveCasinoDesktop.vue"))["default"];
  Header: (typeof import("./organisms/header/index.vue"))["default"];
  LoggedUser: (typeof import("./organisms/header/mobile/logged-user.vue"))["default"];
  NotLoggedUser: (typeof import("./organisms/header/mobile/not-logged-user.vue"))["default"];
  Support: (typeof import("./organisms/widget/Widget.vue"))["default"];
  BannerSwiper: (typeof import("./organisms/swiper/banner/BannerSwiper.vue"))["default"];
  HomeDesktop: (typeof import("./pages/home/Desktop.vue"))["default"];
  SvgoArrow: (typeof import("../assets/icons/arrow"))["default"];
  SvgoBank: (typeof import("../assets/icons/bank"))["default"];
  SvgoBitcoin: (typeof import("../assets/icons/bitcoin"))["default"];
  SvgoCodepay: (typeof import("../assets/icons/codepay"))["default"];
  SvgoHot: (typeof import("../assets/icons/hot"))["default"];
  SvgoLivechat: (typeof import("../assets/icons/livechat"))["default"];
  SvgoLock: (typeof import("../assets/icons/lock"))["default"];
  SvgoMail: (typeof import("../assets/icons/mail"))["default"];
  SvgoMomo: (typeof import("../assets/icons/momo"))["default"];
  SvgoP2p: (typeof import("../assets/icons/p2p"))["default"];
  SvgoTelegram: (typeof import("../assets/icons/telegram"))["default"];
  SvgoTheCao: (typeof import("../assets/icons/the-cao"))["default"];
  SvgoViettelpay: (typeof import("../assets/icons/viettelpay"))["default"];
  NuxtWelcome: (typeof import("nuxt/dist/app/components/welcome"))["default"];
  NuxtLayout: (typeof import("nuxt/dist/app/components/nuxt-layout"))["default"];
  NuxtErrorBoundary: (typeof import("nuxt/dist/app/components/nuxt-error-boundary"))["default"];
  ClientOnly: (typeof import("nuxt/dist/app/components/client-only"))["default"];
  DevOnly: (typeof import("nuxt/dist/app/components/dev-only"))["default"];
  ServerPlaceholder: (typeof import("nuxt/dist/app/components/server-placeholder"))["default"];
  NuxtLink: (typeof import("nuxt/dist/app/components/nuxt-link"))["default"];
  NuxtLoadingIndicator: (typeof import("nuxt/dist/app/components/nuxt-loading-indicator"))["default"];
  NuxtRouteAnnouncer: (typeof import("nuxt/dist/app/components/nuxt-route-announcer"))["default"];
  NuxtImg: (typeof import("@nuxt/image/dist/runtime/components/NuxtImg.vue"))["default"];
  NuxtPicture: (typeof import("@nuxt/image/dist/runtime/components/NuxtPicture.vue"))["default"];
  Button: (typeof import("./atomics/shadcn/button/index"))["Button"];
  Dialog: (typeof import("./atomics/shadcn/dialog/index"))["Dialog"];
  DialogClose: (typeof import("./atomics/shadcn/dialog/index"))["DialogClose"];
  DialogContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogContent"];
  DialogDescription: (typeof import("./atomics/shadcn/dialog/index"))["DialogDescription"];
  DialogFooter: (typeof import("./atomics/shadcn/dialog/index"))["DialogFooter"];
  DialogHeader: (typeof import("./atomics/shadcn/dialog/index"))["DialogHeader"];
  DialogScrollContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogScrollContent"];
  DialogTitle: (typeof import("./atomics/shadcn/dialog/index"))["DialogTitle"];
  DialogTrigger: (typeof import("./atomics/shadcn/dialog/index"))["DialogTrigger"];
  Input: (typeof import("./atomics/shadcn/input/index"))["Input"];
  Tooltip: (typeof import("./atomics/shadcn/tooltip/index"))["Tooltip"];
  TooltipContent: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipContent"];
  TooltipProvider: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipProvider"];
  TooltipTrigger: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipTrigger"];
  NuxtIcon: (typeof import("nuxt-svgo/dist/runtime/components/nuxt-icon.vue"))["default"];
  NuxtPage: (typeof import("nuxt/dist/pages/runtime/page"))["default"];
  NoScript: (typeof import("nuxt/dist/head/runtime/components"))["NoScript"];
  Link: (typeof import("nuxt/dist/head/runtime/components"))["Link"];
  Base: (typeof import("nuxt/dist/head/runtime/components"))["Base"];
  Title: (typeof import("nuxt/dist/head/runtime/components"))["Title"];
  Meta: (typeof import("nuxt/dist/head/runtime/components"))["Meta"];
  Style: (typeof import("nuxt/dist/head/runtime/components"))["Style"];
  Head: (typeof import("nuxt/dist/head/runtime/components"))["Head"];
  Html: (typeof import("nuxt/dist/head/runtime/components"))["Html"];
  Body: (typeof import("nuxt/dist/head/runtime/components"))["Body"];
  NuxtIsland: (typeof import("nuxt/dist/app/components/nuxt-island"))["default"];
  NuxtRouteAnnouncer: IslandComponent<
    (typeof import("nuxt/dist/app/components/server-placeholder"))["default"]
  >;
  LazyImage: (typeof import("./atomics/custom/Image.vue"))["default"];
  LazyLoadingSpinner: (typeof import("./atomics/custom/LoadingSpinner.vue"))["default"];
  LazyContainer: (typeof import("./atomics/custom/container/Container.vue"))["default"];
  LazyGameTag: (typeof import("./atomics/custom/game-tag/GameTag.vue"))["default"];
  LazySwiper: (typeof import("./atomics/custom/swiper/Swiper.vue"))["default"];
  LazyFeatureGrid8: (typeof import("./molecules/featued-grid/FeatureGrid8-v1.vue"))["default"];
  LazyListWrapper: (typeof import("./molecules/ListWrapper.vue"))["default"];
  LazyIconInput: (typeof import("./molecules/icon-input/index.vue"))["default"];
  LazyNotiBell: (typeof import("./molecules/noti-bell/index.vue"))["default"];
  LazyDHeader: (typeof import("./organisms/d-header/index.vue"))["default"];
  LazyFooterDesktop: (typeof import("./organisms/footer/FooterDesktop.vue"))["default"];
  LazyFooterMobile: (typeof import("./organisms/footer/FooterMobile.vue"))["default"];
  LazyFeaturedCategories: (typeof import("./organisms/games/featured-aliases/FeaturedCategories.vue"))["default"];
  LazyLiveCasino: (typeof import("./organisms/games/live-casino/LiveCasinoDesktop.vue"))["default"];
  LazyHeader: (typeof import("./organisms/header/index.vue"))["default"];
  LazyLoggedUser: (typeof import("./organisms/header/mobile/logged-user.vue"))["default"];
  LazyNotLoggedUser: (typeof import("./organisms/header/mobile/not-logged-user.vue"))["default"];
  LazySupport: (typeof import("./organisms/widget/Widget.vue"))["default"];
  LazyBannerSwiper: (typeof import("./organisms/swiper/banner/BannerSwiper.vue"))["default"];
  LazyHomeDesktop: (typeof import("./pages/home/Desktop.vue"))["default"];
  LazySvgoArrow: (typeof import("../assets/icons/arrow"))["default"];
  LazySvgoBank: (typeof import("../assets/icons/bank"))["default"];
  LazySvgoBitcoin: (typeof import("../assets/icons/bitcoin"))["default"];
  LazySvgoCodepay: (typeof import("../assets/icons/codepay"))["default"];
  LazySvgoHot: (typeof import("../assets/icons/hot"))["default"];
  LazySvgoLivechat: (typeof import("../assets/icons/livechat"))["default"];
  LazySvgoLock: (typeof import("../assets/icons/lock"))["default"];
  LazySvgoMail: (typeof import("../assets/icons/mail"))["default"];
  LazySvgoMomo: (typeof import("../assets/icons/momo"))["default"];
  LazySvgoP2p: (typeof import("../assets/icons/p2p"))["default"];
  LazySvgoTelegram: (typeof import("../assets/icons/telegram"))["default"];
  LazySvgoTheCao: (typeof import("../assets/icons/the-cao"))["default"];
  LazySvgoViettelpay: (typeof import("../assets/icons/viettelpay"))["default"];
  LazyNuxtWelcome: (typeof import("nuxt/dist/app/components/welcome"))["default"];
  LazyNuxtLayout: (typeof import("nuxt/dist/app/components/nuxt-layout"))["default"];
  LazyNuxtErrorBoundary: (typeof import("nuxt/dist/app/components/nuxt-error-boundary"))["default"];
  LazyClientOnly: (typeof import("nuxt/dist/app/components/client-only"))["default"];
  LazyDevOnly: (typeof import("nuxt/dist/app/components/dev-only"))["default"];
  LazyServerPlaceholder: (typeof import("nuxt/dist/app/components/server-placeholder"))["default"];
  LazyNuxtLink: (typeof import("nuxt/dist/app/components/nuxt-link"))["default"];
  LazyNuxtLoadingIndicator: (typeof import("nuxt/dist/app/components/nuxt-loading-indicator"))["default"];
  LazyNuxtRouteAnnouncer: (typeof import("nuxt/dist/app/components/nuxt-route-announcer"))["default"];
  LazyNuxtImg: (typeof import("@nuxt/image/dist/runtime/components/NuxtImg.vue"))["default"];
  LazyNuxtPicture: (typeof import("@nuxt/image/dist/runtime/components/NuxtPicture.vue"))["default"];
  LazyButton: (typeof import("./atomics/shadcn/button/index"))["Button"];
  LazyDialog: (typeof import("./atomics/shadcn/dialog/index"))["Dialog"];
  LazyDialogClose: (typeof import("./atomics/shadcn/dialog/index"))["DialogClose"];
  LazyDialogContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogContent"];
  LazyDialogDescription: (typeof import("./atomics/shadcn/dialog/index"))["DialogDescription"];
  LazyDialogFooter: (typeof import("./atomics/shadcn/dialog/index"))["DialogFooter"];
  LazyDialogHeader: (typeof import("./atomics/shadcn/dialog/index"))["DialogHeader"];
  LazyDialogScrollContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogScrollContent"];
  LazyDialogTitle: (typeof import("./atomics/shadcn/dialog/index"))["DialogTitle"];
  LazyDialogTrigger: (typeof import("./atomics/shadcn/dialog/index"))["DialogTrigger"];
  LazyInput: (typeof import("./atomics/shadcn/input/index"))["Input"];
  LazyTooltip: (typeof import("./atomics/shadcn/tooltip/index"))["Tooltip"];
  LazyTooltipContent: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipContent"];
  LazyTooltipProvider: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipProvider"];
  LazyTooltipTrigger: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipTrigger"];
  LazyNuxtIcon: (typeof import("nuxt-svgo/dist/runtime/components/nuxt-icon.vue"))["default"];
  LazyNuxtPage: (typeof import("nuxt/dist/pages/runtime/page"))["default"];
  LazyNoScript: (typeof import("nuxt/dist/head/runtime/components"))["NoScript"];
  LazyLink: (typeof import("nuxt/dist/head/runtime/components"))["Link"];
  LazyBase: (typeof import("nuxt/dist/head/runtime/components"))["Base"];
  LazyTitle: (typeof import("nuxt/dist/head/runtime/components"))["Title"];
  LazyMeta: (typeof import("nuxt/dist/head/runtime/components"))["Meta"];
  LazyStyle: (typeof import("nuxt/dist/head/runtime/components"))["Style"];
  LazyHead: (typeof import("nuxt/dist/head/runtime/components"))["Head"];
  LazyHtml: (typeof import("nuxt/dist/head/runtime/components"))["Html"];
  LazyBody: (typeof import("nuxt/dist/head/runtime/components"))["Body"];
  LazyNuxtIsland: (typeof import("nuxt/dist/app/components/nuxt-island"))["default"];
  LazyNuxtRouteAnnouncer: IslandComponent<
    (typeof import("nuxt/dist/app/components/server-placeholder"))["default"]
  >;
}

declare module "vue" {
  export interface GlobalComponents extends _GlobalComponents {}
}

export const Image: (typeof import("./atomics/custom/Image.vue"))["default"];
export const LoadingSpinner: (typeof import("./atomics/custom/LoadingSpinner.vue"))["default"];
export const Container: (typeof import("./atomics/custom/container/Container.vue"))["default"];
export const GameTag: (typeof import("./atomics/custom/game-tag/GameTag.vue"))["default"];
export const Swiper: (typeof import("./atomics/custom/swiper/Swiper.vue"))["default"];
export const FeatureGrid8: (typeof import("./molecules/featued-grid/FeatureGrid8-v1.vue"))["default"];
export const ListWrapper: (typeof import("./molecules/ListWrapper.vue"))["default"];
export const IconInput: (typeof import("./molecules/icon-input/index.vue"))["default"];
export const NotiBell: (typeof import("./molecules/noti-bell/index.vue"))["default"];
export const DHeader: (typeof import("./organisms/d-header/index.vue"))["default"];
export const FooterDesktop: (typeof import("./organisms/footer/FooterDesktop.vue"))["default"];
export const FooterMobile: (typeof import("./organisms/footer/FooterMobile.vue"))["default"];
export const FeaturedCategories: (typeof import("./organisms/games/featured-aliases/FeaturedCategories.vue"))["default"];
export const LiveCasino: (typeof import("./organisms/games/live-casino/LiveCasinoDesktop.vue"))["default"];
export const Header: (typeof import("./organisms/header/index.vue"))["default"];
export const LoggedUser: (typeof import("./organisms/header/mobile/logged-user.vue"))["default"];
export const NotLoggedUser: (typeof import("./organisms/header/mobile/not-logged-user.vue"))["default"];
export const Support: (typeof import("./organisms/widget/Widget.vue"))["default"];
export const BannerSwiper: (typeof import("./organisms/swiper/banner/BannerSwiper.vue"))["default"];
export const HomeDesktop: (typeof import("./pages/home/Desktop.vue"))["default"];
export const SvgoArrow: (typeof import("../assets/icons/arrow"))["default"];
export const SvgoBank: (typeof import("../assets/icons/bank"))["default"];
export const SvgoBitcoin: (typeof import("../assets/icons/bitcoin"))["default"];
export const SvgoCodepay: (typeof import("../assets/icons/codepay"))["default"];
export const SvgoHot: (typeof import("../assets/icons/hot"))["default"];
export const SvgoLivechat: (typeof import("../assets/icons/livechat"))["default"];
export const SvgoLock: (typeof import("../assets/icons/lock"))["default"];
export const SvgoMail: (typeof import("../assets/icons/mail"))["default"];
export const SvgoMomo: (typeof import("../assets/icons/momo"))["default"];
export const SvgoP2p: (typeof import("../assets/icons/p2p"))["default"];
export const SvgoTelegram: (typeof import("../assets/icons/telegram"))["default"];
export const SvgoTheCao: (typeof import("../assets/icons/the-cao"))["default"];
export const SvgoViettelpay: (typeof import("../assets/icons/viettelpay"))["default"];
export const NuxtWelcome: (typeof import("nuxt/dist/app/components/welcome"))["default"];
export const NuxtLayout: (typeof import("nuxt/dist/app/components/nuxt-layout"))["default"];
export const NuxtErrorBoundary: (typeof import("nuxt/dist/app/components/nuxt-error-boundary"))["default"];
export const ClientOnly: (typeof import("nuxt/dist/app/components/client-only"))["default"];
export const DevOnly: (typeof import("nuxt/dist/app/components/dev-only"))["default"];
export const ServerPlaceholder: (typeof import("nuxt/dist/app/components/server-placeholder"))["default"];
export const NuxtLink: (typeof import("nuxt/dist/app/components/nuxt-link"))["default"];
export const NuxtLoadingIndicator: (typeof import("nuxt/dist/app/components/nuxt-loading-indicator"))["default"];
export const NuxtRouteAnnouncer: (typeof import("nuxt/dist/app/components/nuxt-route-announcer"))["default"];
export const NuxtImg: (typeof import("@nuxt/image/dist/runtime/components/NuxtImg.vue"))["default"];
export const NuxtPicture: (typeof import("@nuxt/image/dist/runtime/components/NuxtPicture.vue"))["default"];
export const Button: (typeof import("./atomics/shadcn/button/index"))["Button"];
export const Dialog: (typeof import("./atomics/shadcn/dialog/index"))["Dialog"];
export const DialogClose: (typeof import("./atomics/shadcn/dialog/index"))["DialogClose"];
export const DialogContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogContent"];
export const DialogDescription: (typeof import("./atomics/shadcn/dialog/index"))["DialogDescription"];
export const DialogFooter: (typeof import("./atomics/shadcn/dialog/index"))["DialogFooter"];
export const DialogHeader: (typeof import("./atomics/shadcn/dialog/index"))["DialogHeader"];
export const DialogScrollContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogScrollContent"];
export const DialogTitle: (typeof import("./atomics/shadcn/dialog/index"))["DialogTitle"];
export const DialogTrigger: (typeof import("./atomics/shadcn/dialog/index"))["DialogTrigger"];
export const Input: (typeof import("./atomics/shadcn/input/index"))["Input"];
export const Tooltip: (typeof import("./atomics/shadcn/tooltip/index"))["Tooltip"];
export const TooltipContent: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipContent"];
export const TooltipProvider: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipProvider"];
export const TooltipTrigger: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipTrigger"];
export const NuxtIcon: (typeof import("nuxt-svgo/dist/runtime/components/nuxt-icon.vue"))["default"];
export const NuxtPage: (typeof import("nuxt/dist/pages/runtime/page"))["default"];
export const NoScript: (typeof import("nuxt/dist/head/runtime/components"))["NoScript"];
export const Link: (typeof import("nuxt/dist/head/runtime/components"))["Link"];
export const Base: (typeof import("nuxt/dist/head/runtime/components"))["Base"];
export const Title: (typeof import("nuxt/dist/head/runtime/components"))["Title"];
export const Meta: (typeof import("nuxt/dist/head/runtime/components"))["Meta"];
export const Style: (typeof import("nuxt/dist/head/runtime/components"))["Style"];
export const Head: (typeof import("nuxt/dist/head/runtime/components"))["Head"];
export const Html: (typeof import("nuxt/dist/head/runtime/components"))["Html"];
export const Body: (typeof import("nuxt/dist/head/runtime/components"))["Body"];
export const NuxtIsland: (typeof import("nuxt/dist/app/components/nuxt-island"))["default"];
export const NuxtRouteAnnouncer: IslandComponent<
  (typeof import("nuxt/dist/app/components/server-placeholder"))["default"]
>;
export const LazyImage: (typeof import("./atomics/custom/Image.vue"))["default"];
export const LazyLoadingSpinner: (typeof import("./atomics/custom/LoadingSpinner.vue"))["default"];
export const LazyContainer: (typeof import("./atomics/custom/container/Container.vue"))["default"];
export const LazyGameTag: (typeof import("./atomics/custom/game-tag/GameTag.vue"))["default"];
export const LazySwiper: (typeof import("./atomics/custom/swiper/Swiper.vue"))["default"];
export const LazyFeatureGrid8: (typeof import("./molecules/featued-grid/FeatureGrid8-v1.vue"))["default"];
export const LazyListWrapper: (typeof import("./molecules/ListWrapper.vue"))["default"];
export const LazyIconInput: (typeof import("./molecules/icon-input/index.vue"))["default"];
export const LazyNotiBell: (typeof import("./molecules/noti-bell/index.vue"))["default"];
export const LazyDHeader: (typeof import("./organisms/d-header/index.vue"))["default"];
export const LazyFooterDesktop: (typeof import("./organisms/footer/FooterDesktop.vue"))["default"];
export const LazyFooterMobile: (typeof import("./organisms/footer/FooterMobile.vue"))["default"];
export const LazyFeaturedCategories: (typeof import("./organisms/games/featured-aliases/FeaturedCategories.vue"))["default"];
export const LazyLiveCasino: (typeof import("./organisms/games/live-casino/LiveCasinoDesktop.vue"))["default"];
export const LazyHeader: (typeof import("./organisms/header/index.vue"))["default"];
export const LazyLoggedUser: (typeof import("./organisms/header/mobile/logged-user.vue"))["default"];
export const LazyNotLoggedUser: (typeof import("./organisms/header/mobile/not-logged-user.vue"))["default"];
export const LazySupport: (typeof import("./organisms/widget/Widget.vue"))["default"];
export const LazyBannerSwiper: (typeof import("./organisms/swiper/banner/BannerSwiper.vue"))["default"];
export const LazyHomeDesktop: (typeof import("./pages/home/Desktop.vue"))["default"];
export const LazySvgoArrow: (typeof import("../assets/icons/arrow"))["default"];
export const LazySvgoBank: (typeof import("../assets/icons/bank"))["default"];
export const LazySvgoBitcoin: (typeof import("../assets/icons/bitcoin"))["default"];
export const LazySvgoCodepay: (typeof import("../assets/icons/codepay"))["default"];
export const LazySvgoHot: (typeof import("../assets/icons/hot"))["default"];
export const LazySvgoLivechat: (typeof import("../assets/icons/livechat"))["default"];
export const LazySvgoLock: (typeof import("../assets/icons/lock"))["default"];
export const LazySvgoMail: (typeof import("../assets/icons/mail"))["default"];
export const LazySvgoMomo: (typeof import("../assets/icons/momo"))["default"];
export const LazySvgoP2p: (typeof import("../assets/icons/p2p"))["default"];
export const LazySvgoTelegram: (typeof import("../assets/icons/telegram"))["default"];
export const LazySvgoTheCao: (typeof import("../assets/icons/the-cao"))["default"];
export const LazySvgoViettelpay: (typeof import("../assets/icons/viettelpay"))["default"];
export const LazyNuxtWelcome: (typeof import("nuxt/dist/app/components/welcome"))["default"];
export const LazyNuxtLayout: (typeof import("nuxt/dist/app/components/nuxt-layout"))["default"];
export const LazyNuxtErrorBoundary: (typeof import("nuxt/dist/app/components/nuxt-error-boundary"))["default"];
export const LazyClientOnly: (typeof import("nuxt/dist/app/components/client-only"))["default"];
export const LazyDevOnly: (typeof import("nuxt/dist/app/components/dev-only"))["default"];
export const LazyServerPlaceholder: (typeof import("nuxt/dist/app/components/server-placeholder"))["default"];
export const LazyNuxtLink: (typeof import("nuxt/dist/app/components/nuxt-link"))["default"];
export const LazyNuxtLoadingIndicator: (typeof import("nuxt/dist/app/components/nuxt-loading-indicator"))["default"];
export const LazyNuxtRouteAnnouncer: (typeof import("nuxt/dist/app/components/nuxt-route-announcer"))["default"];
export const LazyNuxtImg: (typeof import("@nuxt/image/dist/runtime/components/NuxtImg.vue"))["default"];
export const LazyNuxtPicture: (typeof import("@nuxt/image/dist/runtime/components/NuxtPicture.vue"))["default"];
export const LazyButton: (typeof import("./atomics/shadcn/button/index"))["Button"];
export const LazyDialog: (typeof import("./atomics/shadcn/dialog/index"))["Dialog"];
export const LazyDialogClose: (typeof import("./atomics/shadcn/dialog/index"))["DialogClose"];
export const LazyDialogContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogContent"];
export const LazyDialogDescription: (typeof import("./atomics/shadcn/dialog/index"))["DialogDescription"];
export const LazyDialogFooter: (typeof import("./atomics/shadcn/dialog/index"))["DialogFooter"];
export const LazyDialogHeader: (typeof import("./atomics/shadcn/dialog/index"))["DialogHeader"];
export const LazyDialogScrollContent: (typeof import("./atomics/shadcn/dialog/index"))["DialogScrollContent"];
export const LazyDialogTitle: (typeof import("./atomics/shadcn/dialog/index"))["DialogTitle"];
export const LazyDialogTrigger: (typeof import("./atomics/shadcn/dialog/index"))["DialogTrigger"];
export const LazyInput: (typeof import("./atomics/shadcn/input/index"))["Input"];
export const LazyTooltip: (typeof import("./atomics/shadcn/tooltip/index"))["Tooltip"];
export const LazyTooltipContent: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipContent"];
export const LazyTooltipProvider: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipProvider"];
export const LazyTooltipTrigger: (typeof import("./atomics/shadcn/tooltip/index"))["TooltipTrigger"];
export const LazyNuxtIcon: (typeof import("nuxt-svgo/dist/runtime/components/nuxt-icon.vue"))["default"];
export const LazyNuxtPage: (typeof import("nuxt/dist/pages/runtime/page"))["default"];
export const LazyNoScript: (typeof import("nuxt/dist/head/runtime/components"))["NoScript"];
export const LazyLink: (typeof import("nuxt/dist/head/runtime/components"))["Link"];
export const LazyBase: (typeof import("nuxt/dist/head/runtime/components"))["Base"];
export const LazyTitle: (typeof import("nuxt/dist/head/runtime/components"))["Title"];
export const LazyMeta: (typeof import("nuxt/dist/head/runtime/components"))["Meta"];
export const LazyStyle: (typeof import("nuxt/dist/head/runtime/components"))["Style"];
export const LazyHead: (typeof import("nuxt/dist/head/runtime/components"))["Head"];
export const LazyHtml: (typeof import("nuxt/dist/head/runtime/components"))["Html"];
export const LazyBody: (typeof import("nuxt/dist/head/runtime/components"))["Body"];
export const LazyNuxtIsland: (typeof import("nuxt/dist/app/components/nuxt-island"))["default"];
export const LazyNuxtRouteAnnouncer: IslandComponent<
  (typeof import("nuxt/dist/app/components/server-placeholder"))["default"]
>;

export const componentNames: string[];
