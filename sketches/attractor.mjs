import SketchP5 from "../modules/sketch_p5.mjs";

class Attractor {
  constructor(p5) {
    this.p5 = p5;
    this.position = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
    this.direction = p5.createVector(0, 0);
    this.mass = p5.random(100);
    let picked = false;
    let mass;
    while (!picked) {
      mass = p5.constrain(p5.randomGaussian(500, 350), 20, 500);
      const b = p5.random(300);
      if (mass < b) {
        picked = true;
      }
    }
    this.mass = mass;
    this.color = ["#144610", "#DB3069", "#F5D547", "#EBEBD3", "#4C4C4B"][
      Math.floor(Math.random() * 5)
    ];
  }
  attract(walker, G) {
    const force = this.position.copy().sub(walker.position);
    const distance = this.p5.constrain(force.mag(), 10, 1000);
    force.normalize();
    const strength = (G * this.mass * walker.mass) / (distance * distance);
    force.mult(strength);
    if (distance <= Math.min(window.innerWidth, window.innerHeight) / 2) {
      this.acceleration.add(force.copy().div(this.mass));
    } else {
      this.acceleration.sub(force.copy().div(this.mass));
    }
  }
  draw() {
    // if (this.p5.mouseX !== 0 && this.p5.mouseY !== 0) {
    //   const mouse = new this.p5.createVector(this.p5.mouseX, this.p5.mouseY);
    //   this.attract(
    //     {
    //       position: mouse,
    //       mass: 1000,
    //     },
    //     0.04
    //   );
    // }
    this.frictionMag = 0.005 * 1;
    this.friction = this.velocity.copy();
    this.friction.mult(-1);
    this.friction.normalize();
    this.friction.mult(this.frictionMag);
    this.acceleration.add(this.friction.copy().div(this.mass));
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, this.mass, this.mass);
  }
}

class AttractorSketch extends SketchP5 {
  setup(p5) {
    SketchP5.prototype.setup.call(this, p5);
    this.attractors = [
      ...Array(Math.round((window.innerWidth + window.innerHeight) / 100) * 2),
    ].map(() => new Attractor(p5));
  }
  draw(p5) {
    p5.clear();
    p5.background(255, 204, 0);
    p5.blendMode(p5.DIFFERENCE);
    p5.noStroke();

    this.attractors.forEach((e) => {
      this.attractors.forEach((f) => {
        if (e !== f) {
          e.attract(f, 0.3);
        }
      });
    });

    this.attractors.forEach((e) => e.draw());
  }
}

export default AttractorSketch;
