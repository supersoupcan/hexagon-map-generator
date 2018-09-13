function lerp(a, b, t){
  return a * ( 1 - t ) + b * t;
}

const Hex = function(q, r){
  this.v = [q, r, -q -r ]
}

Hex.prototype = {
  equals: function(b, a = this){
    return a.v[0] === b.v[0] &&  a.v[1] === b.v[1] && a.v[2] === b.v[2];
  },
  lerp: function(a, b, t){
    return new Hex(
      lerp(a.v[0], b.v[0], t),
      lerp(a.v[1], b.v[1], t),
      lerp(a.v[2], b.v[2], t),
    )
  },
  linedraw: function(b, a = this){
    const distance = this.distance(a, b);
    const step = 1 / Math.max(distance, 1);
    let results = [];
    for(let i = 0; i <= distance; i++){
      results.push(this.lerp(a, b, step * i).round());
    }
    return results;
  },
  get key(){
    return this.v.join(',');
  },
  notEquals: function(a, b = this){
    return !this.equals(a, b);
  },
  add: function(a, b = this){
    return new Hex(a.v[0] + b.v[0], a.v[1] + b.v[1], a.v[2] + b.v[2]);
  },
  subtract: function(b, a = this){
    return new Hex(a.v[0] - b.v[0], a.v[1] - b.v[1], a.v[2] - a.v[2]);
  },
  multiply: function(m, a = this){
    return new Hex(a.v[0] * m, a.v[1] * m, a.v[2] * m);
  },
  length: function(){
    return (Math.abs(this.v[0]) + Math.abs(this.v[1]) + Math.abs(this.v[2])) / 2;
  },
  distance: function(b, a = this){
    return this.subtract(b, a).length();
  },
  direction: function(direction){
    return hexDirections[direction % 6];
  },
  neighbour: function(direction){
    return this.add(this.direction(direction));
  },
  isInteger: function(){
    return Number.isInteger(this.v[0]) && Number.isInteger(this.v[1]) && Number.isInteger(this.v[2]);
  },
  toPixel: function(layout){
    const h = this;
    const o = layout.orientation.f;
    const s = layout.size;
    const d = layout.origin;

    return new Point(
      (o[0][0] * h.v[0] + o[0][1] * h.v[1]) * s.v[0] + d.v[0],
      (o[1][0] * h.v[0] + o[1][1] * h.v[1]) * s.v[1] + d.v[1]
    )
  },
  round: function(){
    let q = Math.round(this.v[0]);
    let r = Math.round(this.v[1]);
    let s = Math.round(this.v[2]);
    
    const qDiff = Math.abs(q - this.v[0]); 
    const rDiff = Math.abs(r - this.v[1]); 
    const sDiff = Math.abs(s - this.v[2]);

    if(qDiff > rDiff && qDiff > sDiff) {
      q = -r - s;
    }else if(rDiff > sDiff){
      r = -q - s;
    }else {
      s = -q - r;
    }
    return new Hex(q, r, s);
  },
  corners: function(layout){
    const c = this.toPixel.call(this, layout);
    return [...Array(6)].map((_, i ) => {
      const p = layout.hexCornerOffset(i);
      return new Point(c.v[0] + p.v[0], c.v[1] + p.v[1]);
    });
  }
}

const hexDirections = [
  new Hex(1, 0, -1), new Hex(1, -1, 0), new Hex(0, -1, 1),
  new Hex(-1, 0, 1), new Hex(-1, 1, 0), new Hex(0, 1, -1)
]

const Orientation = function(matrix2x2f, matrix2x2b, startAngle){
  this.f = matrix2x2f;
  this.b = matrix2x2b;
  this.startAngle = startAngle;
}

const orientation = new Orientation(
  [[Math.sqrt(3), Math.sqrt(3) / 2], [0, 3 / 2]],
  [[Math.sqrt(3) / 3, -1 / 3], [0, 2 / 3]], 0.5
)

const Layout = function(origin, size){
  this.orientation = orientation;
  this.origin = origin;
  this.size = size;
}

Layout.prototype = {
  hexCornerOffset: function(corner){
    const s = this.size;
    const o = this.orientation;
    const angle = 2 * Math.PI * (o.startAngle + corner) / 6;

    return new Point(s.v[0] * Math.cos(angle), s.v[1] * Math.sin(angle));
  },
}

const Point = function(x, y){
  this.v = [x, y];
}

Point.prototype = {
  get x(){
    return this.v[0];
  },
  get y(){
    return this.v[1]
  },
  set x(value){
    this.v[0] = value;
  },
  set y(value){
    this.v[1] = value;
  },
  toHex: function(layout){
    const p = this;
    const o = layout.orientation.b;
    const s = layout.size;
    const d = layout.origin;

    const pt = new Point(
      (p.v[0] - d.v[0]) / s.v[0],
      (p.v[1] - d.v[1]) / s.v[1]
    )

    return new Hex(
      o[0][0] * pt.v[0] + o[0][1] * pt.v[1],
      o[1][0] * pt.v[0] + o[1][1] * pt.v[1]
    )
  }
}

export { Hex, Layout, Point };