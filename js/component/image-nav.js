import * as Vue from "../library/vue.esm-browser.prod.js";

/**
 * Image navigation component
 */
const ImageNav = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="row stretch margin-y-20 image-nav">
            <div class="column" v-for="(item, index) in items" :data-color="item.color">
                <figure>
                    <img :src="item.image">
                    <figcaption>{{item.text}}</figcaption>
                </figure>
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

    /**
     * Data of the component
     */
    data() {
        return {
            items: [
                {
                    image: "img/image-nav/about-me.jpg",
                    text: "About me",
                    color: "#4894C5",
                    href: "https://www.google.com"
                },
                {
                    image: "img/image-nav/education.jpg",
                    text: "Education",
                    color: "#ff4a4a",
                    href: "https://www.google.com"
                },
                {
                    image: "img/image-nav/experience.jpg",
                    text: "Experience",
                    color: "#ff571d",
                    href: "https://www.google.com"
                },
                {
                    image: "img/image-nav/family.jpg",
                    text: "Family",
                    color: "#4aff41",
                    href: "https://www.google.com"
                },
                {
                    image: "img/image-nav/videogames.jpg",
                    text: "Videogames",
                    color: "#ea69ff",
                    href: "https://www.google.com"
                },
                {
                    image: "img/image-nav/cars.jpg",
                    text: "Cars",
                    color: "#fafa00",
                    href: "https://www.google.com"
                }
            ],
            active: null
        };
    }
});
customElements.define("image-nav", ImageNav);