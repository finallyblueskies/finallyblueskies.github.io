import SketchP5 from "../modules/sketch_p5.mjs";

class SnakeSketch extends SketchP5 {
  setup() {
    SketchP5.prototype.setup.call(this);
    this.initGame();
  }
  randomLoc() {
    return this.p5.createVector(
      this.p5.random(this.p5.width),
      this.p5.random(this.p5.height)
    );
  }
  foodHitTest(segment) {
    let hitIndex = -1;
    this.food.some((vec, i) => {
      // add a modifier to expand hit area so that there are fewer
      // misses due to super basic collision detection
      const hitModifier = 2;
      const boundingBox = {
        left: vec.x - hitModifier,
        top: vec.y - hitModifier,
        right: vec.x + this.bitSize + hitModifier,
        bottom: vec.y + this.bitSize + hitModifier,
      };
      if (this.hitTest(segment.x, segment.y, boundingBox)) {
        hitIndex = i;
      }
    });
    return hitIndex;
  }
  hitTest(x, y, box) {
    const segXMid = x + this.snakeWidth / 2;
    const segYMid = y + this.snakeWidth / 2;
    if (
      segXMid <= box.right &&
      segXMid >= box.left &&
      segYMid <= box.bottom &&
      segYMid >= box.top
    ) {
      return true;
    }
  }
  selfHitTest(segment) {
    for (let i = this.segments.length - 5; i >= 0; i--) {
      const evalSeg = this.segments[i];
      const boundingBox = {
        left: evalSeg.x,
        top: evalSeg.y,
        right: evalSeg.x + this.snakeWidth / 2,
        bottom: evalSeg.y + this.snakeWidth / 2,
      };
      const isHit = this.hitTest(segment.x, segment.y, boundingBox);
      if (isHit) {
        return true;
      }
    }
    return false;
  }
  initGame() {
    this.bitSize = 10;
    this.snakeLength = 15;
    this.snakeWidth = 8;
    this.position = this.randomLoc();
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.friction = this.p5.createVector(-0.01, -0.01);
    this.segments = [];
    this.initFood();
  }
  generateBit() {
    const pos = this.randomLoc();
    return {
      tx: pos.x * 1000,
      ty: pos.y * 1000,
      size: 0,
    };
  }
  initFood() {
    this.food = [...Array(20)].map(() => this.generateBit());
  }
  draw() {
    this.p5.noStroke();
    this.p5.clear();
    this.p5.background("#003366");

    // Draw food
    this.food.forEach((bit) => {
      this.p5.fill("#fff");
      bit.x = this.p5.map(this.p5.noise(bit.tx), 0, 1, 0, window.innerWidth);
      bit.y = this.p5.map(this.p5.noise(bit.ty), 0, 1, 0, window.innerHeight);
      bit.tx += 0.0005;
      bit.ty += 0.0005;
      this.p5.ellipse(bit.x, bit.y, bit.size);
      bit.size < this.bitSize && (bit.size += 1);
    });

    // Calculate snake acceleration, velocity, and position
    this.acceleration = this.p5
      .createVector(this.p5.mouseX, this.p5.mouseY)
      .sub(this.position)
      .normalize();

    this.velocity.add(this.acceleration).normalize().mult(4);
    this.position.add(this.velocity);

    // Define snake body
    const angle = this.p5.atan2(this.velocity.y, this.velocity.x);
    const segmentLayout = {
      x: this.position.x,
      y: this.position.y,
      angle,
    };
    this.segments.push(segmentLayout);
    if (this.segments.length - 1 === this.snakeLength) {
      this.segments.shift();
    }

    // Draw snake
    this.segments.forEach((segment, i) => {
      const isHead = i === this.segments.length - 1;
      if (isHead) {
        const foodHitIndex = this.foodHitTest(segment);
        if (foodHitIndex > -1) {
          this.snakeLength += 5;
          this.food[foodHitIndex] = this.generateBit(this.p5);
        }
        if (this.selfHitTest(segment)) {
          this.initGame(this.p5);
        }
      }
      const dims = isHead ? this.snakeWidth + 4 : this.snakeWidth;
      this.p5.push();
      this.p5.rectMode(this.p5.CENTER);
      this.p5.translate(segment.x, segment.y);
      this.p5.rotate(segment.angle);
      this.p5.fill("#57A773");
      this.p5.rect(0, 0, dims, dims);
      this.p5.pop();
    });
  }
}

export default SnakeSketch;
