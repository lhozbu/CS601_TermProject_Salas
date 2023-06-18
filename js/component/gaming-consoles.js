import * as Vue from "../lib/vue.js";

/**
 * Displays the list of gaming consoles
 */
export const GamingConsoles = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="align-center">
            <details v-for="console in consoles">
                <summary>{{console.title}}</summary>
                <div class="row">
                    <div class="column">
                        <figure>
                            <img :src="console.img" :alt="console.title">
                            <figcaption>
                                {{console.caption}}
                                <cite>{{console.cite}}</cite>
                            </figcaption>
                        </figure>
                        <p>{{console.description}}</p>
                        <ul class="list-plain">
                            <li v-for="game in console.games">{{game}}</li>
                        </ul>
                    </div>
                </div>
            </details>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/gaming-consoles.css";
    `],

    /* Component properties */
    props: {
        src: {
            type: String,
            default: ""
        }
    },

    /** Component data */
    data() {
        return {
            consoles: []
        }
    },

    /* Before loaded */
    beforeMount() {
        fetch(this.src, {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => this.consoles = json);
    }
});