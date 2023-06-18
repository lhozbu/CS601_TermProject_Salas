import * as Vue from "../lib/vue.js";

/**
 * Displays an image gallery
 */
export const ImageGallery = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="gallery-container">
            <figure v-for="image in images">
                <div>
                    <img :src="image.src" :alt="image.caption" @click="openModal($event)">
                </div>
                <figcaption>{{image.caption}}</figcaption>
            </figure>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/image-gallery.css";
    `],

    /* Component properties */
    props: {
        src: {
            type: String,
            default: ""
        }
    },

    /* Component date */
    data() {
        return {
            images: []
        }
    },

    /* Component methods */
    methods: {
        /**
         * Opens a modal displaying the clicked image
         * @param event
         */
        openModal: function (event) {
            const image = event.target;
            const figcaption = image.parentElement.parentElement.querySelector("figcaption");

            const src = image.getAttribute("src");
            const caption = figcaption.textContent;

            const modal = document.createElement("image-modal");
            modal.classList.add("hidden");
            modal.setAttribute("src", src);
            modal.setAttribute("caption", caption);
            document.querySelector("body").append(modal);

            modal.addEventListener("click", () => {
                modal.remove();
            });
        },

        /**
         * Shuffles the list of pictures so they are displayed randomly
         *
         * @param array
         * @returns {void | this | this | this | this | this | this | this | this | this | this | this | this}
         */
        shuffle: function (array) {
            return array.sort(() => 0.5 - Math.random());
        }
    },

    /* Before ready */
    beforeMount() {
        fetch(this.src, {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => {
                this.images = this.shuffle(json);
            });
    }
});