import Layer from './Layers';
import { Layout, Point } from '../common/hexGrid';
import { tileRender, inputRender } from './render';

import { Rectangle, Hexagon } from '../common/shapes';

const Viewport = function(size){
  this.size = size;
  this.recalculate = true;
  this.tiles = null;
  this.layers = new Map([
    ['tiles', new Layer(window.document.getElementById('vp_tiles'), tileRender)],
    ['input', new Layer(window.document.getElementById('vp_input'), inputRender)]
  ]);
  this.layout = new Layout(
    new Point(this.size[0] / 2, this.size[1] /2),
    new Point(10, 10)
  )
  this.cursor = null;
}
Viewport.prototype = {
  init: function(events){
    events.addKeyPair('scale_vp', ['z', 'x']);
    events.addKeyPair('move_vp', ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']);

    events.on('keypair_scale_vp', 'vp', (e) => this.scale(e));
    events.on('keypair_move_vp', 'vp', (e) => this.move(e));
    events.on('click_vp_input', 'vp', (e) => this.click(e));
    events.on('mouse_move_vp_input', 'vp', (e) => {
      this.cursor = [e.clientX, e.clientY];
      this.layers.get('input').rerender = true;
    });
    events.on('mouse_out_vp_input', 'vp', (e) => this.cursor = null);
    
    this.layers.forEach((layer) => layer.setSize(this.size));
  },
  click: function(e){
    const { clientX, clientY } = e;
    const target = new Point(clientX, clientY);
    const hex = target.toHex(this.layout).round();
  },
  move: function(keys){
    const { origin, size } = this.layout;
    if(keys['ArrowRight']) origin.x -= 50/size.x;
    if(keys['ArrowLeft']) origin.x += 50/size.x;
    if(keys['ArrowDown']) origin.y -= 50/size.y;
    if(keys['ArrowUp']) origin.y += 50/size.y;
    this.recalculate = true;
  },
  scale: function(keys){
    if(keys['z']){
      this.layout.size.x *=1.05;
      this.layout.size.y *=1.05;
    }
    if(keys['x']){
      this.layout.size.x /=1.05;
      this.layout.size.y /=1.05;
    }
    this.recalculate = true;
  },
  calculateActiveTiles: function(level){
    const center = new Point(this.size[0]/2, this.size[1]/2).toHex(this.layout).round();
    console.log(center.key);

    const hexWidth = Math.sqrt(3) * this.layout.size.v[0];
    const hexHeight = 3/2 * this.layout.size.v[1];
    const hexHalfWidth = Math.ceil(this.size[0] / hexWidth / 2) + 1;
    const hexHalfHeight = Math.ceil(this.size[1] / hexHeight / 2) + 1;

    const rect = new Rectangle(hexHalfWidth, hexHalfHeight);
    let tiles = [];

    rect.tiles().forEach((tile) => {
      let hex = tile.add(center);
      if(level.data.has(hex.key)){
        tiles.push(hex.key)
      }
    });

    this.tiles = tiles;
    this.recalculate = false;
  },
  update: function(){

  },
  render: function(level){
    if(this.recalculate){
      this.calculateActiveTiles(level);
      this.layers.forEach((layer) => {
        layer.render(this.tiles, this.layout, level, this.cursor);
        layer.rerender = false;
      })
    }else{
      this.layers.forEach((layer) => {
        if(layer.rerender){
          layer.render(this.tiles, this.layout, level, this.cursor);
          layer.rerender = false;
        }
      })
    }
  }
}

export default Viewport;