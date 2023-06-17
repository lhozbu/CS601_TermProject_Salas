import * as Vue from "../lib/vue.js";

/**
 * Displays the application footer
 */
export const AppFooter = Vue.defineCustomElement({
    // language=HTML
    template: `
        <footer class="container">
            <div class="container stretch">
                <div class="row">
                    <div class="column">
                        <section class="align-right">
                            <h2>About me</h2>
                            <ul class="list-plain">
                                <li>Luis Salas</li>
                                <li>Boston University</li>
                                <li>CS601 - Web Application Development</li>
                            </ul>
                        </section>
                    </div>
                    <div class="column">
                        <section class="align-center">
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
                    </div>
                    <div class="column">
                        <section>
                            <h2>Support</h2>
                            <ul class="list-plain">
                                <li>
                                    <a href="https://www.instagram.com/ragnar_daenerys/">Ragnar and Daenerys
                                        Instagram</a>
                                </li>
                                <li>
                                    <a href="https://www.lavishlyholidayflowers.com/">Lavishly Holiday</a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </footer>
    `,

    // language=CSS
    styles: [`
        @import "css/common/default.css";
        @import "css/component/app-footer.css";
    `]
});