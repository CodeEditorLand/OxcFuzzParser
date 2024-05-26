const { fuzz } = require("./fuzz");

const fs = require("fs");
const { exec } = require("child_process");
const binary = process.argv[2];

if (!binary) {
	console.log("Please provide a binary.");
	return
}

const file = "__tmp.js";
const fn = (src) => {
	fs.writeFileSync(file, src, "utf8");
	return new Promise((res, rej) => {
		exec(binary + " " + file, {}, (err, _stdout, stderr) => {
			if (err == null) {
				res();
			} else {
				rej(new Error(stderr));
			}
		});
	});
};

const known = [];

fuzz(fn, 200_000, known);
