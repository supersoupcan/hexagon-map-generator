const Layer = function(canvas, render){
  this.canvas = canvas;
  this.render = render;
  this.rerender = true;
}

Layer.prototype = {
  setSize: function(size){
    this.canvas.width = size[0];
    this.canvas.height = size[1];
  }
}

export default Layer;