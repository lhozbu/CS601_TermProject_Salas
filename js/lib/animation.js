/**
 * Animation utilities
 */
export class Animation {
    /**
     * Obtains the next animation frame while waiting for a fixed FPS
     * @param start
     * @param end
     * @param fps
     * @param func
     * @param params
     */
    static animationFrame(start, end, fps, func, ...params) {
        if ((end - start) > Math.floor(1000 / fps)) {
            requestAnimationFrame(() => func(...params));
        } else {
            setTimeout(() => requestAnimationFrame(() => func(...params)), Math.floor(1000 / fps) - (end - start));
        }
    }
}