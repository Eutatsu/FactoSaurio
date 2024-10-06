new p5(function(p) {
  // David Garcia Aybar - Pràctica 2

  // Variables dels colors de l'objecte 1
  let color1 = "green";
  let color2 = "yellow";
  let color3 = "red";
  let color4 = "purple";

  // Variables per a aleatoritzar els colors de l'objecte 2
  let r1 = 1;
  let g1 = 1;
  let b1 = 1;
  let r2 = 1;
  let g2 = 1;
  let b2 = 1;
  let r3 = 1;
  let g3 = 1;
  let b3 = 1;
  let r4 = 1;
  let g4 = 1;
  let b4 = 1;
  let p5david;

  // Per a que la característica "random" no s'executi constantment s'ha d'implementar dintre la funció setup
  p.setup = function() {
    p5david = p.createCanvas(400, 400).parent('dav');

    r1 = p.random(255);
    g1 = p.random(255);
    b1 = p.random(255);
    r2 = p.random(255);
    g2 = p.random(255);
    b2 = p.random(255);
    r3 = p.random(255);
    g3 = p.random(255);
    b3 = p.random(255);
    r4 = p.random(255);
    g4 = p.random(255);
    b4 = p.random(255);
  };

  // Dibuix dels patrons
  p.draw = function() {
    p.background(220);
    patro1(40);
    patro2(40);
  };

  // Funcions per la creació del mosaic i que sempre ocupi tota la mida del canvas, utilitzant 2 patrons diferents
  function patro1(diametre) {
    for (var i = 0; i <= p.width; i = i + 2 * diametre) {
      for (var j = 0; j <= p.height; j = j + 2 * diametre) {
        objecte1(i, j, diametre);
      }
    }
  }

  function patro2(diametre) {
    for (var i = 0; i <= p.width; i = i + 2 * diametre) {
      for (var j = 0; j <= p.height; j = j + 2 * diametre) {
        objecte2(i + 40, j + 40, diametre);
      }
    }
  }

  // Funció per crear l'objecte que formarà el patró 1
  function objecte1(x, y, cosa) {
    p.fill(color4);
    p.quad(x, y - cosa, x + cosa, y, x, y + cosa, x - cosa, y);
    p.fill(color1);
    p.circle(x, y, cosa);
    p.fill(color2);
    p.ellipse(x, y, cosa, cosa / 2);
    p.fill(color3);
    p.circle(x, y, cosa / 2);
    p.strokeWeight(4);
    p.line(x, y - 5, x, y + 5);
    p.strokeWeight(1);
  }

  // Funció per crear l'objecte 2 que formarà el patró 2
  function objecte2(x, y, cosa) {
    p.fill(r1, g1, b1);
    p.circle(x, y, cosa);
    p.fill(r2, g2, b2);
    p.quad(x, y - cosa / 2, x + cosa / 2, y, x, y + cosa / 2, x - cosa / 2, y);
    p.fill(r3, g3, b3);
    p.circle(x, y, cosa / 2);
    p.fill(r4, g4, b4);
    p.circle(x, y, cosa / 4);
  }
});
