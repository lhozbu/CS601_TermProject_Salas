import * as Vue from "../library/vue.esm-browser.prod.js";
import * as Utils from "../library/utils.js";

/**
 * Particle background animation
 * @type {VueCustomElement}
 */
const ParticleAnimation = Vue.defineCustomElement({
    // language=HTML
    template: `
        <canvas ref="canvas" :width="width" :height="height"></canvas>
    `,

    // language=CSS
    styles: [`
        canvas {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
        }
    `],

    /**
     * Initialization properties
     */
    props: {
        initColor: {
            default: "#000000"
        }
    },

    /**
     * Data of the component
     */
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,

            context: null,
            fps: 60,

            background: "#ffffff",
            opacityRate: 0.1,
            generationRate: 0.1,
            directionChangeRate: 0.05,

            minEnergy: 5,
            maxEnergy: 50,

            generations: false,
            wallCollisions: false,
            particlesCollisions: false,

            particleColor: this.initColor,
            generationColor: this.initColor,
            collisionColor: this.initColor,

            elements: []
        }
    },

    /**
     * Behavior observers
     */
    watch: {
        /**
         * For color changes
         * @param newValue
         * @param oldValue
         */
        initColor: function (newValue, oldValue) {
            this.particleColor = newValue;
            this.generationColor = newValue;
            this.collisionColor = newValue;
        }
    },

    /**
     * Component methods
     */
    methods: {
        /**
         * Animates the canvas
         */
        animate: function () {
            const start = Date.now();

            this.createParticle() //
                .then(() => this.drawElements()) //
                .then(() => this.drawOvershadow()) //
                .then(() => this.detectCollisions()) //
                .then(() => {
                    const end = Date.now();
                    Utils.animationFrame(start, end, this.fps, this.animate);
                });
        },

        /**
         * Generates a new element based on probability
         */
        createParticle: function () {
            return new Promise((resolve) => {
                if (Math.random() <= this.generationRate) {
                    const position = Math.floor(Math.random() * 4);
                    const positionX = position == 0 ? 0 : (position == 2 ? this.width - 1 : Math.floor(Math.random() * this.width));
                    const positionY = position == 1 ? 0 : (position == 3 ? this.height - 1 : Math.floor(Math.random() * this.height));

                    const energyLevel = Math.floor(Math.random() * (this.maxEnergy - this.minEnergy)) + this.minEnergy;

                    if (this.generations) {
                        this.elements.push({
                            type: "generation",
                            x: positionX,
                            y: positionY,
                            direction: position,
                            maxEnergy: energyLevel,
                            energy: 0
                        });
                    } else {
                        this.elements.push({
                            type: "particle",
                            x: positionX,
                            y: positionY,
                            direction: position,
                            energy: energyLevel
                        });
                    }
                }

                resolve();
            });
        },

        /**
         * Draws the available elements
         */
        drawElements: function () {
            let promises = [];
            this.elements.forEach((element) => {
                if (element.type === "generation") {
                    promises.push(this.drawGeneration(element));
                } else if (element.type === "particle") {
                    promises.push(this.drawParticle(element));
                } else if (element.type === "collision") {
                    promises.push(this.drawCollision(element));
                }
            });

            return Promise.all(promises);
        },

        /**
         * Draws a generation element
         * @param element
         */
        drawGeneration: function (element) {
            return new Promise((resolve) => {
                // Adjusts the radius
                element.energy = element.energy + 1;

                // Checks if is already on limit
                if (element.energy <= element.maxEnergy) {
                    // Draws
                    this.context.strokeStyle = this.generationColor;
                    this.context.beginPath();
                    this.context.arc(element.x, element.y, (element.maxEnergy - element.energy), 0, 2 * Math.PI);
                    this.context.stroke();
                } else {
                    // Removes the generation and pushes a particle
                    this.elements.splice(this.elements.indexOf(element), 1);
                    this.elements.push({
                        type: "particle",
                        x: element.x,
                        y: element.y,
                        direction: element.direction,
                        energy: element.maxEnergy
                    });
                }

                resolve();
            });
        },

        /**
         * Draws a particle element
         * @param element
         */
        drawParticle: function (element) {
            return new Promise((resolve) => {
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
                this.context.strokeStyle = this.particleColor;
                this.context.stroke();

                if (Math.random() < this.directionChangeRate) {
                    element.direction = (element.direction + (Math.random() < 0.5 ? 1 : 3)) % 4;
                }

                resolve();
            });
        },

        /**
         * Draws a collision element
         * @param element
         */
        drawCollision: function (element) {
            new Promise((resolve) => {
                // Adjusts the radius
                element.releasedEnergy = element.releasedEnergy + 1;

                // Checks if is already on limit
                if (element.releasedEnergy < element.energy) {
                    // Draws
                    this.context.strokeStyle = this.collisionColor;
                    this.context.beginPath();
                    this.context.arc(element.x, element.y, element.releasedEnergy, 0, 2 * Math.PI);
                    this.context.stroke();
                } else {
                    // Removes the collision
                    this.elements.splice(this.elements.indexOf(element), 1);
                }

                resolve();
            });
        },

        /**
         * Draws an overshadow to give movement effect
         */
        drawOvershadow: function () {
            return new Promise((resolve) => {
                this.context.fillStyle = this.background + Math.floor(this.opacityRate * 255).toString(16).padStart(2, "0");
                this.context.fillRect(0, 0, this.width, this.height);

                resolve();
            });
        },

        /**
         * Draws a clean background
         */
        drawBackground: function () {
            this.context.fillStyle = this.background;
            this.context.fillRect(0, 0, this.width, this.height);
        },

        /**
         * Detects the collisions
         */
        detectCollisions: function () {
            this.detectWallCollisions();
            this.detectParticlesCollisions();
        },

        /**
         * Detects collisions against walls
         */
        detectWallCollisions: function () {
            this.elements.forEach((element) => {
                if (element.type === "particle") {
                    if (element.x <= 0 || element.x >= this.width || element.y <= 0 || element.y >= this.height) {
                        this.elements.splice(this.elements.indexOf(element), 1);

                        if (this.wallCollisions) {
                            this.elements.push({
                                type: "collision",
                                x: element.x <= 0 ? 0 : (element.y <= 0 || element.y >= this.height ? element.x : this.width - 1),
                                y: element.y <= 0 ? 0 : (element.x <= 0 || element.x >= this.width ? element.y : this.height - 1),
                                energy: element.energy,
                                releasedEnergy: 0
                            });
                        }
                    }
                }
            });
        },

        /**
         * Detects collisions between mutiple particles
         */
        detectParticlesCollisions: function () {
            for (let a = 0; a < this.elements.length; a++) {
                const particleA = this.elements[a];
                if (particleA.type === "particle") {
                    for (let b = a + 1; b < this.elements.length; b++) {
                        const particleB = this.elements[b];
                        if (particleB.type === "particle") {
                            if (particleA.x == particleB.x && particleA.y == particleB.y) {
                                this.elements.splice(b, 1);
                                this.elements.splice(a, 1);

                                if (this.particlesCollisions) {
                                    this.elements.push({
                                        type: "collision",
                                        x: particleA.x,
                                        y: particleA.y,
                                        energy: particleA.energy + particleB.energy,
                                        releasedEnergy: 0
                                    });
                                }
                            }
                        }
                    }
                }
            }
        },

        /**
         * Reactively resizes the canvas
         */
        resize: function () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        }
    },

    /**
     * Action when element is mounted
     */
    mounted() {
        // Windows resize listener
        const self = this;
        window.addEventListener("resize", function () {
            self.resize();
        });

        // Context and animation
        this.context = this.$refs.canvas.getContext("2d");
        this.drawBackground();
        this.animate();
    }
});
customElements.define("particle-animation", ParticleAnimation);