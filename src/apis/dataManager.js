class DataManager {
    /**
     * @returns {string|null}
     * @param {string} key
     */
    get(key) {
        return localStorage.getItem(key);
    }
    /**
     * @returns {void}
     * @param {string} key
     * @param {string} value
     */
    set(key, value) {
        return localStorage.setItem(key, value);
    }
    /**
     * @returns {boolean}
     * @param {string} key
     */
    exist(key) {
        return localStorage.getItem(key) != null;
    }
    /**
     * @returns {void}
     * @param {*} key
     */
    delete(key) {
        return localStorage.removeItem(key);
    }
}
const dataManager = new DataManager();

export { dataManager };
