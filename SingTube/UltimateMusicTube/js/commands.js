(function () {

    var addAndPlay = function (invokeEvent) {

        var data = Data.getSearchResults();
        var index = invokeEvent.detail.itemIndex;
        var title = data[index].title;
        var thumbnail = data[index].thumbnailImgUrl;
        var videoUrl = data[index].sourceUrl;
        ViewModels.addToPlaylist(title, thumbnail, videoUrl);
        ViewModels.loadPlaylist();

        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
            title: title,
            videoUrl: videoUrl
        })
    };

    var addSelection = function () {
        var listview = document.getElementById("search-results-list").winControl;
        var indices = listview.selection.getIndices();
        var arr = Data.getSearchResults();
        for (var i = 0; i < indices.length; i++) {
            ViewModels.addToPlaylist(arr[indices[i]].title, arr[indices[i]].thumbnailImgUrl, arr[indices[i]].sourceUrl);
        }
        ViewModels.loadPlaylist();
        var title = arr[indices[0]].title;
        var videoUrl = arr[indices[0]].sourceUrl;
        WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
            title: title,
            videoUrl: videoUrl
        });
    };

    var playFromPlaylist = function (eventInfo) {
        var data = Data.getPlaylistResults();
        var url = data[eventInfo.detail.itemIndex].sourceUrl;
        var title = data[eventInfo.detail.itemIndex].title;
        CurrentVideo.Set(title, url);
    }

    var removeSelectionFromPlaylist = function () {
        var listview = document.getElementById("playlist-list").winControl;
        var indices = listview.selection.getIndices();
        for (var i = 0; i < indices.length; i++) {
            ViewModels.removeFromPlaylist([indices[i]]);
            for (var j = i; j < indices.length; j++) {
                indices[j]--;
            }
        }
        ViewModels.loadPlaylist();
    }

    WinJS.Utilities.markSupportedForProcessing(addAndPlay);
    WinJS.Utilities.markSupportedForProcessing(playFromPlaylist);

    WinJS.Namespace.define("Commands", {
        addAndPlay: addAndPlay,
        addSelection: addSelection,
        playFromPlaylist: playFromPlaylist,
        removeSelectionFromPlaylist: removeSelectionFromPlaylist
    });
})()