// const gulp = require('gulp');
// const jsmin = require('gulp-jsmin');
// const rename = require('gulp-rename');

const through2 = require('through2').obj;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const templater = require('./src/templater.js');

module.exports = (options) => {
    // Какие-то действия с опциями. Например, проверка их существования,
    // задание значения по умолчанию и т.д.

    return through2(function (file, enc, cb) {
        // Если файл не существует
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        // Если файл представлен потоком
        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-example-plugin', 'Streaming not supported'));
            return;
        }

        const dom = new JSDOM(file.contents.toString('utf8'));
        const virtualDocument = dom.window.document;

        templater.init(virtualDocument, options);

        file.contents = new Buffer(templater.init(virtualDocument, options));

        // Возвращаем обработанный файл для следующего плагина
        this.push(file);
        cb();
    });
};