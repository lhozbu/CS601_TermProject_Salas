/**
 * Animates text like is glitching
 */
const TextGlitch = Vue.defineCustomElement({
    // language=HTML
    template: `
        <component :is="element" :class="css">{{text}}</component>
    `,
    // language=CSS
    styles: [`
        @import 'css/default.css';
    `],
    props: {
        initElement: {
            default: "h1"
        },
        initText: {
            default: ""
        },
        initCss: {
            default: ""
        },
        initCharacters: {
            default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        },
        initFramesPerSecond: {
            default: 15
        },
        initAnimationFrames: {
            default: 10
        }
    },
    data() {
        return {
            element: this.initElement,
            text: this.initText,
            css: this.initCss,
            characters: this.initCharacters,
            framesPerSecond: this.initFramesPerSecond,
            animationFrames: this.initAnimationFrames
        };
    },
    methods: {
        /**
         * Animates the text as a glitch
         */
        animate: function () {
            this.glitchTextAnimation().then(() => this.restoreTextAnimation());
        },

        /**
         * Restores the text
         */
        restoreTextAnimation: function () {
            let position = 0;
            const animation = setInterval(() => {
                this.text = this.initText.substring(0, position) + this.getRandomCharacters(this.initText.length - position);
                position++;
                if (position > this.initText.length) {
                    clearInterval(animation);
                }
            }, Math.floor(1000 / this.framesPerSecond));
        },

        /**
         * Glitches the text
         * @returns {Promise<unknown>}
         */
        glitchTextAnimation: function () {
            return new Promise((resolve) => {
                let frame = 0;
                const animation = setInterval(() => {
                    this.text = this.getRandomCharacters(this.initText.length);

                    frame++;
                    if (frame >= this.animationFrames) {
                        clearInterval(animation);
                        resolve();
                    }
                }, Math.floor(1000 / this.framesPerSecond));
            });
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
    mounted() {
        this.animate();
    }
});
customElements.define("text-glitch", TextGlitch);