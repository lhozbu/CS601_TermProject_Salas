/**
 * Waits for the document to be loaded
 * @type {onDocumentReady}
 */
export const onDocumentReady = ((func) => {
    if (document.readyState !== "loading") {
        func();
    } else {
        document.addEventListener("DOMContentLoaded", func);
    }
});

/**
 * Request animation frames
 * @type {animationFrame}
 */
export const animationFrame = ((start, end, fps, func, ...params) => {
    if ((end - start) > Math.floor(1000 / fps)) {
        requestAnimationFrame(() => func(...params));
    } else {
        setTimeout(() => requestAnimationFrame(() => func(...params)), Math.floor(1000 / fps) - (end - start));
    }
});

/**
 * Clones the given JSON
 * @type {function(*=): any}
 */
export const jsonClone = ((json) => {
    return JSON.parse(JSON.stringify(json));
});

/**
 * Deep extends the given JSON
 * @type {function(*=, *=): *|{}}
 */
export const jsonExtend = ((json, extension) => {
    json = json || {};
    extension = extension || {};

    Object.keys(json).forEach((key) => {
        let value = json[key];

        if (extension.hasOwnProperty(key)) {
            let extensionValue = extension[key];

            if (value !== null && value.constructor === {}.constructor) {
                if (extensionValue.constructor === {}.constructor) {
                    json[key] = jsonExtend(value, extensionValue);
                } else {
                    json[key] = extensionValue;
                }
            } else {
                json[key] = extensionValue;
            }
        }
    });

    return json;
});