abstract class Component extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).appendChild(this.getTemplateElement().content.cloneNode(true));

    }

    /**
     * Calls getHTML for updating the dom
     *
     * @memberof Component
     */
    update() {
        this.shadowRoot.innerHTML = this.getHTML();
        this.registerCallBack();
    }

    connectedCallback() {
        this.registerCallBack();

    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    private getTemplateElement(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
    /**
     * Returns the HTML from which a template shall be created
     */
    abstract getHTML(): string;

    /**
     *
     *
     * @memberof Component
     */
    registerCallBack() {

    }


    static html(literals: TemplateStringsArray, ...placeholders: string[]): string {
        let result = "";

        // interleave the literals with the placeholders
        for (let i = 0; i < placeholders.length; i++) {
            result += literals[i];
            if (typeof placeholders[i] !== 'undefined') {
                result += placeholders[i]
                    .replace(/&/g, '&amp;')
                    //.replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                //.replace(/</g, '&lt;')
                //.replace(/>/g, '&gt;');
            } else {
                result += placeholders[i];
            }
        }

        // add the last literal
        result += literals[literals.length - 1];
        return result;
    }
}
export { Component };
