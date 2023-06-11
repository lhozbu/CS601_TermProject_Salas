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