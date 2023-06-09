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