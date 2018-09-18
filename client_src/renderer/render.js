import * as math from 'mathjs';
import Draw from './Draw';
import { rotate } from './transform2D';

function tileRender(viewport, level){
  const { activeTiles, layout } = viewport;
  
  //optimized hexagon rendering logic
  const transformHexToStr = layout.transformHexToStr();
  const projectStrToIso = layout.projectStrToIso;
  const tranformHexToStrHCs = layout.transformHexagonCorners().map(
    (transformStrHC) => math.multiply(transformHexToStr, transformStrHC)
  );

  const draw = new Draw(this.canvas, layout);
  draw.clear();
 
  activeTiles.forEach((key) => {
    const tile = level.data.get(key);
    const color = (() => { switch(tile.type){
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
    }})();
    const verticesStrHCs = tranformHexToStrHCs.map(
      (transformHexToStrHC) => {
        const strHC = math.multiply(tile.hex.vertices, transformHexToStrHC);
        const isoHC = math.multiply([strHC[0], strHC[1], 0], projectStrToIso)
        return isoHC;
      }
    );
    draw.freeShape(verticesStrHCs, { fillStyle: color })
  })
}

function inputRender(tiles, layout, level, cursor){
  const draw = new Draw(this.canvas, layout);
  draw.clear();
  if(cursor){
  }
}

export { tileRender, inputRender };