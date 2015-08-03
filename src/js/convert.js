$(document).ready(function() {
  var currencyConverter = new CurrencyConverter();
  generateInputButtons($('#toolbar'), currencyConverter.getCurrencyHash());

  $('input[name="conversionRadio"]').change( function() {
    var selectedCurrency = $(this).attr("id");
    updateAndDisplayConversions(selectedCurrency);
  });

  $('#currency_input').on('keyup change', function() {
    var selectedCurrency = $('#toolbar .active').children("input").attr("id");
    updateAndDisplayConversions(selectedCurrency);
  });

  $('input[name="conversionRadio"]')[0].click();

  function updateAndDisplayConversions(baseCurrency) {
    var newValue = $('#currency_input').val();
    var distanceConversion = currencyConverter.convert(newValue, baseCurrency);
    $('.conversion-result').html(generateConversionHtml(distanceConversion));
    $('.form-group').removeClass('has-error');
    if(Object.keys(distanceConversion).length === 0) {
      $('.conversion-result').html("");
      $('.form-group').addClass('has-error');
    }
  }

  function generateConversionHtml(currencyHash) {
    var data = $('<div>', {'class': 'row'});
    for(var currency in currencyHash) {
      var currencyHtml = $('<div>', {'class': 'col-lg-4'});
      currencyHtml.append('<h2>' + parseFloat(currencyHash[currency].toFixed(6)) + '</h2>');
      currencyHtml.append('<p>' + currency + '</p>');
      data.append(currencyHtml);
    }
    return data;
  }

  function generateInputButtons(toolbar, currencyHash) {
    var inputButtons = $('<div>');
    currencyHash.forEach(function(currency) {
      var radioLabel = $('<label>', {'class': 'btn btn-default'});
      var radioButton = $('<input>', {'type': 'radio', 'name': 'conversionRadio', 'id': currency});
      radioLabel.append(radioButton);
      radioLabel.append(currency);
      toolbar.append(radioLabel);
    });
  }
});