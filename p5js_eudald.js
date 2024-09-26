//Eudald Cardozo Vallhonrat 54580233Z

//El valor d'aquestes dues primeres variables es pot canviar per experimentar amb l'aparença de l'obra, un major spacing mostrarà mes espai entre figures d'un mateix passadis, una major speed farà que tot es dibuixi mes rapid, i amb el weight podem variar el gruix de les figures, fent que apareixi mes o menys plè
//Spacings inferiors a 2 amb una pantalla de gran tamany poden causar lag
let spacing = 3;
let speed = 0.5;
let weight = 2;

//Aquestes variables declaren l'estat de control de l'obra, l'estat inicial i si el programa s'inicia bloquejat o desbloquejat.
let state = 0;
let lock = false;

//Les següents les declarem i els assignarem un valor a dins el setup
let seed;
let x;
let y;

//Definim el punt inicial de dos comptadors i el diametre del botó de bloqueig
let a = 0;
let e = 0;
let pd = 23;

function setup() {
  //Fem que el llenç s'ajusti automaticament a la mida de la pantalla, per a que aixo sigui funcional haurem de fer totes les mesures proporcionals a la mida del canvas
  createCanvas(windowWidth, windowHeight);

  //Generarem una llavor aleatoria que utilitzarem per a la resta de nombres aleatoris del programa, la hem de generar al setup ja que d'altra manera es generaria continuament una de nova i les figures es mourien de forma erratica.
  //La funció floor arrodoneix el nombre i el fa enter.
  seed = round(random(10000));

  //Declarem el valor de les variables que controlen la posició del botó de bloqueig, les fem proporcionals al llenç
  x = width / 18;
  y = height / 15;

  //Configurem els modes de diferents funcions per a major comoditat.
  rectMode(CENTER);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  //Canviem el mode de color a Hue Saturation Brightness, aixo farà que amb un sol paràmetre poguem canviar la coloració, permetentnos tenir colors vde la mateixa intensitat
  colorMode(HSB);
}

function windowResized() {
  //Amb aquesta simple funció incorporada farem que el llenç s'ajusti en temps real si es canvia la mida de la finestra
  resizeCanvas(windowWidth, windowHeight);
}

//Recuperem la funció d'hexagon de la anterior exercici, amb alguns valors girats de manera que estigui orientat amb un vertex a dalt i un a baix, en comptes de als costats.
function hexagon(x, y, d) {
  let rad = d / 2;
  let apot = sqrt(sq(rad) - sq(rad / 2));
  beginShape();
  vertex(x, y + rad);
  vertex(x + apot, y + rad / 2);
  vertex(x + apot, y - rad / 2);
  vertex(x, y - rad);
  vertex(x - apot, y - rad / 2);
  vertex(x - apot, y + rad / 2);
  endShape(CLOSE);
}

//Recuperem també la funció de triangle equilater, que es una adaptació de l'hexagon amb la meitat de punts
function equilat(x, y, d) {
  let rad = d / 2;
  let apot = sqrt(sq(rad) - sq(rad / 2));
  triangle(x - rad / 2, y - apot, x + rad, y, x - rad / 2, y + apot);
}

//Funció que dibuixa la maneta del candau per al botó de bloqueig, aixi la podrem moure depenent de si el candau es troba obert o tancat
function handle(x, y, d) {
  noFill();
  arc(x, y - (d * 2) / 6, (d * 4) / 6, (d * 4) / 6, 180, 360);
  line(x + (d * 4) / 12, y - (d * 2) / 6, x + (d * 4) / 12, y);
  line(x - (d * 4) / 12, y - (d * 2) / 6, x - (d * 4) / 12, y);
}

//Definim la funció del botó de candau amb parametres per controlar la posició, la mida i el seu estat, si està bloquejat o no, i si està selecionat(si el ratoli es troba sobre aquest)
function padlock(x, y, d, locked, selected) {
  fill(0);
  if (selected == true) {
    //Si el botó es troba selecionat canviem el color del quadrat del seu fons, indicant que es pot interactuar amb aquest
    fill(30);
  }
  //definim totes les mides segons 'd', el paràmetre de mida
  strokeWeight(d / 6);
  stroke(100);
  square(x, y, (5 / 2) * d, d / 2);

  if (locked == true) {
    //Si el candau es troba bloquejat, dibuixem la maneta centrada amb el cos d'aquest
    handle(x, y, d);
  }
  if (locked == false) {
    //Si el candau es troba desbloquejat, dibuixem la maneta desplaçada cap a la dreta i desplacem la posició relativa 'x' cap a l'esquerra, de manera que la figura del candau quedi mes ben centrada dins el marc
    x = x - d / 4;
    handle(x + (d * 4) / 6, y, d);
  }
  //Finalment el cos del candau es un rectangle arrodonit, si l'estat es desbloquejat s'aplicarà el nou valor de 'x' i apareixerà desplaçat.
  noStroke();
  fill(100);
  rect(x, y + (d * 2) / 6, d, (d * 5) / 6, d / 8);
}

//per a les figures de la obra com a tal, fem servir un 'for' que generarà un nombre aleatori(gen) de figures de diametre, posició, forma(shape) i color(h) també aleatoris.
//Recordem que hem definit una llavor concreta per a les funcions random, per tant aquests valors es mantindran estàtics durant aquesta execució de la funció
function generate() {
  //declarem una variable que inici en 0, i al segon parametre del for generem un nombre aleatori entre 5 i 10, i indiquem que a cada cicle 'gen' incrementa per 1, volguent dir que a cada cicle del for() generarem entre un mínim de 5 figures i un maxim de 10.
  for (gen = 0; gen < random(5,10); gen++) {
    //aleatoritzem la figura generant nombres arrodonits entre 0 i 2, segons quin generem dibuixarem una forma o altra
    shape = round(random(2));
    //aplicarem un color aleatori, en mode HSB per defecte el hue esta compres en un cercle de 360 graus
    h = random(360);
    //afegim la funció pull que repetirà cada forma aleatoria de manera progresiva donant l'efecte de profunditat. definim els parametres segons l'spacing
    //els dos primers parametres definiran la posició de cada figura, proporcional al spacing que s'hagi introduit al inici, i el tercer defineix les mides maxima i mínima que pot tenir el radi de les figures, proporcional tambe al spacing
    pull(
      random(-spc, spc),
      random(-spc, spc),
      random(width / (spc * 15), width / (spc * 2))
    );
  }
}

//la funció pull genera formes al centre del canvas segons el valor de shape, i progresivament en va augmentat la mida i la opacitat.
//else seus parametres defineixen la posició i el diametre de la figura final de la succesió, moment en que es parà de generar.
function pull(x, y, r) {
  noFill();

  //Definim el pes de la linia segons el valor de weight introduit inicialment
  strokeWeight(weight);

  //Amb aquest 'for' creem la progresió de la funció, 'i' augmenta i els valors tant de diametre com de posició son relatius a 'i'. Aquest es el cas mentre 'i' es inferior tant al diametre com a 'a', una variable definida mes endavant que augmenta el seu valor progresivament. Si i arriba a 'r' es para, i fins que 'a' no arriba a valdre el mateix que 'r', va dibuixant les figures una per una.
  for (i = 1; i <= a && i <= r; i++) {
    //en funció de l'estat en que ens trobem la coloració de les figures es una o altra
    if (state == 0) {
      //al estat 0, la figura es blanca (Brightness:100), i en funció del valor de i te més o menys opacitat. Dividim entre 'r' fent que aquesta opacitat sigui proporcional (valor entre 0 i 1).
      stroke(0, 0, 100, i / r);
    }
    //al estat 1 variem el parametre brightness per aconseguir un degradat de negre a blanc, tornem a dividir 'i' entre 'r' i ho multipliquem per 100, per tenir un degradat proporcional al nombre de figures. Posem una opacitat mitjana per que si els passadissos es sobreposen es puguin seguir veient.
    if (state == 1) {
      stroke(0, 0, (i / r) * 100, 0.6);
    }

    //al estat 2 fem servir la variable h per la que hem generat un valor aleatori entre 360 a la funció generate, posem un valor de saturació no total per tenir uns colors mes agradables a la vista, i com a l'estat anterior una brillantor proporcional al nombre de figures de cada passadís, i una opacitat mitjana
    if (state == 2) {
      stroke(h, 90, (i / r) * 100, 0.6);
    }

    //Havent definit el color del traç de la figura que es generarà a cada bucle segons l'estat,
    //Per a aixo farem servir el valor aleatori arrodonit que hem definit per shape
    //els parametres per cada figura seran els mateixos, ja que el cercle, el quadrat i la funció d'hexagon que hem creat segueixen la mateixa estructura. la posició incial es el centre del llenç, a aquesta si suma 'i', fent que progresi la posició tant horitzontal com vertical amb cada bucle. Aquesta 'i' està alhora multiplicada per x i y, definits a la funció generate com a un valor aleatori entre spc(spacing) i el negatiu d'aquest. aixo fa que la posició final sempre es trobi dins el llenç. per al diametre de cada figura ens basem també en l'spacing i el multipliquem per 'i', fentlo progresar amb cada bucle. Tornem a multiplicar-lo per 'i', de manera que pasa d'augmentar per una tasa fixa a cada bucle a augmentar de manera exponencial, pasant de progresió aritmetica a geometrica, donant l'efecte de passadis corvat. Augmentar multiplicant per 'i' a cada pas fa un increment exponencial massa vertical, per tant ho multipliquem per 'i' dividit de 'r', fent que el resultat final màxim de la progresió sigui el valor de r
    if (shape == 0) {
      //quan shape sigui 0 generarem un quadrat
      square(width / 2 + i * x, height / 2 + y * i, spc * i * (i / r));
    }
    if (shape == 1) {
      //quan shape sigui 1 generarem un cercle
      circle(width / 2 + i * x, height / 2 + y * i, spc * i * (i / r));
    }
    if (shape == 2) {
      //quan shape sigui 2 generarem un hexagon
      hexagon(width / 2 + i * x, height / 2 + y * i, spc * i * (i / r));
    }
  }
}

//Per expresar la nostra visió al estat 3 escriurem un text que apareixerà de manera intermitent sobre els diferents estats
//Per als parametres fem servir el mateix format que la funció de rectangle, aquests s'aplicaràn tant al rectangle de fons com al quadre de text. L'ultim parametre controlara la mida del text.
function paragraph(x, y, w, h, size) {
  textAlign(CENTER);
  noStroke();
  //Ja que escriurem sobre elements de multiples colors, entre ells blanc i negre, primer creem un fons negre semi-transparent. A les seves mesures afegim cert marge per que envolti correctaemnt el text.
  fill(0, 0, 0, 0.6);
  rect(x, y - 10, w + 30, h + 20, h / 8);
  textSize(size);
  fill(100);
  //fem servir una tipografia incorporada al banc de fons de google de manera que es carregarà correctament a la majoria de dispositius.
  textFont("Rubik");
  text(
    "Les pantalles son tant omnipresents a la nostra vida que les donem completament per fet, ni pensem que en el fons tot el que veiem es una ilusió. Sobretot la ilusió de la profunditat, que una matriu de punts lluminosos pugui mostrar entorns tridimensionals, ens permeti mouren's a través d'ells, modificar-los i sentirnos completament immersos a un mon virtual projectat sobre un pla.",
    x,
    y,
    w,
    h
  );
}

//Per al estat 0, que volem que generi sempre la mateixa figura amb la mateixa mida, definim temporalment les variables amb valors donats, spacing de 30, de manera que es distingeixin facilment els diferents pasos de la progresió. Definim shape a 2 de manera que es generi sempre un hexagon.
function state0() {
  //afegim un background negre per que en tornar del state 2 al 0 es borri el dibuix anterior
  background(0);
  spc = 30;
  shape = 2;
  //Definides les variables, cridem la funció pull i li donem un diametre fixe de 14
  pull(0, 0, 14);
}

function state1() {
  background(0);
  //altre cop afegim un background per que es borri l'estat anterior

  //per al estat 1 retornem a que spc equivalgui al spacing definit amb les variables inicals
  spc = spacing;
  //aquest cop cridem la funció generate i aquesta ja exercirà correctament la seva funció si la variable state equival a 1
  generate();
}

function state2() {
  //a aquest estat no afegim background ja que volem que en generar les figures amb color es mostri com resegueixen les figures en blanc de l'estat 1.
  //aixo causa que el mateix estat s'estigui dibuixant continuament sobre si mateix, eliminant els pixels amb alpha i provocant que el text del estat 3 quedi sota el dibuix en deseapareixer durant l'estat 2. aquest error es podria solucionar posant un background i abans de generar l'estat 2 es carregues un cop l'estat 1 amb el valor de 'a' final, donant el mateix efecte pero sense els errors visuals, pero es tard i tinc son
  //com que l'estat 2 sempre va precedit per l'1, no cal que tornem a definir la variable, simplement amb la funció generate i mentre state equivalgui a 2 es generarà correctament
  generate();
}

//Per a carregar l'estat 3 intermitentment crearem una variable que augmenti sempre que el programa estigui en estat desbloquejat.
function state3() {
  //amb aquest condicional evitem que l'estat 3 pugui apareixer o desapareixer si el programa esta bloquejat
  if (lock == false) {
    e = e + 1;
  }
  //quan el comptador e supera el valor 1000, la consola mostra que aquest s'ha activat i carreguem el paragraf a la part inferior de la pantalla, amb posicions relatives a la mida del llenç
  if (e > 1500) {
    console.log("Estat:3");
    paragraph(
      width / 2,
      (height * (5 / 3)) / 2,
      (width * 3) / 4,
      height / 4,
      height / 35
    );
  }
  //mentre es mostra el text de l'estat 3 el comptador segueix pujant, si passen 1200 ticks més aquest torna a 0 i per tant reinicia el cicle
  if (e > 2200) {
    e = 0;
    //quan es reinicia el comptador a la consola es torna a mostrar l'estat actual
    console.log("Estat:" + state);
  }
}

//Tenim varies funcionalitats que s'han d'activar quan fem clic a la pantalla, les posem dins una funció mouseClciked
function mouseClicked() {
  //la primera es el canvi de l'estat del bloqueig, detectem si el cursor es troba sobre el botó de bloqueig i si l'estat actual es bloquejat o desbloquejat
  if (
    lock == false &&
    mouseX > x - pd &&
    mouseX < x + pd &&
    mouseY > y - pd &&
    mouseY < y + pd
  ) {
    //si es registra un clic sobre el botó i l'estat es desbloquejat, canvirà a bloquejat i a la consola es mostrarà "OFF"
    lock = true;
    console.log("OFF");
  }

  //si l'estat de 'lock' no  compleix aquest primer condicional, pero el ratolí es troba igualment dins de l'area, pasem de true a false i mostrem a la consola "ON"
  else if (
    lock == true &&
    mouseX > x - pd &&
    mouseX < x + pd &&
    mouseY > y - pd &&
    mouseY < y + pd
  ) {
    lock = false;
    console.log("ON");
  }

  //La seguent acció en l'esdeveniment d'un clic a la pantalla és per passar a al seguent estat.
  //Fem que qualsevol acció dins d'aquest condicional nomes pugui passar si el codi esta desbloquejat(lock==false).
  if (lock == false) {
    //Volem que aquest codi s'executi en fer un clic a qualsevol lloc de la pantalla, però com que tenim el botó de bloqueig a una area concreta, posarem tambe condicionals per detectar si el clic es registra a qualsevol punt menys a l'interior del botó.
    //fem servir barres vericals per indicar que si el cursor esta abans o mes enlla del botó, s'ha d'executar el codi per avançar l'estat
    if (
      mouseX < x - pd ||
      mouseX > x + pd ||
      mouseY < y - pd ||
      mouseY > y + pd
    ) {
      //sumem 1 al valor de l'estat, fent que pasem al seguent, i també reiniciem la variable 'a' de manera que l'animació progresiva es reinici
      state = state + 1;
      a = 0;
      //si el valor de state supera el 3 tornem al 0 i es genera una nova llavor, fent que es reinici el programa i els les figures es generin en una nova configuració de posició, mida i color.
      if (state >= 3) {
        state = 0;
        seed = floor(random(10000));
      }
      //mostrem a la consola quin es el nou estat un cop aquest ha canviat
      console.log("Estat:" + state);
    }
  }
}

//aquesta ultima funció carrega el botó de bloqueig en les seves diferents configuracions segons l'estat del programa
//posem parametres per la posició i mida de la funció 'padlock'
function loadLock(x, y, d) {
  //definim dues variables a les que asignarem un valor boolean segons la configuració del candau
  let locked;
  let selected;
  //el primer condicional carrega el botó desbloquejat i seleccionat, en cas que el codi estigui desbloqueat i el cursor es trobi sobre aquest.
  if (
    lock == false &&
    mouseX > x - d &&
    mouseX < x + d &&
    mouseY > y - d &&
    mouseY < y + d
  ) {
    locked = false;
    selected = true;
  }
  //si no és el cas que el cursor esta sobre el candau però si que es troba bloquejat, carreguem el botó amb els dos parametres negatius
  else if (lock == false) {
    locked = false;
    selected = false;
  }

  //si el programa esta bloquejat i el cursor es troba sobre el candau carreguem amb els dos paràmetres de configuració en true
  if (
    lock == true &&
    mouseX > x - d &&
    mouseX < x + d &&
    mouseY > y - d &&
    mouseY < y + d
  ) {
    locked = true;
    selected = true;
  }
  //i si es dona el cas que el programa esta bloquejat i no tenim el cursor sobre el botó, carreguem el botó bloquejat i deseleccionat
  else if (lock == true) {
    locked = true;
    selected = false;
  }
  //finalment posem la funció del candau, al posarla aqui al final s'aplicaran als parametres locked i selected els valors només del condicional actiu en aquell moment.
  padlock(x, y, d, locked, selected);
}

//creem un marc simple, que s'ajusti sempre a la mida del llenç, pero no varii el seu gruix ni radi dels vertex.
function marc() {
  noFill();
  stroke(100);
  strokeWeight(12);
  //sumem 3 punts a les dimensions del rectangle, per que els vertex arrodonits no deixin un petit espai en negre a cada cantonada
  rect(width / 2, height / 2, width + 3, height + 3, 20);
}

//finalment, ajuntem totes les funcions a la funció draw
function draw() {
  //primer de tot apliquem la llavor aleatoria que hem generat al setup i que es genera de nou cada vegada que pasem del estat 2 al 0
  randomSeed(seed);
  //a cada repetició del codi incrementem el valor de "a" per el factor speed definit al inici, permetent que es reproduexi l'animació del les figures
  a = a + speed;
  //depenent del valor de estat carregarem una funció d'estat o una altra
  if (state == 0) {
    state0();
  }
  if (state == 1) {
    state1();
  }
  if (state == 2) {
    state2();
  }
  //mentre només un dels primers estats pot estar carregat a cada moment, el comptador de l'estat 3 va comptant, i quan toqui aquest es mostrarà per sobre de qualsevol dels altres estats
  state3();

  //ja acabant carreguem la funció del botó de bloqueig, amb el diametre definit a les variables inicials i la posició relativa al llenç definida dins el setup
  loadLock(x, y, pd);

  //per últim carreguem el marc per sobre de tot
  marc();
}
