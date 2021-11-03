class Sketch {
  constructor(el) {
    this.el = el;
    this.ro = new ResizeObserver((entries) =>
      entries.forEach(({ contentRect: { width, height } }) =>
        this.onResize(width, height)
      )
    );
    this.ro.observe(this.el);
  }
  onResize() {}
  destroy() {
    this.ro.disconnect();
  }
}

export default Sketch;
