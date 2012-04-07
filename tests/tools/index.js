global.debug = console.error.bind(console);
global.print = console.log.bind(console);
var fs = global.fs = require('fs');

global.Analyzer = require('../../src/pitch.js');
global.WavReader = require('./wavreader.js');

global.format_float = function (n) {
	var s = String(Math.round(n * 1e6));
	var p = s[0] === '-' ? '-' : '';
	if (!n) return p + "0.000000";
	s = p ? s.substring(1) : s; 
	s = ((n > 0 ? n < 1 : n > -1) ? '0' : '') ? '0' + s : s;
	return p + s.substring(0, s.length - 6) + '.' + s.substring(s.length - 6);
};

global.die = function (code) {
	debug.apply(null, [].slice.call(arguments, 1));
	process.exit(code || 0);
};

global.read = function (path, encoding) {
	return fs.readFileSync(path, arguments.length === 1 ? 'UTF-8' : encoding);
};

global.write = function (path, data, encoding) {
	return fs.writeFileSync(path, data, arguments.length === 2 ? 'UTF-8' : encoding);
};

var ProgressBar;

try {
	ProgressBar = require('progress-bar');
} catch (e) {}

var pb;

global.updateProgress = function (value) {
	if (!ProgressBar) return;

	if (!pb) {
		pb = ProgressBar.create(process.stderr, 50);
		pb.format = "$bar; $percentage;% complete.";
	}

	pb.update(value);
};