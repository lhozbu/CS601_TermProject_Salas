import * as Vue from "../library/vue.esm-browser.prod.js";
import * as Utils from "../library/utils.js";

/**
 * Animates text like is glitching
 */
const TextGlitch = Vue.defineCustomElement({
    // language=HTML
    template: `
        <component :is="type" :class="css">{{text}}</component>
    `,
    // language=CSS
    styles: [`
        @import 'css/default.css';
    `],

    /**
     * Initialization properties
     */
    props: {
        initType: {
            default: "h1"
        },
        initText: {
            default: ""
        },
        initCss: {
            default: ""
        },
        initFps: {
            default: 15
        }
    },

    /**
     * Component data
     */
    data() {
        return {
            type: this.initType,
            text: this.initText,
            css: this.initCss,
            fps: this.initFps,

            characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            scramble: 10
        };
    },

    /**
     * Component methods
     */
    methods: {
        /**
         * Animates the text as a glitch
         */
        animate: function () {
            this.glitchText() //
                .then(() => this.restoreText(0));
        },

        /**
         * Animation that restores the text
         * @param position
         */
        restoreText: function (position) {
            if (position <= this.initText.length) {
                const start = Date.now();
                this.text = this.initText.substring(0, position) + this.getRandomCharacters(this.initText.length - position);
                Utils.animationFrame(start, Date.now(), this.fps, this.restoreText, position + 1);
            }
        },

        /**
         * Glitches the text
         * @returns {Promise<unknown>}
         */
        glitchText: function () {
            const start = Date.now();

            return new Promise((resolve) => {
                this.glitchTextAnimation(resolve, 0);
            });
        },

        /**
         * Animation to glitch the text
         * @param resolve
         * @param scramble
         */
        glitchTextAnimation: function (resolve, scramble) {
            if (scramble < this.scramble) {
                const start = Date.now();
                this.text = this.getRandomCharacters(this.initText.length);
                Utils.animationFrame(start, Date.now(), this.fps, this.glitchTextAnimation, resolve, scramble + 1);
            } else {
                resolve();
            }
        },

        /**
         * Obtains a list of random characters of the given length
         * @param length
         * @returns {string}
         */
        getRandomCharacters: function (length) {
            let characters = "";
            while (characters.length < length) {
                characters = characters + this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            }
            return characters;
        }
    },

    /**
     * Action when component is mounted
     */
    mounted() {
        this.animate();
    }
});
customElements.define("text-glitch", TextGlitch);