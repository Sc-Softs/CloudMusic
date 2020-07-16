import { dataManager } from "./dataManager";

/**
 *
 * @returns {object}
 * @param {{id:number,name:string,singer:string,album:string}} {id,name,singer,album}
 */
function createSong({ id, name, singer, album }) {
    return { id, name, singer, album };
}

/**
 *
 * @param {number} idAlbum
 * @param {object} song use createSong first
 * @returns {boolean} is success
 */
function addSong(idAlbum, song) {
    if (!dataManager.exist(idAlbum)) return false;
    var songs = [];
    songs = JSON.parse(dataManager.get(idAlbum));
    songs.push(song);
    dataManager.set(idAlbum, JSON.stringify(songs));
    return true;
}

/**
 *
 *
 * @param {number} idAlbum
 * @param {number} idSong
 * @returns {boolean}
 */
function delSong(idAlbum /*:number*/, idSong /*:number*/) {
    if (!dataManager.exist(idAlbum)) return false;
    var songs = JSON.parse(dataManager.get(idAlbum));
    var songs_new = [];
    for (var value of songs) {
        if (value.id !== idSong) {
            songs_new.push(value);
        }
    }
    dataManager.set(idAlbum, JSON.stringify(songs_new));
    return true;
}

/**
 * @returns {string}
 * @param {number} id
 */
function getSong(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

/**
 *
 * @returns {void}
 * @param {number|string} id
 */
function createPlayList(id) {
    if (!dataManager.exist(id)) {
        dataManager.set(id, "[]");
    }
}

/**
 *
 *
 * @param {number} id
 */
function deletePlayList(id) {
    if (dataManager.exist(id)) {
        dataManager.delete(id);
    }
}

export {
    createSong,
    addSong,
    delSong,
    getSong,
    createPlayList,
    deletePlayList,
};
