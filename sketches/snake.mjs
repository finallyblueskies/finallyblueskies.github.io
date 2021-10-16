import SketchP5 from "../modules/sketch_p5.mjs";

class SnakeSketch extends SketchP5 {
  setup(p5) {
    SketchP5.prototype.setup.call(this, p5);
    this.initGame(p5);
  }
  randomLoc(p5) {
    return p5.createVector(p5.random(p5.width), p5.random(p5.height));
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
  initGame(p5) {
    this.snakeLength = 5;
    this.position = this.randomLoc(p5);
    this.acceleration = p5.createVector(0, 0);
    this.velocity = p5.createVector(0, 0);
    this.segments = [];
    this.initFood(p5);
  }
  generateBit(p5) {
    const pos = this.randomLoc(p5);
    return {
      x: pos.x,
      y: pos.y,
      size: 0,
    };
  }
  initFood(p5) {
    this.food = [...Array(5)].map(() => this.generateBit(p5));
  }
  draw(p5) {
    p5.noStroke();
    p5.clear();
    p5.background("#DB3069");
    this.food.forEach((bit) => {
      p5.fill("#F5D547");
      p5.ellipse(bit.x, bit.y, bit.size);
      bit.size < 20 && (bit.size += 1);
    });
    this.acceleration = p5
      .createVector(p5.mouseX, p5.mouseY)
      .sub(this.position)
      .normalize();
    this.velocity.add(this.acceleration);
    this.velocity.x = p5.constrain(this.velocity.x, -5, 5);
    this.velocity.y = p5.constrain(this.velocity.y, -5, 5);
    this.position.add(this.velocity);

    const angle = p5.atan2(this.velocity.y, this.velocity.x);
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
          this.food[foodHitIndex] = this.generateBit(p5);
        }
        if (this.selfHitTest(segment)) {
          this.initGame(p5);
        }
      }
      p5.push();
      p5.rectMode(p5.CENTER);
      p5.translate(segment.x, segment.y);
      p5.rotate(segment.angle);
      p5.fill("white");
      p5.rect(0, 0, 10, 10);
      p5.pop();
    });
  }
}

export default SnakeSketch;
