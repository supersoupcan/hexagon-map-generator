import * as math from 'mathjs';
import { translate, TransformGroup } from './transform2D';

//Layouts: 
//  Hex: hexagon coordinates q and r
//  Str: standard cartesian plane coordinates
//  TODO Iso: screen pixels after isomorphic shift 

const isometric = [
  [Math.sqrt(3)/Math.sqrt(6), 1/Math.sqrt(6), Math.sqrt(2)/Math.sqrt(6)],
  [0, 2/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)],
  [-Math.sqrt(3)/Math.sqrt(6), 1/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)]
];

const onthrographic = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
];


const projectStrToIso = math.multiply(isometric, onthrographic);

console.log(projectStrToIso);

const Orientation = function(hexToStrMatrix, startingAngle){
  this.hexToStrMatrix = hexToStrMatrix;
  this.strToHexMatrix = math.inv(hexToStrMatrix);
  this.startingAngle = startingAngle;
}

const orientations = {
  pointy: new Orientation(
    [
      [Math.sqrt(3), 0, 0], 
      [Math.sqrt(3) / 2, 3 / 2, 0],
      [0, 0, 1]
    ], Math.PI / 6
  ),
}

const Layout = function(origin, size, orientation){
  this.orientation = orientation;
  this.origin = origin;
  this.size = size;
}

Layout.prototype = {
  transformHexagonCorners: function(){
    return [...Array(6)].map((_, i) => {
      const angle = this.orientation.startingAngle + (Math.PI * i / 3);
      return translate(
        this.size[0] * Math.cos(angle),
        this.size[1] * Math.sin(angle)
      ) 
    });
  },
  transformHexToStr: function(){
    const transformation = new TransformGroup();

    transformation.matrix(this.orientation.hexToStrMatrix);
    transformation.scale(this.size[0], this.size[1]);
    transformation.translate(this.origin[0], this.origin[1]);

    return transformation.product();
  },
  transformStrToHex: function(){
    const transformation = new TransformGroup();
    transformation.translate(-this.origin[0], -this.origin[1]);
    transformation.scale(1/this.size[0], 1/this.size[1]);
    transformation.matrix(this.orientation.strToHexMatrix);

    return transformation.product();
  },
  projectStrToIso: projectStrToIso,
}

export { Layout, orientations };