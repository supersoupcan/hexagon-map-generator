function lerp(a, b, t){
  return a * ( 1 - t ) + b * t;
}

const Hex = function(q, r){
  this.v = [q, r, -q-r];
}

Hex.prototype = {
  get vertices(){
    return [this.v[0], this.v[1], 1];
  },
  get key(){
    return this.v.join(',');
  },
  equals: function(b, a = this){
    return a.v[0] === b.v[0] &&  a.v[1] === b.v[1];
  },
  lerp: function(a, b, t){
    return new Hex(
      lerp(a.v[0], b.v[0], t),
      lerp(a.v[1], b.v[1], t),
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
  notEquals: function(a, b = this){
    return !this.equals(a, b);
  },
  add: function(a, b = this){
    return new Hex(a.v[0] + b.v[0], a.v[1] + b.v[1]);
  },
  subtract: function(b, a = this){
    return new Hex(a.v[0] - b.v[0], a.v[1] - b.v[1]);
  },
  multiply: function(m, a = this){
    return new Hex(a.v[0] * m, a.v[1] * m);
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
    }
    return new Hex(q, r);
  }
};

const hexDirections = [
  new Hex(1, 0), new Hex(1, -1), new Hex(0, -1),
  new Hex(-1, 0), new Hex(-1, 1), new Hex(0, 1)
];

export default Hex;