// const gulp = require('gulp');
// const jsmin = require('gulp-jsmin');
// const rename = require('gulp-rename');

const through2 = require('through2').obj;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const templater = require('./src/templater.js');

module.exports = (options) => {
    
    return through2(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
            return;
        }
        // define virtual DOM
        const dom = new JSDOM(file.contents.toString('utf8'));
        // define document from virtual DOM
        const virtualDocument = dom.window.document;

        // change content of file with result of templater
        file.contents = new Buffer(templater.init(virtualDocument, options));

        this.push(file);
        cb();
    });
};