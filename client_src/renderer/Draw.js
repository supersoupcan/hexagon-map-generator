const Draw = function(canvas, layout, styles = {}){
  this.ctx = canvas.getContext('2d');
  this.layout = layout;
  this.styles = {
    fillStyle: styles.fillStyle || 'white',
    strokeStyle: styles.strokeStyle || 'black',
  };
}


Draw.prototype = {
  clear: function(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  },
  style: function(styles = {}){
    Object.keys(this.styles).forEach((key) => {
      this.ctx[key] = styles.hasOwnProperty(key) ? styles[key] : this.styles[key];
    })
  },
  circle: function(point, styles = {}){
    this.style(styles);
    this.ctx.beginPath();
    this.ctx.arc(point.v[0], point.v[1],5,0,2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  },
  rect: function(point, layout, styles={}){
    const x = point.v[0] - 1/2 * Math.sqrt(3) * layout.size.v[0];
    const y = point.v[1] - 2/4 * 2 * layout.size.v[1];
    const width = Math.sqrt(3) * layout.size.v[0];
    const height = 3/4 * 2 * layout.size.v[1];
   
    this.style(styles);
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fill();
  },
  hex: function(hex, styles = {}){
    this.style(styles);
    this.ctx.beginPath();
    const corners = hex.corners(this.layout);
    this.ctx.moveTo(corners[5].x, corners[5].y);
    corners.forEach((point) => {
      this.ctx.lineTo(point.x, point.y);
    })
    this.ctx.fill();
  }
}

export default Draw;
