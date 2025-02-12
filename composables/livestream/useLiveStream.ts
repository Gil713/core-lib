// NanoPlayer is not typing friendly, then we just can implement following document
// docs: https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api

/* eslint-disable @typescript-eslint/no-explicit-any */

type INanoPlayerType = {
  setup: (config: unknown) => Promise<void>;
  destroy: () => void;
  play: () => void;
  mute: () => void;
  unmute: () => void;
  // Add more type refer on https://docs.nanocosmos.de/docs/nanoplayer/nanoplayer_api#NanoPlayer
};

export const useLiveStream = (dataLiveStream: ILiveStream) => {
  const { $liveStreamService } = useNuxtApp();
  const isMuted = ref<boolean>(false);
  const viewerNumber = ref<number>(0);
  const liveStreamError = ref<Error | undefined>(undefined);
  const liveStreamSuccessMessage = ref<string | undefined>(undefined);
  const liveStreamPauseMessage = ref<string | undefined>(undefined);
  const isLoading = ref<boolean>(false);

  const player = ref<INanoPlayerType | undefined>(undefined);

  const onLiveStreamError = (event: any) => {
    if (event.data.state) {
      liveStreamError.value = new Error(
        "Startup livestream Error: " +
          event.data.code +
          " " +
          event.data.message +
          " at " +
          event.data.state.error +
          "ms after load start",
      );
    } else {
      // new Error("Error: " + event.data.code + " " + event.data.message);
      new Error(`Livestream error:: code: ${event.data.code} message: ${event.data.message}`);
    }
  };

  const onLiveStreamPause = (event: any) => {
    if (event.data.reason !== "normal") {
      liveStreamPauseMessage.value = "Paused with reason: " + event.data.reason;
    }
  };
  const onLiveStreamLoading = () => {
    setTimeout(() => (isLoading.value = false), 1500);
  };

  const config = ref({
    source: {
      defaults: { service: "bintu" },
      entries: [
        {
          h5live: {
            server: undefined as { websocket: string; hls: string } | undefined,
            rtmp: { url: undefined as string | undefined, streamname: dataLiveStream.streamName },
            security: { jwtoken: "" },
          },
        },
      ],
    },
    playback: { autoplay: true, automute: true, muted: true, faststart: true },
    style: {
      displayMutedAutoplay: false,
      controls: false,
      fullScreenControl: false,
      centerView: false,
      poster: getRelativeIpxPath(dataLiveStream.defaultBackground || ""),
      interactive: true,
    },
    events: {
      onError: onLiveStreamError,
      onPause: onLiveStreamPause,
      onLoading: onLiveStreamLoading,
    },
  });

  const isSoundIconVisible = computed(() => !liveStreamError.value && !isLoading.value);

  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    if (isMuted.value) {
      player.value?.unmute();
    } else player.value?.mute();
  };

  const initPlayer = async () => {
    const nanoPlayerLiveStreamId = `live-${dataLiveStream.streamName}`;
    player.value = new window.NanoPlayer(nanoPlayerLiveStreamId) as INanoPlayerType;

    try {
      const res = await player.value.setup(config.value);
      if (res as any) {
        liveStreamSuccessMessage.value = "setup ok with config: " + JSON.stringify(config);
      }
    } catch (err: any) {
      liveStreamError.value = new Error(err);
    }
  };

  const handleVerifyToken = async () => {
    isLoading.value = true;
    try {
      const { data } = await $liveStreamService.verifyLiveStreamToken(
        dataLiveStream.groupId || "",
        dataLiveStream.streamName || "",
      );
      // TODO add type
      if (data?.token) config.value.source.entries[0].h5live.security.jwtoken = data.token;
      await initPlayer();
    } catch (err) {
      liveStreamError.value = new Error("Error verifying token:" + err);
    } finally {
      isLoading.value = false;
    }
    isLoading.value = false;
  };

  const initRandomViewers = () => {
    const randomUserFrom = 500;
    const randomUserTo = 1000;
    const randomTime = 5 * 1000; // 5s

    viewerNumber.value = Math.floor(Math.random() * (randomUserTo - randomUserFrom + 1)) + randomUserFrom;
    setInterval(() => {
      viewerNumber.value = Math.min(
        Math.max(viewerNumber.value + (Math.random() < 0.5 ? -10 : 10), randomUserFrom),
        randomUserTo,
      );
    }, randomTime);
  };

  const handleReplay = () => {
    isLoading.value = true;

    const delayTimeToReplay = 3.5 * 1000; // 3.5s
    setTimeout(() => player.value?.play(), delayTimeToReplay);
  };

  onMounted(async () => {
    config.value.source.entries[0].h5live.server = {
      websocket: LIVESTREAM_CONFIG.WSS,
      hls: LIVESTREAM_CONFIG.HLS,
    };

    config.value.source.entries[0].h5live.rtmp.url = LIVESTREAM_CONFIG.DEFAULT_URL;
    if (window.location.hostname !== "localhost") {
      await handleVerifyToken();
    }
    initRandomViewers();
  });

  const handlePlayGame = () => {
    console.log("Playing game...");
    // TODO: Handle play game logic here
  };

  onBeforeUnmount(() => {
    player.value?.destroy();
  });

  return {
    isMuted,
    viewerNumber,
    liveStreamError,
    liveStreamSuccessMessage,
    liveStreamPauseMessage,
    isLoading,
    player,
    config,
    isSoundIconVisible,
    toggleMute,
    handleReplay,
    handlePlayGame,
  };
};
