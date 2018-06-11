(function ($) {
    
    $.fn.templater = function (options) {
        return Templater.init(this[0], options);
    }

})(jQuery)