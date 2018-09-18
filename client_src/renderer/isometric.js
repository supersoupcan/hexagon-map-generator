//https://en.wikipedia.org/wiki/Isometric_projection

const onthrographic = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]

const isometric = [
  [Math.sqrt(3)/ Math.sqrt(6), 1/Math.sqrt(6), Math.sqrt(2)/Math.sqrt(6)],
  [0, 2/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)],
  [-Math.sqrt(3)/Math.sqrt(6), 1/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)]
]

function isometric(){[

]

const Isometric = function(){
  const matrix = [
    [Math.sqrt(3)/ Math.sqrt(6), 1/Math.sqrt(6), Math.sqrt(2)/Math.sqrt(6)],
    [0, 2/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)],
    [-Math.sqrt(3)/Math.sqrt(6), 1/Math.sqrt(6), -Math.sqrt(2)/Math.sqrt(6)]
  ]
}

Isometric.prototype = {
  project: function(x, y, z){

  }
}