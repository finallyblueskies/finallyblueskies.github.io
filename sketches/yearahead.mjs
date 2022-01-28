import Sketch from "../modules/sketch.mjs";

class ProjectYearaheadSketch extends Sketch {
  constructor(...args) {
    super(...args);

    this.container = document.createElement("section");
    this.container.classList.add("yearahead__container");
    const inner = document.createElement("div");
    inner.classList.add("yearahead__inner");

    const img = document.createElement("img");
    img.src = "./yearahead_logo.svg";
    img.classList.add("yearahead__logo");

    const description = document.createElement("p");
    description.innerHTML =
      "I designed and built YearAhead to be a slick, simple financial projection tool that allows you to define assets, monthly incomes and expenses, as well as any upcoming one offs for a quick overview of where you are in relation to your financial goals. Includes offline mode, a Truelayer integration for connecting bank accounts, and a UI crafted to not compromise any device's UX.";
    description.classList.add("yearahead__description");

    const cta = document.createElement("button");
    cta.innerHTML = "Visit";
    cta.classList.add("yearahead__cta");
    cta.classList.add("button");
    cta.classList.add("is-primary");
    cta.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open("https://yearahead.vercel.app/");
    });
    inner.appendChild(img);
    inner.appendChild(description);
    inner.appendChild(cta);
    this.container.appendChild(inner);
    this.el.appendChild(this.container);
  }
  destroy() {
    Sketch.prototype.destroy.call(this);
    this.container.remove();
  }
}

export default ProjectYearaheadSketch;
