// For CSR
type IDocument = Document & {
  webkitFullscreenEnabled?: boolean;
  mozFullScreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
};

type IFrameElement = HTMLIFrameElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

export const useIframe = () => {
  const doc: IDocument = document;
  const isZoom = ref<boolean>(false);

  const onLoadIframe = (refIframe?: HTMLIFrameElement) => {
    try {
      const iframeHost = refIframe?.contentWindow?.location?.host;
      const iframeRedirectLink = refIframe?.contentWindow?.location?.href;
      const mainHost = window.location.host;
      if (iframeHost === mainHost || iframeRedirectLink?.includes(APP_PATH.MAINTENANCE)) {
        if (iframeRedirectLink != null) {
          window.location.href = iframeRedirectLink;
        }
      }
    } catch (e) {
      useLogError("LoadIframe", e as INuxtCustomError);
    }
  };

  const onZoom = () => {
    if (
      !(doc.fullscreenEnabled || doc.webkitFullscreenEnabled || doc.mozFullScreenEnabled || doc.msFullscreenEnabled)
    ) {
      return;
    }

    const iframe = document.querySelector("#iframe")?.parentElement as IFrameElement | undefined;
    if (!iframe) {
      return;
    }

    if (!isZoom.value) {
      isZoom.value = true;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
        return;
      }
      if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
        return;
      }
      if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
        return;
      }
      if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
        return;
      }
    }

    isZoom.value = false;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
      return;
    }
    if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
      return;
    }
    if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
      return;
    }
    if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
      return;
    }
  };

  const onClose = () => {
    navigateTo("/");
  };

  const fullscreenChangeHandler = () => {
    if (!doc.fullscreenElement) {
      isZoom.value = false;
    }
  };

  onMounted(() => {
    doc.addEventListener("fullscreenchange", fullscreenChangeHandler);
  });

  onUnmounted(() => {
    doc.removeEventListener("fullscreenchange", fullscreenChangeHandler);
  });

  return {
    onLoadIframe,
    onZoom,
    onClose,
    isZoom,
  };
};
