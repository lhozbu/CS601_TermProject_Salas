import * as Vue from "../lib/vue.js";

/**
 * Displays an image zoomed in
 */
export const ImageModal = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="modal">
            <figure>
                <img :src="src">
                <figcaption>{{caption}}</figcaption>
            </figure>
        </div>
    `,

    // language=CSS
    styles: [
            `
            @import "css/common/default.css";
            @import "css/component/image-modal.css";
        `
    ],

    /* Component properties */
    props: {
        src: {
            type: String,
            default: ""
        },
        caption: {
            type: String,
            default: ""
        }
    }
});