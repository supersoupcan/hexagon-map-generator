import * as math from 'mathjs';

function translate(x, y){
  return [
    [1, 0, 0],
    [0, 1, 0],
    [x, y, 1]
  ];
}

function rotate(a){
  return [
    [Math.cos(a), Math.sin(a), 0],
    [-Math.sin(a), Math.cos(a), 0],
    [0, 0, 1]
  ];
}

function scale(x, y){
  return [
    [x, 0, 0],
    [0, y, 0],
    [0, 0, 1]
  ];
}

function shear(x, y){
  return [
    [1, x, 0],
    [y, 1, 0],
    [0, 0, 1]
  ];
}

const TransformGroup = function(operations = []){
  this.operations = operations;
}

TransformGroup.prototype = {
  translate: function(x, y){
    this.operations.push(translate(x, y));
  },
  rotate: function(a){
    this.operations.push(rotate(a));
  },
  scale: function(x, y){
    this.operations.push(scale(x, y));
  },
  shear: function(x, y){
    this.operations.push(shear(x, y));
  },
  matrix: function(matrix){
    this.operations.push(matrix);
  },
  product: function(){
    return math.multiply(...this.operations);
  }
}

export { TransformGroup, IsometricProjection, translate, rotate, shear, scale };