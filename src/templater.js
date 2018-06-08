(() => {
    const Templater = {

        init: function (parentNode, options) {
            return this.output(parentNode, options.tags);
        },

        getTemplateParameters: function (template) {
            const templateParameter = /\{\{(\w+?)\}\}/ig;
            let execResults;
            let templateParameters = [];
            while ((execResults = templateParameter.exec(template)) !== null) {
                templateParameters.push(execResults[1]);
            }
            return templateParameters;
        },

        render: function (renderedTemplate, element) {
            let templateParameters = this.getTemplateParameters(renderedTemplate);
            templateParameters.forEach(function(parameter){
                if (parameter !== 'html') {
                    renderedTemplate = renderedTemplate.replace(`{{${parameter}}}`, element.getAttribute(parameter));
                } else {
                    renderedTemplate = renderedTemplate.replace(`{{${parameter}}}`, element.innerHTML);
                }
            });
            return renderedTemplate;
        },

        replaceElement: function (element, renderedTemplate) {
            element.outerHTML = renderedTemplate;
        },

        output: function (parentNode, tags) {
            let self = this;
            console.log(parentNode);
            if (parentNode.documentElement) {
                parentNode = parentNode.documentElement;
            }
            for (let key in tags) {
                let elementsHtml = parentNode.querySelectorAll(key);
                [].forEach.call(elementsHtml, function (element) {
                    if (element.querySelectorAll(Object.keys(tags).join(',')).length) {
                        self.output(element, tags);
                    }
                    self.replaceElement(element, self.render(tags[key], element));
                })
            }
            return parentNode.outerHTML;
        }
    }

    if (typeof window !== 'undefined') {
        window.Templater = Templater;
    }

    if (typeof module !== 'undefined') {
        module.exports = Templater;
    }

})()