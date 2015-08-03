function CurrencyConverter() {
  CURRENCY_CONVERSION_MAP = {
    'Euro': 1,
    'US Dollar': 1.10,
    'British Pound': 0.70,
    'Swedish Krona': 9.47,
    'Croatian Kuna': 7.59,
    'Swiss Franc': 1.06,
    'Bitcoin': 0.0039
  };

  this.getCurrencyValue = function(currency) {
    return CURRENCY_CONVERSION_MAP[currency];
  };

  this.getCurrencyHash = function() {
    return Object.keys(CURRENCY_CONVERSION_MAP);
  };
}

CurrencyConverter.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

CurrencyConverter.prototype.convert = function(number, baseCurrency) {
  var resultHash = {};
  if(this.getCurrencyValue(baseCurrency) && this.isNumber(number)) {
    var currencyValues = this.getCurrencyHash();
    for(var i = 0; i < currencyValues.length; i++) {
      var currency = currencyValues[i];
      resultHash[currency] = (this.getCurrencyValue(currency) * number) / this.getCurrencyValue(baseCurrency);
    }
  }
  return resultHash;
};