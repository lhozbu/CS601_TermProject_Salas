import * as Vue from "../lib/vue.js";

/**
 * Displays the about article composed by several sections
 */
export const AboutArticle = Vue.defineCustomElement({
    // language=HTML
    template: `
        <about-section src="json/about-article/early-life.json"></about-section>
        <about-section src="json/about-article/adolescence.json"></about-section>
        <about-section src="json/about-article/young-adult.json"></about-section>
        <about-section src="json/about-article/adult.json"></about-section>
        <about-section src="json/about-article/american-life.json"></about-section>
    `,

    /* Component data */
    data() {
        return {}
    }
});