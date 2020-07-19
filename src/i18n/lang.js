/**
 * @param {object} obj
 * @returns {lang}
 */
const defLang = (obj) => {
    return obj;
};

export default defLang({
    App: {
        title: "S·c 音乐盒|S·c Music",
    },
    AppBar: {
        text: "S·c 音乐盒",
        menu: "菜单",
        search: "显示搜索框",
        search_placeholder: "搜索歌曲...",
    },
    Index: {
        openAlbum: "打开歌单",
    },
    PlayList: {
        illegal: "非法访问！",
        delete: "删除",
    },
    Drawer: {
        Home: "主页",
        Playing: "正在播放",
        SearchResult: "搜索结果",
    },
    Delete: {
        Title: "你确定要删除这首歌吗？",
        agree: "是",
        cancel: "取消",
        description: "你确定要将这首歌从歌单中移除吗？",
    },
});
