(() => {
    const Templater = {
        // function to launch rendering
        // function takes object with templates
        init: function (virtualDocument, options) {
            const tags = options.tags;
            return this.output(virtualDocument, tags, this);
        },

        // function to get parameters from template string
        // function takes template like string
        getTemplateParameters: function (template) {
            const templateParameter = /\{\{(\w+?)\}\}/ig;
            let execResults;
            let templateParameters = [];
            while ((execResults = templateParameter.exec(template)) !== null) {
                templateParameters.push(execResults[1]);
            }
            return templateParameters;
        },

        // function to render new template string with current value of parameters {{...}}
        // function takes array with template parameters, current template and elemnt we want to be replaced
        render: function (templateParameters, renderedTemplate, element) {
            for (let i = 0; i < templateParameters.length; i++) {
                let tempStr = '{{' + templateParameters[i] + '}}';
                if (templateParameters[i] !== 'html') {
                    renderedTemplate = renderedTemplate.replace(tempStr, element.getAttribute(templateParameters[i]));
                } else {
                    renderedTemplate = renderedTemplate.replace(tempStr, element.innerHTML);
                }
            }
            return renderedTemplate;
        },

        // function to replace custom element with ready template
        // function takes element we want to be replaced and ready template like string
        replaceElement: function (element, renderedTemplate) {
            element.outerHTML = renderedTemplate;
        },

        // function to output new valid element to HTML
        // function takes array of holders and object with templates
        output: function (virtualDocument, tags, thisArg) {
            for (let key in tags) {
                let elementsHtml = virtualDocument.getElementsByTagName(key);
                let templateParameters = this.getTemplateParameters(tags[key]);
                [].forEach.call(elementsHtml, function (element) {
                    if (element.getElementsByTagName(key) > 0) {
                        thisArg.output(element, tags, thisArg);
                    }
                    let renderedTemplate = thisArg.render(templateParameters, tags[key], element);
                    thisArg.replaceElement(element, renderedTemplate);
                })
            }
            return virtualDocument.documentElement.outerHTML;
        }
    }

    if (typeof window !== 'undefined') {
        window.Templater = Templater;
    }

    if (typeof module !== 'undefined') {
        module.exports = Templater;
    }

})()