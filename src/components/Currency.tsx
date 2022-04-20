import { useContext, createContext, useState, useEffect } from "react";

type CurrencyOption = {
  currencySymbol: string;
  currencyMintAddress: string;
  currencyDecimals: number;
  priceDecimals: number;
  volumeDecimals: number;
};

interface CurrencyType {
  currency: string;
  setCurrency: Function;
  getCurrencySettings: () => CurrencyOption;
  currencyOptions: CurrencyOption[];
}

const CurrencyContext = createContext<CurrencyType>({
  currency: "SOL",
  setCurrency: () => {},
  getCurrencySettings: () => ({
    currencySymbol: "SOL",
    currencyMintAddress: "So11111111111111111111111111111111111111112",
    currencyDecimals: 9,
    priceDecimals: 3,
    volumeDecimals: 1,
  }),
  currencyOptions: [
    {
      currencySymbol: "SOL",
      currencyMintAddress: "CdQseFmnPh2JBiz5747dJ6oYXK9NKnbdFRfiXTcZuaXT",
      currencyDecimals: 9,
      priceDecimals: 3,
      volumeDecimals: 1,
    },
  ],
});

const CANDY_SHOP_CURRENCY_SYMBOL = "CandyShopCurrencySymbol";

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({
  currencyOptions,
  children,
}: {
  currencyOptions: CurrencyOption[];
  children: any;
}) {
  // users' preferred currency is stored and retrieved from local storage
  let defaultSymbol =
    localStorage.getItem(CANDY_SHOP_CURRENCY_SYMBOL) ||
    currencyOptions[0].currencySymbol;

  const [currency, setCurrency] = useState(defaultSymbol);

  useEffect(() => {
    localStorage.setItem(CANDY_SHOP_CURRENCY_SYMBOL, currency);
  }, [currency]);

  const getCurrencySettings = () => {
    return currencyOptions.find((option) => currency === option.currencySymbol)!;
  };

  const value = {
    currency,
    setCurrency,
    getCurrencySettings,
    currencyOptions,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
