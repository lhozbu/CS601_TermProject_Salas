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
                        <glitch-text>
                            <span>Luis Salas</span>
                        </glitch-text>
                    </div>
                    <div class="column align-right">
                        <a href="javascript:;">
                            <glitch-text recover-rate="2">
                                <span>Phone: +1 (603) 824 2671</span>
                            </glitch-text>
                        </a> |
                        <a href="javascript:;">
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