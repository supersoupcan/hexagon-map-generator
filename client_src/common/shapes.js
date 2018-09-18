import  Hex  from "./Hex";

//a note to prevent confusion
//a Hex is a single hexagon-shaped tile on the grid, 
//a Hexagon is a group of Hexs which retain a hexagon-shape
//Example: a Hexgaon of radius of 0 contains a a single Hex tile

const Hexagon = function(radius){
  this.name = 'hexagon';
  this.radius = radius;
}

Hexagon.prototype = {
  tiles: function(){
    const iterable = [];
    for(let q = -this.radius; q <= this.radius; q++){
      let r1 = Math.max(-this.radius, -q - this.radius);
      let r2 = Math.min(this.radius, -q + this.radius);
      for(let r = r1; r <= r2; r++){
        const hex = new Hex(q, r);
        iterable.push(hex);
      }
    }
    return iterable;
  },
  within(region){
    const hex = region.vertex;
    const r = this.radius;
    return subHex.hexOrigin.v.every((coord) => coord >= -r && coord <= r);
  },
  onBorder(hex){
    const r = this.radius;
    return hex.v.some((coord) => (coord === r || coord === -r))
  },
}

const Rectangle = function(width, height){
  this.height = height;
  this.width = width;
}

Rectangle.prototype = {
  tiles: function(){
    const iterable = [];

    for(let h = 0; h < (this.height*2 + 1); h++){
      let h_offset = Math.floor(h/2) - Math.floor(this.height/2);
      for(let w = -h_offset; w < (this.width*2 + 1) - h_offset; w++){
        let r = w - this.width;
        let q = h - this.height;
        iterable.push(new Hex(r, q));
      }
    }
    return iterable;
  }
}

export { Hexagon, Rectangle };