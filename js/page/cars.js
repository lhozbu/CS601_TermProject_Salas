import {ParticlesAnimation} from "../component/particles-animation.js";
import {AppHeader} from "../component/app-header.js";
import {AppFooter} from "../component/app-footer.js";
import {NavBar} from "../component/nav-bar.js";
import {GlitchText} from "../component/glitch-text.js";
import {ImageGallery} from "../component/image-gallery.js";
import {ImageModal} from "../component/image-modal.js";

customElements.define("particles-animation", ParticlesAnimation);
customElements.define("app-header", AppHeader);
customElements.define("app-footer", AppFooter);
customElements.define("nav-bar", NavBar);
customElements.define("glitch-text", GlitchText);
customElements.define("image-gallery", ImageGallery);
customElements.define("image-modal", ImageModal);