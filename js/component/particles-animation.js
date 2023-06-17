import * as Vue from "../lib/vue.js";
import {Animation} from "../lib/animation.js";

/**
 * Particles background animation
 */
export const ParticlesAnimation = Vue.defineCustomElement({
    // language=HTML
    template: `
        <canvas class="particles-component"
                ref="canvas"
                :width="width"
                :height="height">
        </canvas>
    `,

    // language=CSS
    styles: [
            `
            @import "css/component/particles-animation.css";
        `
    ],

    /* Properties */
    props: {
        initColor: {
            default: "#000000"
        },
        initBackground: {
            default: "#ffffff"
        },
        initGenerationRate: {
            default: 0.25
        },
        initDirectionRate: {
            default: 0.05
        }
    },

    /* Behavior changes*/
    watch: {
        /**
         *
         * @param newValue
         */
        color: function (newValue,) {
            this.color = newValue;
        },

        /**
         *
         * @param newValue
         */
        width: function (newValue,) {
            this.width = newValue;
        },

        /**
         *
         * @param newValue
         */
        height: function (newValue,) {
            this.height = newValue;
        }
    },

    /* Data */
    data() {
        return {
            /* Size */
            width: window.innerWidth,
            height: window.innerHeight,

            /* Drawing */
            context: null,
            fps: 60,
            background: this.initBackground,
            elements: [],

            /* Particle */
            minEnergy: 10,
            maxEnergy: 100,
            opacityRate: 0.25,
            color: this.initColor,
            generationRate: this.initGenerationRate,
            directionRate: this.initDirectionRate
        }
    },

    /* Methods */
    methods: {
        /**
         *
         */
        animate: function () {
            const start = Date.now();

            this.createParticle() //
                .then(() => this.drawElements()) //
                .then(() => this.drawOvershadow()) //
                .then(() => this.purge()) //
                .then(() => Animation.animationFrame(start, Date.now(), this.fps, this.animate));
        },

        /**
         * Creates a new random particle
         * @returns {Promise<unknown>}
         */
        createParticle: function () {
            return new Promise((resolve) => {
                if (Math.random() <= this.generationRate) {
                    const direction = Math.floor(Math.random() * 4);
                    const x = direction == 0 ? 0 : (direction == 2 ? this.width - 1 : Math.floor(Math.random() * this.width));
                    const y = direction == 1 ? 0 : (direction == 3 ? this.height - 1 : Math.floor(Math.random() * this.height));
                    const energy = Math.floor(Math.random() * (this.maxEnergy - this.minEnergy)) + this.minEnergy;

                    this.elements.push({
                        "type": "particle",
                        "x": x,
                        "y": y,
                        "direction": direction,
                        "energy": energy
                    });
                }

                resolve();
            });
        },

        /**
         * Draws the disappear overshadow
         * @returns {Promise<unknown>}
         */
        drawOvershadow: function () {
            return new Promise((resolve) => {
                this.context.fillStyle = this.background + Math.floor(this.opacityRate * 255).toString(16).padStart(2, "0");
                this.context.fillRect(0, 0, this.width, this.height);

                resolve();
            });
        },

        /**
         * Draws the available elements
         * @returns {Promise<unknown[]>}
         */
        drawElements: function () {
            let promises = [];
            this.elements.forEach((element) => {
                promises.push(new Promise((resolve) => {
                    // Sets the starting point
                    this.context.beginPath();
                    this.context.moveTo(element.x, element.y);

                    // Calculates the next position
                    if (element.direction == 0 || element.direction == 2) {
                        element.x = element.x + (-(element.direction - 1) * element.energy);
                    } else {
                        element.y = element.y + (-(element.direction - 2) * element.energy);
                    }

                    // Draws the movement
                    this.context.lineTo(element.x, element.y);
                    this.context.strokeStyle = this.color;
                    this.context.stroke();

                    if (Math.random() < this.directionRate) {
                        element.direction = (element.direction + (Math.random() < 0.5 ? 1 : 3)) % 4;
                    }

                    resolve();
                }))
            });

            return Promise.all(promises);
        },

        /**
         * Purges offscreen particles
         * @returns {Promise<unknown>}
         */
        purge: function () {
            return new Promise((resolve) => {
                this.elements.forEach((element) => {
                    if (element.type === "particle") {
                        if (element.x <= 0 || element.x >= this.width || element.y <= 0 || element.y >= this.height) {
                            this.elements.splice(this.elements.indexOf(element), 1);
                        }
                    }
                });

                resolve();
            });
        },

        hello: function () {
            console.log("hello world!");
        }
    },

    /* On ready */
    mounted() {
        window.addEventListener("resize", (() => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }));

        this.context = this.$refs.canvas.getContext("2d");
        this.animate();
    }
});