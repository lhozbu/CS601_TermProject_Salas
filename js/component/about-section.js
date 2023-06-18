import * as Vue from "../lib/vue.js";

/**
 * Displays the about section
 */
export const AboutSection = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="container">
            <div class="container stretch">
                <div class="background" ref="background"></div>
                <div class="row">
                    <div class="column">
                        <section>
                            <h2>{{section.title}}</h2>
                            <figure>
                                <img :src="section.img" :alt="section.title">
                                <figcaption>{{section.caption}}</figcaption>
                            </figure>
                            <p v-for="paragraph in section.paragraphs">{{paragraph}}</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/about-section.css";
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
            section: {}
        }
    },

    /* Before initialization */
    beforeMount() {
        fetch(this.src, {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => {
                this.section = json;
                this.$refs.background.style.backgroundImage = "url('" + this.section.background + "')";
            });
    }
});