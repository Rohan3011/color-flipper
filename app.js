

const btn = document.getElementById('btn');
const items = document.querySelectorAll('.item');
const copyButtons = document.querySelectorAll('.copy-btn');



// Generates colors
class ColorGenerator {
	FULL = 100;
	HEXADECIMAL = 16;
	LIMIT = 255;

	createColor() {
		const Hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
		let color = '#';
		// Hex code of 6 characters
		for (let i = 0; i < 6; i++) {
			color += Hex[this.getRandomNumber(0, this.HEXADECIMAL)];
		}
		return color;
	}

	// Generates different shades of a color
	shadeColor(color, percent) {
		if (percent === undefined)
			percent = this.getRandomNumber(-1 * this.FULL, this.FULL);

		let R = parseInt(color.substring(1, 3), this.HEXADECIMAL);
		let G = parseInt(color.substring(3, 5), this.HEXADECIMAL);
		let B = parseInt(color.substring(5, 7), this.HEXADECIMAL);

		R = parseInt(R * (this.FULL + percent) / this.FULL);
		G = parseInt(G * (this.FULL + percent) / this.FULL);
		B = parseInt(B * (this.FULL + percent) / this.FULL);

		R = (R < this.LIMIT) ? R : this.LIMIT;
		G = (G < this.LIMIT) ? G : this.LIMIT;
		B = (B < this.LIMIT) ? B : this.LIMIT;

		let RR = ((R.toString(this.HEXADECIMAL).length == 1) ? "0" + R.toString(this.HEXADECIMAL) : R.toString(this.HEXADECIMAL));
		let GG = ((G.toString(this.HEXADECIMAL).length == 1) ? "0" + G.toString(this.HEXADECIMAL) : G.toString(this.HEXADECIMAL));
		let BB = ((B.toString(this.HEXADECIMAL).length == 1) ? "0" + B.toString(this.HEXADECIMAL) : B.toString(this.HEXADECIMAL));

		return "#" + RR + GG + BB;
	}

	//utility function
	getRandomNumber(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}
}



const colorGenerator = new ColorGenerator();
btn.addEventListener('click', function () {
	setNewColor();
})



function setNewColor() {
	const baseColor = colorGenerator.createColor();
	const shades = [100, 45, 0, -40];
	let i = 0;
	items.forEach(item => {
		const color = colorGenerator.shadeColor(baseColor, shades[i++]);
		item.style.backgroundColor = color;
		for (let child of item.children) {
			if (child.className == "text") {
				child.innerText = color;
			}
		}
	})
}



// Copy to Clipboard
copyButtons.forEach(copybutton => {
	copybutton.addEventListener('click', function () {
		const text = this.parentNode.getElementsByClassName('text')[0];
		copyToClipboard(text.innerText);

	})
});


function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	alert("Copied the text: " + text);
}


