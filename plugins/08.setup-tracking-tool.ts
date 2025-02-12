type IScriptConfig = {
  innerHTML: string;
  tagPosition?: "head" | "bodyOpen" | "bodyClose";
};

type IMetaConfig = {
  name: string;
  content: string;
};

type ILinkConfig = {
  rel: string;
  type?: string;
  href: string;
  sizes?: string;
};

type INoScriptConfig = {
  tagPosition?: "bodyOpen" | "bodyClose";
  innerHTML: string;
};

type IHeadConfig = {
  script: IScriptConfig[];
  meta: IMetaConfig[];
  link: ILinkConfig[];
  noscript: INoScriptConfig[];
};

export default defineNuxtPlugin(async () => {
  const { $seoService } = useNuxtApp();
  const { data } = await useAsyncData("brand-info", async () => await $seoService.getBrandInfo());

  if (data.value) {
    const brandData = data.value;
    const { favicon, favicon_16_16, favicon_32_32, apple_touch_icon } = brandData;
    const gtmId = (brandData?.gtm_id as string[])?.join?.(",") ?? brandData?.gtm_id;
    const googleSiteVerification =
      (data.value?.google_site_verification as string[])?.join?.(",") ?? brandData.google_site_verification;
    const metaPixelId = brandData?.meta_pixel_id;

    const headConfig: IHeadConfig = {
      script: [
        {
          // - Google Tag Manager
          // - Create dataLayer, can use to tracking event of users (login, register), more detail in useLogin, useRegister
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`,
        },
        {
          //  - Used in advertising, affiliate tracking, or measuring marketing campaign performance.
          tagPosition: "bodyOpen",
          innerHTML:
            '(function(a,b,c){a="https://logriancesenius.com/conversion.js?cid=OPTIONAL&payout=OPTIONAL&txid=OPTIONAL";var d=b.createElement("script"),e=b.scripts[0];c=(b=b.cookie.match(/(^| )vl-cid=([^;]+)/))?b.pop():c.getItem("vl-cid-expires")&&+c.getItem("vl-cid-expires")>(new Date).getTime()?c.getItem("vl-cid"):null;c&&(-1<a.indexOf("cid=")?a=a.replace(/cid=.*?(&|$)/,"cid="+c+"&"):(b=-1<a.indexOf("?")?"&":"?",a+=b+"cid="+c));d.src=a;e.parentNode.insertBefore(d,e)})(window,document,localStorage);',
        },
      ],
      meta: [
        {
          name: "google-site-verification",
          content: googleSiteVerification,
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: favicon },
        { rel: "icon", type: "image/png", sizes: "16x16", href: favicon_16_16 },
        { rel: "icon", type: "image/png", sizes: "32x32", href: favicon_32_32 },
        { rel: "apple-touch-icon", sizes: "180x180", href: apple_touch_icon },
      ],
      noscript: [
        {
          // - Google Tag Manager incase no js
          tagPosition: "bodyOpen",
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
    };

    // Add script and noscript when metaPixelId is exists
    if (metaPixelId) {
      headConfig.script.push({
        innerHTML: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');`,
      });

      headConfig.noscript.push({
        innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1" />`,
      });
    }
    useHead(headConfig);
  }
});
