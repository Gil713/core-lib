type ICryptoPlatform = {
  image: string;
  title: string;
  url: string;
};

export const listPlatforms: ICryptoPlatform[] = [
  {
    image: "account/icon-bnb.webp",
    title: "Binance",
    url: "https://p2p.binance.com/vi/trade/all-payments/USDT?fiat=VND",
  },
  {
    image: "account/icon-remitano.webp",
    title: "Remitano",
    url: "https://remitano.com/usdt/vn/buy-via-usd?fiatCurrency=VND",
  },
  {
    image: "account/icon-houbi.webp",
    title: "HTX",
    url: "https://www.htx.com/vi-vi/fiat-crypto/trade/buy-usdt-vnd/",
  },
  {
    image: "account/icon-coin12.webp",
    title: "Coin12",
    url: "https://coin12.com/?asset=usdt",
  },
];

export const cryptoGuideList: IGuide[] = [
  {
    icon: "SvgoAccountGuideCrypto",
    text: "Đúng loại tiền ảo",
  },
  {
    icon: "SvgoAccountGuideExchangeCoin",
    text: "Đúng mạng lưới",
  },
  {
    icon: "SvgoAccountGuideWallet",
    text: "Đúng địa chỉ ví",
  },
];
