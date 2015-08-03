describe("CurrencyConverter", function() {
  var currencyConverter;

  beforeEach(function() {
    currencyConverter = new CurrencyConverter();
  });

  it("isNumber returns true for valid inputs", function() {
    expect(currencyConverter.isNumber('5')).toBeTruthy();
    expect(currencyConverter.isNumber('-1.5')).toBeTruthy();
    expect(currencyConverter.isNumber('0')).toBeTruthy();
    expect(currencyConverter.isNumber('0.42')).toBeTruthy();
    expect(currencyConverter.isNumber('.42')).toBeTruthy();
    expect(currencyConverter.isNumber('8e5')).toBeTruthy();
    expect(currencyConverter.isNumber('0x89f')).toBeTruthy();
  });

  it("isNumber returns false for invalid inputs", function() {
    expect(currencyConverter.isNumber('x89f')).not.toBe(true);
    expect(currencyConverter.isNumber('9,999')).toBeFalsy();
    expect(currencyConverter.isNumber('#abcdef')).toBeFalsy();
    expect(currencyConverter.isNumber('1.2.3')).toBeFalsy();
    expect(currencyConverter.isNumber('')).toBeFalsy();
    expect(currencyConverter.isNumber('blah')).toBeFalsy();
    expect(currencyConverter.isNumber('$1')).toBeFalsy();
  });

  it("convert calculates correct values for positive number input", function() {
    var distance = currencyConverter.convert(200, "British Pound");
    expect(distance['Euro']).toEqual(285.7142857142857);
    expect(distance['US Dollar']).toEqual(314.28571428571433);
    expect(distance['Swedish Krona']).toEqual(2705.7142857142862);
    expect(distance['Croatian Kuna']).toEqual(2168.571428571429);
    expect(distance['Swiss Franc']).toEqual(302.8571428571429);
    expect(distance['Bitcoin']).toEqual(1.1142857142857143);
  });

  it("convert calculates correct values for negative number input", function() {
    var distance = currencyConverter.convert(-5, "Euro");
    expect(distance['US Dollar']).toBe(-5.5);
    expect(distance['British Pound']).toBe(-3.5);
    expect(distance['Swedish Krona']).toBe(-47.35);
    expect(distance['Croatian Kuna']).toBe(-37.95);
    expect(distance['Swiss Franc']).toBe(-5.300000000000001);
    expect(distance['Bitcoin']).toBe(-0.0195);
  });

  it("convert returns zero values for zero number", function() {
    var distance = currencyConverter.convert(0, "Euro");
    expect(distance['US Dollar']).toBe(0);
    expect(distance['British Pound']).toBe(0);
    expect(distance['Swedish Krona']).toBe(0);
    expect(distance['Croatian Kuna']).toBe(0);
    expect(distance['Swiss Franc']).toBe(0);
    expect(distance['Bitcoin']).toBe(0);
  });

  it("convert returns no values for invalid number", function() {
    var distance = currencyConverter.convert('gar#%^@bage', "Euro");
    expect(distance['US Dollar']).not.toBeDefined();
    expect(distance['British Pound']).not.toBeDefined();
    expect(distance['Swedish Krona']).not.toBeDefined();
    expect(distance['Croatian Kuna']).not.toBeDefined();
    expect(distance['Swiss Franc']).not.toBeDefined();
    expect(distance['Bitcoin']).not.toBeDefined();
  });

  it("convert returns no values for invalid currency", function() {
    var distance = currencyConverter.convert('5', "Blah");
    expect(distance['Euro']).not.toBeDefined();
    expect(distance['US Dollar']).not.toBeDefined();
    expect(distance['British Pound']).not.toBeDefined();
    expect(distance['Swedish Krona']).not.toBeDefined();
    expect(distance['Croatian Kuna']).not.toBeDefined();
    expect(distance['Swiss Franc']).not.toBeDefined();
    expect(distance['Bitcoin']).not.toBeDefined();
  });

});