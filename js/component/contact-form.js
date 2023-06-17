import * as Vue from "../lib/vue.js";

/**
 * Displays the about article composed by several sections
 */
export const ContactForm = Vue.defineCustomElement({
    // language=HTML
    template: `
        <form ref="form" novalidate>
            <legend>Leave me a message</legend>
            <fieldset>
                <div class="group">
                    <label>Name</label>
                    <input type="text" v-model="name.value" ref="name">
                    <label class="error" v-for="error in name.errors">{{error}}</label>
                </div>
                <div class="group">
                    <label>Email</label>
                    <input type="email" v-model="email.value" ref="email">
                    <label class="error" v-for="error in email.errors">{{error}}</label>
                </div>
                <div class="group">
                    <label>Message</label>
                    <textarea rows="10" v-model="message.value" ref="message"></textarea>
                    <label class="error" v-for="error in message.errors">{{error}}</label>
                </div>
                <div class="group">
                    <label class="margin-y-10" ref="results">{{results}}</label>
                    <button type="submit">Send</button>
                </div>
            </fieldset>
        </form>
    `,

    // language=CSS
    styles: [
            `
            @import "css/common/default.css";
            @import "css/component/contact-form.css";
        `
    ],

    /* Component data */
    data() {
        return {
            results: "",
            name: {
                value: "",
                validations: [
                    {
                        name: "required"
                    },
                    {
                        name: "minlength",
                        value: 2
                    },
                    {
                        name: "maxlength",
                        value: 50
                    }
                ],
                errors: []
            },
            email: {
                value: "",
                validations: [
                    {
                        name: "required"
                    },
                    {
                        name: "minlength",
                        value: 3
                    },
                    {
                        name: "maxlength",
                        value: 250
                    },
                    {
                        name: "isEmail"
                    }
                ],
                errors: []
            },
            message: {
                value: "",
                validations: [
                    {
                        name: "required"
                    },
                    {
                        name: "minlength",
                        value: 5
                    },
                    {
                        name: "maxlength",
                        value: 500
                    }
                ],
                errors: []
            }
        }
    },

    /* Component methods */
    methods: {
        /**
         * Checks if the given field definition is valid
         * @param definition
         * @param field
         */
        isValid: function (definition, field) {
            for (let i = 0; i < definition.validations.length; i++) {
                const validation = definition.validations[i];
                this[validation.name](definition.value, field, validation, definition);
            }
        },

        /**
         * Checks that the field is required
         * @param value
         * @param field
         * @param configuration
         * @param definition
         * @returns {boolean}
         */
        required: function (value, field, configuration, definition) {
            let isValid = value.length > 0;
            if (!isValid) {
                definition.errors.push("This field is required.");
            }
            return isValid;
        },


        /**
         * Checks the field min length
         * @param value
         * @param field
         * @param configuration
         * @param definition
         * @returns {boolean}
         */
        minlength: function (value, field, configuration, definition) {
            let isValid = value.length >= configuration.value;
            if (!isValid) {
                definition.errors.push("It must be at least " + configuration.value + " characters long.");
            }
            return isValid;
        },

        /**
         * Checks the field max length
         * @param value
         * @param field
         * @param configuration
         * @param definition
         * @returns {boolean}
         */
        maxlength: function (value, field, configuration, definition) {
            let isValid = value.length <= configuration.value;
            if (!isValid) {
                definition.errors.push("It must be at most " + configuration.value + " characters long.");
            }
            return isValid;
        },

        /**
         * Checks that the field is an email
         * @param value
         * @param field
         * @param configuration
         * @param definition
         * @returns {boolean}
         */
        isEmail: function (value, field, configuration, definition) {
            let isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            if (!isValid) {
                definition.errors.push("It must be a valid email address.");
            }
            return isValid;
        },

        /**
         * Clears the error messages
         */
        clear: function () {
            this.name.errors = [];
            this.email.errors = [];
            this.message.errors = [];
        }
    },

    /* On ready */
    mounted() {
        this.$refs.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.clear();

            const fields = ["name", "email", "message"];
            fields.forEach((field) => this.isValid(this[field], this.$refs[field]));

            let errorNumber = 0;
            fields.forEach((field) => errorNumber = errorNumber + this[field].errors.length);

            if (errorNumber > 0) {
                // Alters the particles
                const particlesAnimation = document.querySelector("particles-animation")._instance;
                particlesAnimation.data.color = "#ff0000";
                particlesAnimation.data.generationRate = 0.75;
                particlesAnimation.data.directionRate = 0.25;
            } else {
                // Restores the particles
                const particlesAnimation = document.querySelector("particles-animation")._instance;
                particlesAnimation.data.color = particlesAnimation.props.initColor;
                particlesAnimation.data.generationRate = particlesAnimation.props.initGenerationRate;
                particlesAnimation.data.directionRate = particlesAnimation.props.initDirectionRate;

                // Sends the information
                fetch("db/contact.php", {
                    method: "post",
                    accept: "application/json",
                    body: JSON.stringify({
                        "name": this.name.value,
                        "email": this.email.value,
                        "message": this.message.value
                    })
                }).then((response) => {
                    if (response.ok) {
                        this.results = "Message received successfully!";
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        this.results = "An error occurred while sending the message! Please try again later.";
                    }
                });
            }
        });
    }
});