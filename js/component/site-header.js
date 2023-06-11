const SiteHeader = Vue.defineCustomElement({
    //language=HTML
    template: `
        <header class="container background-blue-300 margin-bottom-10">
            <div class="column">
                <div class="container stretch padding-top-10 padding-bottom-10">
                    <div class="column">
                        <text-glitch init-element="span"
                                     init-frames-per-second="60"
                                     init-text="CS601 - Web Application Development">
                        </text-glitch>
                    </div>
                    <div class="column align-right">
                        <a href="sms:+1(603)8242671">Phone: +1(603) 824 2671</a> |
                        <a href="mail:lhoz@bu.edu">Email: lhoz@bu.edu</a>
                    </div>
                </div>
            </div>
        </header>
    `,
    //language=CSS
    styles: [`
        @import 'css/default.css';
    `]
});
customElements.define("site-header", SiteHeader);