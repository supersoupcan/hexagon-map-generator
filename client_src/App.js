import Viewport from './renderer/Viewport';
import Events from './Events';
import Generator from './generator/Generator';

const App = function(){
  this.events = new Events();
  this.level = null;
  this.renderer = new Viewport([500, 500]);
  this.lastTime = 0;
}

App.prototype = {
  init: function(){
    this.events.init();
    this.renderer.init(this.events);
    const generator = new Generator();
    generator.initTiles();
    this.level = generator.createRegions();
    this.animate();
  },
  animate: function(){
    window.requestAnimationFrame(() => this.animate());
    this.events.emitKeyPairs();
    this.renderer.render(this.level);
  }
}

export default App;