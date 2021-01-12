const loadExperiment = el => {
	
	let mouseX = null;
	let mouseY = null;
	let started = false;
	let currFrame;
	let pixelArr = [];

	const distance = 15;
	const size = 6.5;

	// Create canvas
	const canvas = document.createElement(`canvas`);
	canvas.style.position = `absolute`;
	canvas.style.top = 0;
	canvas.style.left = 0;
	
	// Canvas resize logic
	const onResize = () => {
		canvas.fillStyle = "#000000";
		canvas.style.width = `${window.innerWidth}px`;
		canvas.style.height = `${window.innerHeight}px`;
		canvas.width = window.innerWidth * window.devicePixelRatio;
		canvas.height = window.innerHeight * window.devicePixelRatio;
	}
	window.addEventListener(`resize`, onResize);
	onResize();
	
	// Insert canvas
	el.appendChild(canvas);
	const ctx = canvas.getContext(`2d`);

	const pxVal = val => val * window.devicePixelRatio;

	const randomDir = () => {
		return [-distance, 0, distance][Math.floor(Math.random() * 3)];
	}

	const randomColor = () => {
		return [
			Math.round(Math.random() * 255),
			Math.round(Math.random() * 255),
			Math.round(Math.random() * 255)
		];
	}

	const clamp = (val, a, b) => {
		if (val < a) {
			return a;
		}
		if (val > b) {
			return b;
		}
		return val;
	}

	const updateColor = (color) => {
		color[0] = clamp(color[0] + randomDir(), 0, 255);
		color[1] = clamp(color[1] + randomDir(), 0, 255);
		color[2] = clamp(color[2] + randomDir(), 0, 255);
		return color;
	}

	// Define drawing logic
	const pathFrame = (x, y, color) => {
		const val = Math.random();
		if (val > .5) {
			x = x + randomDir();
			y = y + randomDir();
		} else {
			if (mouseX > x) {
				x = x + distance;
			} else if (mouseX < x) {
				x = x - distance;
			}
			if (mouseY > y) {
				y = y + distance;
			} else if (mouseY < y) {
				y = y - distance;
			}
		}
		pixelArr.unshift([x, y]);
		if (pixelArr.length > 20) {
			ctx.fillStyle = `#fff`;
			const pixel = pixelArr.pop();
			ctx.fillRect(pxVal(pixel[0]), pxVal(pixel[1]), pxVal(size), pxVal(size));
		}
		ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]}`;
		ctx.fillRect(pxVal(x), pxVal(y), pxVal(size), pxVal(size))
		currFrame = setTimeout(() => pathFrame(x, y, color), 50);
	}

	// Draw on mouse move
	const onMouseMove = (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
		if (!started) {
			started = true;		
			pathFrame(mouseX, mouseY, [0, 0, 0]);
		}
	}

	window.addEventListener(`mousemove`, onMouseMove);

	return () => {
		window.removeEventListener(`resize`, onResize);
		window.removeEventListener(`mousemove`, onMouseMove);
		canvas.remove();
		clearTimeout(currFrame);
	}
}

loadExperiment(document.body)