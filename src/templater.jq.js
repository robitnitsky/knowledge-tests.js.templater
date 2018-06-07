(function ($) {

    // function to launch templater
    // function takes jquery holder object and object with templates
    function init(elements, options) {
        const tags = options.tags;
        output(elements, tags);
    }

    // function to get parameters from template like {...}
    // function takes template like a string
    function getTemplateParameters(template) {
        const templateParameter = /\{\{(\w+?)\}\}/ig;
        let execResults;
        let templateParameters = [];
        while ((execResults = templateParameter.exec(template)) !== null) {
            templateParameters.push(execResults[1]);
        }
        return templateParameters;
    }

    // function to render template with actual parameters
    // function takes array of parameters, template we need to render and custom element we get parameters values from
    function render(templateParameters, renderedTemplate, element) {
        for (let i = 0; i < templateParameters.length; i++) {
            let tempStr = '{{' + templateParameters[i] + '}}';
            if ($(element).attr(templateParameters[i])) {
                renderedTemplate = renderedTemplate.replace(tempStr, element.getAttribute(templateParameters[i]));
            } else {
                renderedTemplate = renderedTemplate.replace(tempStr, element.innerHTML);
            }
        }
        return renderedTemplate;
    }

    // function to replace custom element with valid element
    function replaceElement(element, renderedTemplate) {
        element.outerHTML = renderedTemplate;
    }

    // function to output ready valid element to HTML
    // function takes holder elements like jquery object and object with templates
    function output(elements, tags) {
        for (let key in tags) {
            let elementsHtml = elements.find('>' + key);
            let templateParameters = getTemplateParameters(tags[key]);
            elementsHtml.each(function (index, element) {
                if ($(element).find('>' + key).length !== 0) {
                    output($(element), tags);
                }
                replaceElement(element, render(templateParameters, tags[key], element));
            })
        }
    }

    // add templater to JQuery
    $.fn.templater = function (options) {
        return init(this, options);
    };

})(jQuery)