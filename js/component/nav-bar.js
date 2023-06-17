import * as Vue from "../lib/vue.js";

/**
 * Displays the navigation bar on the top
 */
export const NavBar = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="row">
            <div class="column">
                <nav>
                    <ul>
                        <li v-for="element in elements">
                            <a :href="element.href">{{element.title}}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/nav-bar.css";
    `],

    /* Component data */
    data() {
        return {
            elements: []
        }
    },

    /* Before is ready */
    beforeMount() {
        fetch("json/nav-bar.json", {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => this.elements = json);
    }
});