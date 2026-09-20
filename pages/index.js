  const getLocalizedPriceText = () => {
    let priceVal = hourlyPrice;
    if (['fr', 'de', 'es', 'it', 'pt', 'ru'].includes(lang)) {
      priceVal = hourlyPrice.replace('.', ',');
    }

    const currencyMap = currentText.currencies || {};
    const localCurrencyName = currencyMap[currencyCode] || currencyCode;
    const formatTemplate = currentText.priceFormat || "{symbol}{price} {currency} / {unit}";
    const unitText = currentText.perHourText || "hr";

    return formatTemplate
      .replace('{symbol}', currencySymbol)
      .replace('{price}', priceVal)
      .replace('{currency}', localCurrencyName)
      .replace('{unit}', unitText);
  };
