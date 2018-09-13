import Draw from './Draw';
import { Point } from '../common/hexGrid';

function tileRender(tiles, layout, level, cursor){
  const draw = new Draw(this.canvas, layout);
  draw.clear();
  tiles.forEach((key) => {
    const data = level.data.get(key);
    const color = (() => { 
      switch(data.type){
        case "BASE_BORDER": {
          return 'grey'
        }
        case "ROOM": {
          return 'yellow'
        }
        case "ROOM_BORDER": {
          return 'orange'
        } 
        default: {
          return 'black'
        }
      }
    })();
    draw.hex(data.hex, { fillStyle: color })
  })
}

function inputRender(tiles, layout, level, cursor){
  const draw = new Draw(this.canvas, layout);
  draw.clear();
  if(cursor){
    let hex = new Point(cursor[0], cursor[1]).toHex(layout).round();
    draw.hex(hex, { fillStyle: 'rgba(256, 256, 256, 0.8' })
    draw.circle(new Point(cursor[0], cursor[1]), { fillStyle: 'blue' });
  }
}

export { tileRender, inputRender };