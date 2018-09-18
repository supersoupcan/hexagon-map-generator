import * as math from 'mathjs';
import Layer from './Layers';
import Hex from '../common/Hex';
import { Rectangle, Hexagon } from '../common/shapes';
import { Layout, orientations } from './layout';
import { tileRender, inputRender } from './render';
import { translate, TransformGroup } from './transform2D';


const Viewport = function(size){
  this.size = size;
  this.recalculate = true;
  this.activeTiles = [];
  this.layers = new Map([
    ['tiles', new Layer(window.document.getElementById('vp_tiles'), tileRender)],
    ['input', new Layer(window.document.getElementById('vp_input'), inputRender)]
  ]);
  this.layout = new Layout(
    [size[0]/ 2, size[1]/2],
    [10, 10],
    orientations.pointy
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
    const target = [clientX, clientY, 1];
    const hex = math.multiply(target, this.layout.transformStrToHex());
    console.log(hex);

  },
  move: function(keys){
    const { origin } = this.layout;
    if(keys['ArrowRight']) origin[0] -= 5;
    if(keys['ArrowLeft']) origin[0] += 5;
    if(keys['ArrowDown']) origin[1] -= 5;
    if(keys['ArrowUp']) origin[1] += 5;
    this.recalculate = true;
  },
  scale: function(keys){
    const { size } = this.layout;
    if(keys['z']){
      size[0] *=1.05;
      size[1] *=1.05;
    }
    if(keys['x']){
      size[0] /=1.05;
      size[1] /=1.05;
    }
    this.recalculate = true;
  },
  calculateActiveTiles: function(level){
    let activeTiles = [];
    /*
    const { size, origin } = this.layout;
    const hexWidth = Math.sqrt(3) * size[0];
    const hexHeight = 3/2 * size[1];
    const hexHalfWidth = Math.ceil(this.size[0] / hexWidth / 2 + 0.25);
    const hexHalfHeight = Math.ceil(this.size[1] / hexHeight / 2 + 0.25);
    const rect = new Rectangle(hexHalfWidth, hexHalfHeight);

    const centerHex = new Hex(...math.multiply(
      [this.size[0]/2, this.size[1]/2, 1],
      this.layout.transformStrToHex()
    )).round();
    
    let activeTiles = [];
    rect.tiles().forEach((tile) => {
      const currentHex = tile.add(centerHex);
      if(level.data.has(currentHex.key)){
        activeTiles.push(currentHex.key)
      }
    });
    */
    level.data.forEach((tile) => { activeTiles.push(tile.hex.key)});
    this.activeTiles = activeTiles;
    this.recalculate = false;
  },
  update: function(){
  },
  render: function(level){
    if(this.recalculate){
      this.calculateActiveTiles(level);
      this.layers.forEach((layer) => {
        layer.render(this, level);
        layer.rerender = false;
      })
    }else{
      this.layers.forEach((layer) => {
        if(layer.rerender){
          layer.render(this, level);
          layer.rerender = false;
        }
      })
    }
  }
}

export default Viewport;