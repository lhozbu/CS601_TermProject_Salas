import * as Vue from "../library/vue.esm-browser.prod.js";

/**
 * Application footer
 * @type {VueCustomElement}
 */
const AppFooter = Vue.defineCustomElement({
    // language=HTML
    template: `
        <footer class="row background-primary">
            <div class="column">
                <div class="row stretch">
                    <section class="column align-right">
                        <h2>About me</h2>
                        <ul class="list-plain">
                            <li>Luis Salas</li>
                            <li>Boston University</li>
                            <li>CS601 - Web Application Development</li>
                        </ul>
                    </section>
                    <section class="column align-center">
                        <h2>Follow</h2>
                        <ul class="list-plain">
                            <li>
                                <a href="https://www.facebook.com/LhozAndroid">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/lsalas9986">LinkedIn</a>
                            </li>
                            <li>
                                <a href="https://github.com/lhozdroid">GitHub</a>
                            </li>
                        </ul>
                    </section>
                    <section class="column">
                        <h2>Support</h2>
                        <ul class="list-plain">
                            <li>
                                <a href="https://www.instagram.com/ragnar_daenerys/">Ragnar and Daenerys Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.lavishlyholidayflowers.com/">Lavishly Holiday</a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </footer>
    `,

    // language=CSS
    styles: [`
        @import 'css/default.css';
    `]
});
customElements.define("app-footer", AppFooter);