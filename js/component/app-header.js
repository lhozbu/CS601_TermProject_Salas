import * as Vue from "../lib/vue.js";

/**
 * Displays the application header with the navigation
 */
export const AppHeader = Vue.defineCustomElement({
    // language=HTML
    template: `
        <header class="container" ref="header">
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
    `],

    /* Component methods */
    methods: {
        /**
         * Fixes the header to the top
         */
        fix: function () {
            const header = this.$refs.header;
            header.classList.add("fixed");
        },

        /**
         * Removes the fixation and lets it act normally
         */
        unfix: function () {
            const header = this.$refs.header;
            header.classList.remove("fixed");
        }
    },

    /* On ready */
    mounted() {
        const header = this.$refs.header;
        const headerHeight = header.offsetHeight;
        window.addEventListener("scroll", () => {
            if ((window.innerWidth > 800)) {
                if ((window.pageYOffset + headerHeight) > headerHeight) {
                    this.fix();
                } else {
                    this.unfix();
                }
            }
        });
    }
});