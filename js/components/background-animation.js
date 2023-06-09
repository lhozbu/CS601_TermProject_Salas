import * as Utils from '../utils.js';

/**
 * Background electron animation<br />
 * Creates on pure JavaScript without vue because canvas doesn't like to update on vue
 */
class BackgroundAnimation {
    #canvas = null;
    #width = 0;
    #height = 0;

    #config = {
        general: {
            fps: 60,
            background: "#ffffff",
            opacity: 0.1
        },
        electron: {
            color: "#000000",
            advance: 10,
            spawn: 0.2,
            redirection: 0.01
        },
        collision: {
            electron: {
                size: 100,
                speed: 10,
                color: "#000000"
            },
            wall: {
                size: 10,
                speed: 1,
                color: "#000000"
            }
        }
    }

    #electrons = [];
    #collisions = [];

    /**
     *
     * @param color
     */
    set color(color){
        this.#config.electron.color = color;
        this.#config.collision.electron.color = color;
        this.#config.collision.wall.color = color;
    }

    /**
     *
     */
    constructor() {
        this.#drawCanvas();
        window.addEventListener("resize", () => this.#resize());
    }

    /**
     *
     */
    #resize() {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;

        this.#canvas.width = this.#width;
        this.#canvas.height = this.#height;
    }

    /**
     *
     */
    start() {
        // Draws the solid background
        this.#overshadow(false);

        setInterval(() => {
            // Spawns an electron by probability
            this.#spawn();

            // Reduces the opacity of everything drawn
            this.#overshadow();

            // Draws the elements
            this.#drawElectrons() //
                .then(() => {
                    this.#detectCollisions();
                    this.#drawCollisions();
                });
        }, Math.floor(1000 / this.#config.fps));
    }

    /**
     *
     * @returns {Promise<unknown[]>}
     */
    #drawElectrons() {
        const promises = [];
        this.#electrons.forEach((electron) => {
            promises.push(new Promise((resolve) => {
                this.#drawElectron(electron);
                resolve();
            }));
        });

        return Promise.all(promises);
    }

    /**
     *
     * @param electron
     */
    #drawElectron(electron) {
        // Obtains context
        const context = this.#canvas.getContext("2d");

        // Being the drawing path
        context.beginPath();
        context.moveTo(electron.x, electron.y);

        // Adjusts the position
        if (electron.position == 0 || electron.position == 2) {
            electron.x = electron.x + (-(electron.position - 1) * electron.advance);
        } else {
            electron.y = electron.y + (-(electron.position - 2) * electron.advance);
        }

        // Draws the end point of the line
        context.lineTo(electron.x, electron.y);

        // Draws the line
        context.strokeStyle = electron.color;
        context.stroke();

        // Checks boundaries for wall collision
        if (electron.x < 0 || electron.x > this.#width || electron.y < 0 || electron.y > this.#height) {
            // Creates the collision
            this.#createCollision(this.#config.collision.wall, //
                electron.x < 0 ? 0 : (electron.x > this.#width ? this.#width : electron.x), //
                electron.y < 0 ? 0 : (electron.y > this.#height ? this.#height : electron.y));

            // Removes the electron
            this.#electrons.splice(this.#electrons.indexOf(electron), 1);
        }
        // Redirects at random
        else if (Math.random() < electron.redirection) {
            electron.position = Math.floor(Math.random() * 4);
        }
    }

    /**
     *
     * @returns {Promise<unknown[]>}
     */
    #drawCollisions() {
        const promises = [];
        this.#collisions.forEach((collision) => {
            promises.push(new Promise((resolve) => {
                this.#drawCollision(collision);
                resolve();
            }));
        });

        return Promise.all(promises);
    }

    /**
     *
     * @param collision
     */
    #drawCollision(collision) {
        collision.currentSize = collision.currentSize + collision.speed;

        const context = this.#canvas.getContext("2d");
        context.strokeStyle = collision.color;
        context.beginPath();
        context.arc(collision.x, collision.y, collision.currentSize, 0, 2 * Math.PI);
        context.stroke();

        if (collision.size < collision.currentSize) {
            this.#collisions.splice(this.#collisions.indexOf(collision), 1);
        }
    }

    /**
     *
     * @param base
     * @param x
     * @param y
     */
    #createCollision(base, x, y) {
        const collision = Utils.jsonClone(base);
        collision.x = x;
        collision.y = y;
        collision.currentSize = 0;
        this.#collisions.push(collision);
    }

    /**
     *
     */
    #detectCollisions() {
        // Checks each electron
        for (let i = 0; i < this.#electrons.length; i++) {
            // Checks each of the next electrons
            for (let j = i + 1; j < this.#electrons.length; j++) {
                // Obtains both
                let a = this.#electrons[i];
                let b = this.#electrons[j];

                // Checks positions
                if (a.x == b.x && a.y == b.y) {
                    // Saves the collision
                    const collision = this.#createCollision(this.#config.collision.electron,//
                        a.x < 0 ? 0 : (a.x > this.#width ? this.#width : a.x),//
                        a.y < 0 ? 0 : (a.y > this.#height ? this.#height : a.y));
                }
            }
        }
    }

    /**
     * Draws a layer of color over the canvas
     * @param isTransparent
     */
    #overshadow(isTransparent) {
        // Optional parameter
        isTransparent = isTransparent || true;

        // Obtains the canvas
        const context = this.#canvas.getContext("2d");

        // Clears the area
        context.fillStyle = this.#config.general.background + //
            (isTransparent ? Math.floor(this.#config.general.opacity * 255).toString(16).padStart(2, "0") : "");
        context.fillRect(0, 0, this.#width, this.#height);
    }

    /**
     * Spawns a new electron within probability
     */
    #spawn() {
        // Checks the probability
        if (Math.random() < this.#config.electron.spawn) {
            // Determines the position
            const position = Math.floor(Math.random() * 4);
            const x = position == 1 || position == 3 ? Math.floor(Math.random() * this.#width) : (position == 0 ? 0 : this.#width);
            const y = position == 0 || position == 2 ? Math.floor(Math.random() * this.#height) : (position == 1 ? 0 : this.#height);

            // Saves it to be drawn
            const electron = Utils.jsonClone(this.#config.electron);
            electron.position = position;
            electron.x = x;
            electron.y = y;
            this.#electrons.push(electron);
        }
    }

    /**
     * Draws the canvas into the body
     */
    #drawCanvas() {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;

        //language=HTML
        let template = `
            <canvas width="${this.#width}" height="${this.#height}" style="position: absolute; top: 0; left: 0; z-index: -1;"></canvas>
        `;

        const parser = new DOMParser();
        const html = parser.parseFromString(template, "text/html");

        this.#canvas = html.body.querySelector("canvas");
        document.querySelector("body").prepend((this.#canvas));
    }
}

export const animation = new BackgroundAnimation();
Utils.onDocumentReady(() => animation.start());