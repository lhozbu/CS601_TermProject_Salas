import * as Vue from "../lib/vue.js";
import {Animation} from "../lib/animation.js";

/**
 * Makes the text look glitched
 */
export const GlitchText = Vue.defineCustomElement({
    // language=HTML
    template: `
        <slot ref="slot"></slot>
    `,

    /* Parameters */
    props: {
        recoverRate: {
            type: Number,
            default: 1
        }
    },

    /* Component data */
    data() {
        return {
            /* Animation */
            fps: 60,
            rolls: 10,
            characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

            /* Node */
            position: 0,
            node: null,
            text: null
        }
    },

    /* Methods */
    methods: {
        /**
         * Animates the text
         */
        animate: function () {
            const start = Date.now();
            if (this.rolls > 0) {
                this.node.textContent = this.getRandomCharacters(this.text.length);
                this.rolls = this.rolls - 1;

                Animation.animationFrame(start, Date.now(), this.fps, this.animate);
            } else if (this.position < this.text.length) {
                this.position = this.position + this.recoverRate;

                this.node.textContent = this.position == 0 ? //
                    this.getRandomCharacters(this.text.length) : //
                    this.text.substring(0, this.position) + //
                    (this.position < this.text.length ? //
                        this.getRandomCharacters(this.text.length - this.position) : //
                        "");

                Animation.animationFrame(start, Date.now(), this.fps, this.animate);
            }
        },

        /**
         * Obtains a string of random characters of the given length
         * @param length
         * @returns {string}
         */
        getRandomCharacters: function (length = 1) {
            let characters = "";
            while (characters.length < length) {
                characters = characters + this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }
            return characters;
        }
    },

    /* On component ready */
    mounted() {
        // Loads the text node that is given
        for (let i = 0; i < this.$refs.slot.assignedNodes().length; i++) {
            const node = this.$refs.slot.assignedNodes()[i];
            if (node instanceof HTMLElement) {
                this.text = node.textContent;
                this.node = node;
                break;
            }
        }

        // Starts the animation
        this.animate();
    }
});