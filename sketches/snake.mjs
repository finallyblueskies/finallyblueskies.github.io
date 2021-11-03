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
      const boundingBox = {
        left: vec.x,
        top: vec.y,
        right: vec.x + 20,
        bottom: vec.y + 20,
      };
      if (this.hitTest(segment.x, segment.y, boundingBox)) {
        hitIndex = i;
      }
    });
    return hitIndex;
  }
  hitTest(x, y, box) {
    const segXMid = x + 5;
    const segYMid = y + 5;
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
        right: evalSeg.x + 5,
        bottom: evalSeg.y + 5,
      };
      const isHit = this.hitTest(segment.x, segment.y, boundingBox);
      if (isHit) {
        return true;
      }
    }
    return false;
  }
  initGame() {
    this.snakeLength = 5;
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
      x: pos.x,
      y: pos.y,
      size: 0,
    };
  }
  initFood() {
    this.food = [...Array(20)].map(() => this.generateBit());
  }
  draw() {
    this.p5.noStroke();
    this.p5.clear();
    this.p5.background("#DB3069");
    this.food.forEach((bit) => {
      this.p5.fill("#F5D547");
      this.p5.ellipse(bit.x, bit.y, bit.size);
      bit.size < 20 && (bit.size += 1);
    });
    this.acceleration = this.p5
      .createVector(this.p5.mouseX, this.p5.mouseY)
      .sub(this.position)
      .normalize();

    this.velocity.add(this.acceleration).normalize().mult(4);
    this.position.add(this.velocity);

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
    this.segments.forEach((segment, i) => {
      if (i === this.segments.length - 1) {
        const foodHitIndex = this.foodHitTest(segment);
        if (foodHitIndex > -1) {
          this.snakeLength += 5;
          this.food[foodHitIndex] = this.generateBit(this.p5);
        }
        if (this.selfHitTest(segment)) {
          this.initGame(this.p5);
        }
      }
      this.p5.push();
      this.p5.rectMode(this.p5.CENTER);
      this.p5.translate(segment.x, segment.y);
      this.p5.rotate(segment.angle);
      this.p5.fill("white");
      this.p5.rect(0, 0, 10, 10);
      this.p5.pop();
    });
  }
}

export default SnakeSketch;
