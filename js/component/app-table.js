import * as Vue from "../lib/vue.js";

/**
 * Displays an application data driven table
 */
export const AppTable = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="table-container">
            <table>
                <thead>
                <tr>
                    <th v-for="(header, index) in configuration.headers" :class="configuration.classes[index]">{{header}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in configuration.rows">
                    <td v-for="(cell, index) in row" :class="(cell.constructor === {}.constructor ? 'align-center ' : ' ') + configuration.classes[index]">
                        <span v-if="cell.constructor !== {}.constructor">{{cell}}</span>
                        <figure v-else>
                            <img :src="cell.img">
                            <figcaption>{{cell.caption}}</figcaption>
                        </figure>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/app-table.css";
    `],

    /* Component properties */
    props: {
        src: {
            type: String,
            default: ""
        }
    },

    /* Component data */
    data() {
        return {
            configuration: {}
        }
    },

    /* Before ready */
    beforeMount() {
        fetch(this.src, {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => this.configuration = json);
    }
});