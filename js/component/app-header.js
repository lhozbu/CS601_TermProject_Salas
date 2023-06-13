import * as Vue from "../library/vue.esm-browser.prod.js";

/**
 * Application header
 * @type {VueCustomElement}
 */
const AppHeader = Vue.defineCustomElement({
    // language=HTML
    template: `
        <header class="row background-primary">
            <div class="column">
                <div class="row stretch">
                    <span class="column">Luis Salas</span>
                    <span class="column align-right">
                <a href="sms:+16038242671">Phone: +1 (603) 824 2671</a> |
                <a href="mail:lhozdroid@gmail.com">Email: lhoz@bu.edu</a>
            </span>
                </div>
            </div>
        </header>
    `,

    // language=CSS
    styles: [`
        @import 'css/default.css';
    `]
});
customElements.define("app-header", AppHeader);