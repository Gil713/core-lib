const scanLinkMap = {
  [CryptoNetwork.TRC20]: "https://tronscan.org/#/address/",
  [CryptoNetwork.ERC20]: "https://etherscan.io/address/",
  [CryptoNetwork.BEP20]: "https://bscscan.com/address/",
};

export const useDepositCrypto = () => {
  const { $systemService } = useNuxtApp();

  const appStore = useAppStore();
  const { systemDepositPayment, systemPlan, hasJoinPromotion, amountRolling } = storeToRefs(appStore);

  const qrcode: Ref<HTMLElement | undefined> = ref(undefined);
  const isCopied = ref<boolean>(false);

  const cryptoNetwork = reactive<ICryptoV2SysDepositPaymentMethod>({
    network: [CryptoNetwork.TRC20],
    token: "",
    buy_price: 0,
    sell_price: 0,
    wallet_address: "",
  });

  const currencies = computed(() => {
    if (!systemDepositPayment.value) {
      return;
    }

    return systemDepositPayment.value.crypto_v2.map((item: ICryptoV2SysDepositPaymentMethod) => {
      return {
        ...item,
        wallet_address: "",
      };
    });
  });

  const getLinkScan = (item: ICryptoV2SysDepositPaymentMethod) => {
    return scanLinkMap[item?.network[0] as CryptoNetwork] || scanLinkMap[CryptoNetwork.TRC20];
  };

  const getCryptoAddress = async (): Promise<void> => {
    try {
      const data = await $systemService.getDepositCryptoNetwork(cryptoNetwork.network[0]);
      if (data?.[0]?.address) {
        cryptoNetwork.wallet_address = data[0].address;
      }
      // TODO: show success toast
    } catch (error) {
      // TODO: show error toast
      console.error("Error fetching crypto address:", error);
    }
  };

  const changeCryptoNetwork = async (item?: ICryptoV2SysDepositPaymentMethod) => {
    Object.assign(cryptoNetwork, item || currencies.value?.[0] || {});

    if (!cryptoNetwork.wallet_address) {
      await getCryptoAddress();
    }
  };

  useAsyncData("init-crypto-network", async () => {
    return await changeCryptoNetwork();
  });

  const formattedWalletAddress = computed(() => {
    if (!cryptoNetwork.wallet_address) {
      return {
        full: "",
      };
    }
    if (cryptoNetwork.wallet_address.length < 8) {
      return {
        full: cryptoNetwork.wallet_address,
      };
    }
    const prefix = cryptoNetwork.wallet_address.slice(0, 4);
    const content = cryptoNetwork.wallet_address.slice(4, -4);
    const suffix = cryptoNetwork.wallet_address.slice(-4);
    return {
      prefix,
      content,
      suffix,
    };
  });

  const handleDownloadQRCode = () => {
    if (qrcode.value) {
      downloadQRCode(qrcode.value);
    }
  };
  return {
    getLinkScan,
    formattedWalletAddress,
    currencies,
    cryptoNetwork,
    changeCryptoNetwork,
    handleDownloadQRCode,
    qrcode,
    isCopied,
    systemPlan,
    hasJoinPromotion,
    amountRolling,
  };
};
