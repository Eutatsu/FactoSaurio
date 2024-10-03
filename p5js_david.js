// David Garcia Aybar - Pràctica 2
// variables dels colors de l'objecte 1
let color1 = "green"
let color2 = "yellow"
let color3 = "red"
let color4 = "purple"
// variables per a aleatoriztar els colors de l'objecte 2
let r1 = 1
let g1 = 1
let b1 = 1
let r2 = 1
let g2 = 1
let b2 = 1
let r3 = 1
let g3 = 1
let b3 = 1
let r4 = 1
let g4 = 1
let b4 = 1
let p5david
// per a que la característica "random" no s'executi constantment s'ha d'implementar dintre la funció setup
function setup() {
  p5david = createCanvas(400, 400);
  p5david.parent ('dav');
  r1 = random(255)
  g1 = random(255)
  b1 = random(255)
  r2 = random(255)
  g2 = random(255)
  b2 = random(255)
  r3 = random(255)
  g3 = random(255)
  b3 = random(255)
  r4 = random(255)
  g4 = random(255)
  b4 = random(255)
}

// dibuix dels patrons
function draw() {
  background(220);
  patro1(40)
  patro2(40)
}

// funcions per la creació del mosaic i que sempre ocupi tota la mida del canvas, utilitzant 2 patrons diferents
function patro1(diametre){
  
  for (var i = 0; i <= width; i = i + 2*diametre){
    for (var j = 0; j <= height; j = j + 2*diametre){
     
        objecte1(i, j, diametre)  
    } 
  }
}

function patro2(diametre){
  
  for (var i = 0; i <= width; i = i + 2*diametre){
    for (var j = 0; j <= height; j = j + 2*diametre){ 
      
      objecte2(i+40, j+40, diametre)
    }
  }
}

// funció per crear l'objecte que formarà el patró 1
function objecte1(x, y, cosa){
  fill(color4);
  quad(x, y-cosa, x+cosa, y, x, y+cosa, x-cosa, y);
  fill(color1);
  circle(x, y, cosa);
  fill(color2);
  ellipse(x, y, cosa, cosa/2);
  fill(color3);
  circle(x, y, cosa/2);
  strokeWeight(4);
  line(x, y-5, x, y+5);
  strokeWeight(1);
}

// funció per crear l'objecte 2 que formarà el patró 2
function objecte2(x, y, cosa){
  fill(r1, g1, b1);
  circle(x, y, cosa);
  fill(r2, g2, b2);
  quad(x, y-cosa/2, x+cosa/2, y, x, y+cosa/2, x-cosa/2, y);
  fill(r3, g3, b3);
  circle(x, y, cosa/2);
  fill(r4, g4, b4);
  circle(x, y, cosa/4);
}
