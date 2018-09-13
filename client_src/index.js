import App from './App';
import './index.scss';

window.document.onreadystatechange = function(){
  switch(document.readyState){
    case 'interactive': {
      const app = new App();
      app.init();
    }
  }
}

/*
import { Hex, Point, Layout, orientation } from './hex_grid';

const app = new App();

const canvas = document.getElementById('canvas');

const layout = new Layout(
  orientation.pointy, 
  new Point(100, 100),
  new Point(20, 20)
);

canvas.addEventListener('click', function(event){
  const point = new Point(event.clientX, event.clientY);
  console.log(point.to_hex(layout).round().value());
})

const ctx = canvas.getContext("2d");
const hex = new Hex(0, 0);
const corners = hex.corners(layout);

ctx.moveTo(corners[5].x, corners[5].y);

corners.forEach((point) => {
  ctx.lineTo(point.x, point.y);
})

ctx.stroke();
*/