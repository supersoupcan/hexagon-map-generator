const Region = function(shape, vertex){
  this.shape = shape;
  this.vertex = vertex;
  this.edges = new Map();
}

Region.prototype = {
  get key(){
    return this.vertex.key
  },
  tiles: function(){
    return this.shape.tiles().map((hex) => {
      return hex.add(this.vertex);
    })
  },
  onBorder: function(hex){
    return this.shape.onBorder(hex.subtract(this.vertex));
  },
}

export default Region;