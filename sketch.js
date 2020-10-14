// Engineered By Aishwarye Gaikwad and Roni Kaufman (https://ronikaufman.github.io)

let kMax;
let step;
let n = 40; // number of blobs
let radius = 0; // diameter of the circle
let inter = 0.5; // difference between the sizes of two blobs
let maxNoise = 640;


let noiseProg = (x) => (x);

var canvas;

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    if(windowWidth <= 320) {
        maxNoise = 220;
    } else if(windowWidth <= 480) {
        maxNoise = 320;
    } else if(windowWidth <= 640) {
        maxNoise = 500;
    }else if(windowWidth <= 720) {
        maxNoise = 560;
    } else if(windowWidth <= 1080){
        maxNoise = 640;
    } 
}

function setup() {
    frameRate(60);
  canvas= createCanvas(windowWidth, windowHeight);
  canvas.style('z-index','-100');
//   canvas.style('width','100%')
  canvas.position(0,0);


  colorMode(HSB, 1);
	angleMode(DEGREES);
    noFill();
	//noLoop();
	kMax = 1;
	step = 0.01;
	strokeWeight(2);
}

function draw() {

  background(0);
	let t = frameCount/100;
	kMax = noise(t/2);
  
    if(windowWidth <= 320) {
        maxNoise = 220;
    } else if(windowWidth <= 480) {
        maxNoise = 320;
    } else if(windowWidth <= 640) {
        maxNoise = 500;
    }else if(windowWidth <= 720) {
        maxNoise = 560;
    } else if(windowWidth <= 1080){
        maxNoise = 640;
    } 

  for (let i = n; i >= 0; i--) {
		let alpha = 1 - noiseProg(i / n);
		if (i % 2 === 0) {
            fill(mouseX/1800,100,100);
            // fill(12,mouseX/1000,100);
		} else {
			fill(0);
		}
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
    blob(size, width/2, height/2, k, t + i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 50;
  for (let theta = 0; theta <= 360 + angleStep * 2; theta += angleStep) {
    let r1, r2;
		/*
    if (theta < PI / 2) {
      r1 = cos(theta);
      r2 = 1;
    } else if (theta < PI) {
      r1 = 0;
      r2 = sin(theta);
    } else if (theta < 3 * PI / 2) {
      r1 = sin(theta);
      r2 = 0;
    } else {
      r1 = 1;
      r2 = cos(theta);
    }
		*/
		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}
