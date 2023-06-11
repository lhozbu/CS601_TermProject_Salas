import * as Utils from "../lib/utils.js";
import {BackgroundAnimation} from "../component/background-animation.js";

export const animation = new BackgroundAnimation();
Utils.onDocumentReady(() => animation.start());