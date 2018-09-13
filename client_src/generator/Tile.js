const types = {
  "BASE_BORDER": {

  },
  "ROOM_BORDER": {

  },
  "ROOM": {

  },
  "EMPTY": {

  }
}


const Tile = function(hex, type){
  this.type = type;
  this.hex = hex;
}

export default Tile;