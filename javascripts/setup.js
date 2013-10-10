//
// underscore template
//
_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

//
// paper.js closePath 
//
paper.Path.prototype.closePath = function() {
			var first = this.getFirstSegment(),
				last = this.getLastSegment();
			// if (first._point.equals(last._point)) {
			if (first._point.getDistance(last._point) < 1) {
				first.setHandleIn(last._handleIn);
				last.remove();
			}
			this.setClosed(true);
		};


//
// copied from d3.js thank you
// Copyright (c) 2013, Michael Bostock
// https://github.com/mbostock/d3
//
function d3_transform(m) {
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0;
};

d3_transform.prototype.toString = function() {
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformDegrees = 180 / Math.PI;

var d3 = {};
d3.transform = function(string) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    return (d3.transform = function(string) {
        if (string != null) {
            g.setAttribute("transform", string);
            var t = g.transform.baseVal.consolidate();
        }
        return new d3_transform(t ? t.matrix : SVGUtil.SVG.createSVGMatrix());
    })(string);
};
