import * as Vue from "../library/vue.js";

/**
 * Image navigation component
 */
export const ImageNav = Vue.defineCustomElement({
    // language=HTML
    template: `
        <div class="row stretch margin-y-20 image-nav">
            <div ref="column" class="column" v-for="(item, index) in items" :data-color="item.color"
                 :data-generation="item.generation" :data-direction="item.direction">
                <figure>
                    <img :src="item.image">
                    <figcaption @click="activate($event)">{{item.text}}</figcaption>
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
            items: [],
            active: null
        };
    },

    /**
     * Component methods
     */
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

                // Restores the particles
                this.restoreParticles();
            } else {
                // Obtains the columns and turns them off if needed
                const columns = this.$refs.column;
                columns.forEach((column) => {
                    if (column.classList.contains("active")) {
                        column.classList.replace("active", "inactive");
                        setTimeout(() => column.classList.remove("inactive"), 500);
                    }
                });

                // Activates the column
                triggeredColumn.classList.add("active");

                // Alters the particles
                const color = triggeredColumn.dataset.color;
                const generation = triggeredColumn.dataset.generation;
                const direction = triggeredColumn.dataset.direction;
                this.alterParticles(color, generation, direction);
            }
        },

        /**
         * Alters the particles behavior
         * @param color
         * @param generation
         * @param direction
         */
        alterParticles: function (color, generation, direction) {
            const particleAnimation = document.querySelector("particle-animation");
            particleAnimation._instance.data.color = color;
            particleAnimation._instance.data.generationRate = generation;
            particleAnimation._instance.data.directionChangeRate = direction;
        },

        /**
         * Restores the particles behavior
         */
        restoreParticles: function () {
            const particleAnimation = document.querySelector("particle-animation");
            particleAnimation._instance.data.color = particleAnimation._instance.data.defaultColor;
            particleAnimation._instance.data.generationRate = particleAnimation._instance.data.defaultGenerationRate;
            particleAnimation._instance.data.directionChangeRate = particleAnimation._instance.data.defaultDirectionChangeRate;
        }
    },

    /**
     * Called before the UI is mounted
     */
    beforeCreate() {
        fetch("json/image-nav.json", {
            method: "get",
            accept: "applicaiton/json"
        }) //
            .then((response) => response.json()) //
            .then((json) => this.items = json);
    }
});
customElements.define("image-nav", ImageNav);