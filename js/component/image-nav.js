import * as Background from "../page/index.js";

/**
 * Image navigation component
 */
const ImageNav = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="container image-nav">
            <div class="column" v-for="(item, index) in items" :data-color="item.color">
                <div class="container-image">
                    <img :src="item.image">
                </div>
                <span @click="activate($event)">{{item.text}}</span>
            </div>
        </div>
    `,
    // language=CSS
    styles: [
            `
            @import 'css/default.css';
            @import 'css/image-nav.css';
        `
    ],
    data() {
        return {
            items: [
                {
                    image: "img/components/image-nav/about-me.jpg",
                    text: "About me",
                    color: "#4894C5",
                    href: "https://www.google.com"
                },
                {
                    image: "img/components/image-nav/education.jpg",
                    text: "Education",
                    color: "#ff4a4a",
                    href: "https://www.google.com"
                },
                {
                    image: "img/components/image-nav/experience.jpg",
                    text: "Experience",
                    color: "#ff571d",
                    href: "https://www.google.com"
                },
                {
                    image: "img/components/image-nav/family.jpg",
                    text: "Family",
                    color: "#4aff41",
                    href: "https://www.google.com"
                },
                {
                    image: "img/components/image-nav/videogames.jpg",
                    text: "Videogames",
                    color: "#ea69ff",
                    href: "https://www.google.com"
                },
                {
                    image: "img/components/image-nav/cars.jpg",
                    text: "Cars",
                    color: "#fafa00",
                    href: "https://www.google.com"
                }
            ],
            active: null
        };
    },
    methods: {
        /**
         * Activates the active image<br />
         * The second click will open the page
         * @param event
         */
        activate: function (event) {
            // Obtains the column to be activated
            const column = event.target.parentNode;

            // Checks if it requires to close
            if (this.active !== null && this.active === column) {
                this.close(column);
                this.active = null;
                Background.animation.color = "#000000";
            } else if (this.active !== null) {
                this.close(this.active);
                this.open(column);
                this.active = column;
            } else {
                this.open(column);
                this.active = column;
            }
        },
        /**
         * Opens the indicated column
         * @param column
         */
        open: function (column) {
            column.classList.add("active");
            Background.animation.color = column.dataset.color;
        },
        /**
         * Closes the indicated column
         * @param column
         */
        close: function (column) {
            column.classList.remove("active");
            column.classList.add("inactive");
            setTimeout(() => {
                column.classList.remove("inactive");
            }, 1000);
        }
    }
});
customElements.define("image-nav", ImageNav);