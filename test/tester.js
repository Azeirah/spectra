// Unit tests
describe('Spectra', function() {
  var color;

  beforeEach(function() {
    color = Spectra({r: 255, g: 25, b: 75, a: 0.6});

    this.addMatchers({
      toEqualColor: function(expected) {
        var actual = this.actual;
        var notText = this.isNot ? ' not' : '';

        this.message = function() {
          return 'Expected ' + actual.rgba() + notText + ' to be equal to color ' + expected.rgba();
        };

        return actual.equals(expected);
      }
    });
  });

  describe('Wrapper tests', function() {
    it('RGB wrapper', function() {
      expect(color.red()).toBe(255);
      expect(color.green()).toBe(25);
      expect(color.blue()).toBe(75);
      expect(color.hex()).toBe('#ff194b');
      expect(color.alpha()).toBe(0.6);
      color = Spectra({r: 255, g: 25, b: 75});
      expect(color.alpha()).toBe(1);
    });

    it('HSV wrapper', function() {
      color = Spectra({h: 347, s: 0.9020, v: 1.000, a: 0.6});
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
    });

    it('HSL wrapper', function() {
      color = Spectra({h: 347, s: 1.000, l: 0.549, a: 0.6});
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
    });

    it('shorthand CSS wrapper', function() {
      color = Spectra('#4Af');
      expect(color.red()).toBe(68);
      expect(color.green()).toBe(170);
      expect(color.blue()).toBe(255);
      expect(color.hue()).toBe(207);
      expect(color.saturationv()).toBeCloseTo(0.73, 1);
      expect(color.value()).toBeCloseTo(1.000, 1);
      expect(color.hex()).toBe('#44aaff');
    });
    it('longhand CSS wrapper', function() {
      color = Spectra('#FF194b');
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75}));
    });
    it('rgb CSS wrapper', function() {
      color = Spectra('rgb(255,25, 75)');
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75}));
    });
    it('rgba CSS wrapper', function() {
      color = Spectra('rgba(255,25, 75, 0.6)');
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
      color = Spectra('rgba(255,25, 75, .6)');
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
    });
  });

  describe('Invalid inputs', function() {
    it('Invalid CSS', function() {
      expect(function() {Spectra('not a real color');}).toThrow();
      expect(function() {Spectra('#deadbeef');}).toThrow();
      expect(function() {Spectra(null);}).toThrow();
      expect(function() {Spectra(undefined);}).toThrow();
    });
  });

  describe('Get and set', function() {
    it('RGB get and set', function() {
      color = Spectra({r: 123, g: 192, b: 70, a: 0.6});
      color.red(255);
      color.green(25);
      color.blue(75);
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
    });
    it('HSV get and set', function() {
      color = Spectra({r: 123, g: 192, b: 72, a: 0.6});
      color.hue(347);
      color.saturationv(0.9020);
      color.value(1.000);
      expect(color).toEqualColor(Spectra({r: 255, g: 25, b: 75, a: 0.6}));
    });
  });

  describe('Color operations', function() {
    it('Color operations', function() {
      expect(color.complement().hex()).toBe('#19ffcd');
      expect(color.lighten(10).hex()).toBe('#ff4c73');
      expect(color.darken(10).hex()).toBe('#e50032');
      expect(color.saturate(10).hex()).toBe('#ff194b');
      expect(color.desaturate(10).hex()).toBe('#f42552');
      expect(color.fadeIn(7).alpha()).toBeCloseTo(0.67, 1);
      expect(color.fadeOut(5).alpha()).toBeCloseTo(0.55, 1);
      expect(color.luma()).toBeCloseTo(77.5, 1);
      expect(color.grayscale().hex()).toBe('#8c8c8c');
    });

    it('Mix', function() {
      var color1 = Spectra('#0f7');
      var color2 = Spectra('#f87');
      var mixed1 = color1.mix(color2, 0);
      expect(mixed1.hex()).toBe('#00ff77');
      var mixed2 = color1.mix(color2, 20);
      expect(mixed2.hex()).toBe('#33e777');
    });
  });

  describe('Utility functions', function() {
    it('noConflict', function() {
      var s = Spectra.noConflict();
      expect(Spectra).toBe(undefined);
      expect(s('#ff194b').red()).toBe(255);
    });
  });
});
