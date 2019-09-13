// setup canvas
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// ball counter setup
//var counterText = document.getElementById("#counter");
//counterText.textContent = 0;

// function to generate random number
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// define Shape constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = true;
}

// define Ball constructor
function Ball(x, y, velX, velY, color, size, exists) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

// define ball's update method
Ball.prototype.update = function() {
  if ((this.x + this.size >= width)) {
    this.velX = -(this.velX);
  }
  if ((this.x - this.size <= 0)) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

// define ball's collison detection
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
      }
    }
  }
};

// define EvilCircle()
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, exists);

  this.color = 'white';
  this.size = 50;
  this.x = 400;
  this.y = 100;

  //this.exists = true;
}

// need to better understand the assignments for prototype and Obj.create
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle; // why do we need to do this?


// define EvilCircle methods
EvilCircle.prototype.draw = function() {
  //  Ball.prototype.draw.call(this); // can I do this?
  //    ctx.fillStyle = ctx.strokeStyle = this.color;  // and this?

  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'white';

  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();

};

// checkBounds()
/*
EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size >= width)) {
    this.x = -(this.x);
  }
  if ((this.x - this.size <= 0)) {
    this.x = -(this.x);
  }
  if ((this.y + this.size) >= height) {
    this.y = -(this.y);
  }
  if ((this.y - this.size) <= 0) {
    this.y = -(this.y);
  }
};
*/

// setControls()
/*
EvilCircle.prototype.setControls = function () {
  var _this = this;
  window.onkeydown = function (e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
};
*/

// collisionDetect()
/*
EvilCircle.prototype.collisionDetect = function () {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = this.exists = false;
      }
    }
  }
};
*/

// define array to store balls
var balls = [];

// define loop that keeps drawing the scene constantly
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  // create EvilCircle instance
  var evil = new EvilCircle();
  evil.draw();
  // evil.setControls();

  while (balls.length < 25) {
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")",
      random(10, 20)
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {

    //  if (ball !== exist) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    //  }
  }

  //   evil.draw();
  //   evil.checkBounds();
  //   evil.collisionDetect();

  requestAnimationFrame(loop);
}

// start animation
loop();