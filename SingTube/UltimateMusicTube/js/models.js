(function () {
    var SearchResultModel = WinJS.Class.define(function (title, thumbnailImgUrl, sourceUrl) {
        this.title = title;
        this.thumbnailImgUrl = thumbnailImgUrl;
        this.sourceUrl = sourceUrl;
    }, {
        title: "",
        thumbnailImgUrl: "",
        sourceUrl: "",
    })

    WinJS.Namespace.define("Models", {
        SearchResultModel: SearchResultModel
    })
})()