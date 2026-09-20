    // 异步通过 IP 获取用户真实地理位置与全球本地货币
    async function detectIpAndFetchRates() {
      let targetCurrency = 'USD';
      let symbol = '$';

      try {
        // Step 1: 通过 IP API 获取详细位置与当地法定货币代码
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        
        // 如果 API 返回了用户的本地货币代码（如 GBP, JPY, AUD 等），直接采用
        if (ipData && ipData.currency) {
          targetCurrency = ipData.currency.toUpperCase();
        }

        // 全球常用货币符号映射表
        const symbolMap = {
          USD: '$',
          CAD: '$',
          EUR: '€',
          GBP: '£',
          JPY: '¥',
          AUD: '$',
          NZD: '$',
          SGD: '$',
          HKD: '$',
          CNY: '¥',
          CHF: 'CHF',
          INR: '₹',
          TWD: 'NT$'
        };
        
        symbol = symbolMap[targetCurrency] || '$';
      } catch (e) {
        console.warn("IP geolocation failed, fallback to USD", e);
        targetCurrency = 'USD';
        symbol = '$';
      }

      setCurrencySymbol(symbol);
      setCurrencyCode(targetCurrency);

      // Step 2: 请求实时汇率 API（以 CAD 为基础进行换算，基准价为 10 CAD / 1 CAD每小时）
      try {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/CAD');
        const rateData = await rateRes.json();
        
        if (rateData && rateData.rates && rateData.rates[targetCurrency]) {
          const rate = rateData.rates[targetCurrency];
          const calculatedPackage = (10 * rate).toFixed(2);
          const calculatedHourly = (1 * rate).toFixed(2);
          
          setPackagePrice(calculatedPackage);
          setHourlyPrice(calculatedHourly);
        } else {
          // 如果汇率 API 中没有收录该冷门货币，降级为默认换算或固定价
          setPackagePrice('7.50');
          setHourlyPrice('0.75');
          setCurrencyCode('USD');
          setCurrencySymbol('$');
        }
      } catch (e) {
        // 汇率请求失败时的安全兜底
        setPackagePrice('10.00');
        setHourlyPrice('1.00');
      }
    }
