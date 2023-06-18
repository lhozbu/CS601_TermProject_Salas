import * as Vue from "../lib/vue.js";

/**
 * Displays the image navigation
 */
export const ImageNav = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="row">
            <div class="column" v-for="element in elements" ref="element" :data-color="element.color">
                <figure>
                    <a :href="element.href">
                        <img :src="element.image" alt="Navigation Image">
                    </a>
                    <figcaption @click="activate($event)">{{element.text}}</figcaption>
                </figure>
            </div>
        </div>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/image-nav.css";
    `],

    /* Component data */
    data() {
        return {
            elements: []
        }
    },

    /* Component methods */
    methods: {
        /**
         * Activates a navigation element
         * @param event
         */
        activate: function (event) {
            // Obtains the column that has been triggered
            const triggeredColumn = event.target.closest(".column");

            // Checks if is a turn-off of itself
            if (triggeredColumn.classList.contains("active")) {
                // Removes the class
                triggeredColumn.classList.replace("active", "inactive");
                setTimeout(() => triggeredColumn.classList.remove("inactive"), 500);

                // // Restores the particles
                const particlesAnimation = document.querySelector("particles-animation")._instance;
                particlesAnimation.data.color = particlesAnimation.props.initColor;
                particlesAnimation.data.generationRate = particlesAnimation.props.initGenerationRate;
                particlesAnimation.data.directionRate = particlesAnimation.props.initDirectionRate;
            } else {
                // Obtains the columns and turns them off if needed
                const elements = this.$refs.element;
                elements.forEach((element) => {
                    if (element.classList.contains("active")) {
                        element.classList.replace("active", "inactive");
                        setTimeout(() => element.classList.remove("inactive"), 500);
                    }
                });

                // Activates the column
                triggeredColumn.classList.add("active");

                // Alters the particles
                const particlesAnimation = document.querySelector("particles-animation")._instance;
                particlesAnimation.data.color = triggeredColumn.dataset.color;
                particlesAnimation.data.generationRate = 0.75;
                particlesAnimation.data.directionRate = 0.25;
            }
        }
    },

    /* Before is ready */
    beforeMount() {
        fetch("json/image-nav.json", {
            method: "get",
            accept: "application/json"
        }).then((response) => response.json()) //
            .then((json) => this.elements = json);
    }
});