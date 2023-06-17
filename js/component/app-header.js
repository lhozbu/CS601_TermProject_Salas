import * as Vue from "../lib/vue.js";

/**
 * Displays the application header with the navigation
 */
export const AppHeader = Vue.defineCustomElement({
    // language=HTML
    template: `
        <header class="container">
            <div class="container stretch">
                <div class="row">
                    <div class="column">
                        <glitch-text recover-rate="5">
                            <span>Luis Salas - CS601 - Web Application Development</span>
                        </glitch-text>
                    </div>
                    <div class="column align-right">
                        <a href="mailto:lhoz@bu.edu">
                            <glitch-text>
                                <span>Email: lhoz@bu.edu</span>
                            </glitch-text>
                        </a>
                    </div>
                </div>
                <nav-bar></nav-bar>
            </div>
        </header>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/app-header.css";
    `]
});