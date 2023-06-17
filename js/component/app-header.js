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
            if ((window.pageYOffset + headerHeight) > headerHeight) {
                this.fix();
            } else {
                this.unfix();
            }
        });
    }
});