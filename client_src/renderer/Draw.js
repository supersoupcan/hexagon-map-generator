function begin(styles = {}){
  style.call(this, styles);
  this.ctx.beginPath();
}

function style(styles = {}){
  Object.keys(this.styles).forEach((key) => {
    this.ctx[key] = styles.hasOwnProperty(key) ? styles[key] : this.styles[key];
  })
}

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
  freeShape: function(corners, styles){
    begin.call(this, styles);
    this.ctx.moveTo(corners[5][0], corners[5][1]);
    corners.forEach((corner) => {
      this.ctx.lineTo(Math.round(corner[0]), Math.round(corner[1]));
    })
    this.ctx.fill();
  }
}

export default Draw;
