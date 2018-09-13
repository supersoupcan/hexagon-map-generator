import { Hexagon } from "../common/shapes";
import Region from './Region';

import Level from './Level';
import MinBinaryHeap from './MinBinaryHeap';
import Tile from './Tile';
import config from './config';

const Generator = function(){
  this.baseShape = new Hexagon(config.baseSize);
  this.regionGraph = new Map();
  this.tiles = new Map();
}

Generator.prototype = {
  initTiles(){
    this.baseShape.tiles().forEach((hex) => {
      const type = this.baseShape.onBorder(hex) ? "BASE_BORDER" : "EMPTY";
      this.tiles.set(hex.key, new Tile(hex, type));
    })
  },
  createRegions: function(){
    const baseTiles = this.baseShape.tiles();
    for(let i = 0; i < 20; i++){
      const regionSize = Math.floor(Math.random() * config.regionSize) + 2;
      const randTile = baseTiles[Math.floor(Math.random() * baseTiles.length)];
      const currentRegion = new Region(new Hexagon(regionSize), randTile);
      if(this.tiles.has(currentRegion.vertex.key) && this.tiles.get(currentRegion.vertex.key).type === "EMPTY"){
        const regionTiles = currentRegion.tiles();
        if(regionTiles.every((hex) => {
          const tile = this.tiles.get(hex.key);
          if(tile){
            if(tile.type === 'ROOM_BORDER'){
              let onBorder = currentRegion.onBorder(hex);
              return onBorder;
            }else{
              return (tile.type === 'EMPTY');
            }
          }else{
            return false;
          }
        })){
          regionTiles.forEach((hex) => {
            const type = currentRegion.onBorder(hex) ? 'ROOM_BORDER': 'ROOM';
            this.tiles.set(hex.key, new Tile(hex, type));
          })
          this.regionGraph.set(currentRegion.key, currentRegion);
        }
      }
    }

    //Prims algorithm to create MSP for regions using hex distance
    const minSpanMap = new Map();
    const minBinaryHeap = new MinBinaryHeap();
    const regions = [];
    this.regionGraph.forEach((region) => regions.push(region));
    const randStartingIndex = Math.floor(Math.random() * regions.length);

    minBinaryHeap.build(regions.map((region, index) => region.key ));
    minBinaryHeap.decreaseKey(regions[randStartingIndex].key, 0);
    while(minBinaryHeap.heap.length > 0){
      const currentRegion = this.regionGraph.get(minBinaryHeap.extractMin().value);
      minBinaryHeap.map.forEach((index, value) => {
        const region = this.regionGraph.get(value);
        const distance = currentRegion.vertex.distance(region.vertex);
        if(minBinaryHeap.heap[index].key > distance){
          minBinaryHeap.decreaseKey(value, distance);
          minSpanMap.set(value, currentRegion.key);
        }
      })
    }
    //Connect regions using MSP
    minSpanMap.forEach((key, value) => {
      const region0 = this.regionGraph.get(value);
      const region1 = this.regionGraph.get(key);
      const results = region0.vertex.linedraw(region1.vertex);
      results.forEach((hex) => {
        this.tiles.set(hex.key, new Tile(hex, 'ROOM'));
      })
    })

    return new Level(this.tiles);
  }
}

export default Generator;