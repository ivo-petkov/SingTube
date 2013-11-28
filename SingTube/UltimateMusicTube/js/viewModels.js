(function () {
    var playlistList = new WinJS.Binding.List([]);

    var loadPlaylist = function () {
        var playlistDTOs = Data.getPlaylistResults();

        var currentCount = playlistList.dataSource.list.length;
        playlistList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < playlistDTOs.length; i++) {
            playlistList.push(playlistDTOs[i]);
        }      

        PlaylistStorage.storeCurrentPlaylist();
    }

    var searchResultsList = new WinJS.Binding.List([]);

    var loadSearchResults = function () {
        var searchResultDTOs = Data.getSearchResults();

        var currentCount = searchResultsList.dataSource.list.length;
        searchResultsList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < searchResultDTOs.length; i++) {
            searchResultsList.push(searchResultDTOs[i]);
        }       
    }

    var searchQuery = WinJS.Binding.as({ queryText: "" });
    var changeSearchQuery = function (text) {
        searchQuery.queryText = text;
        searchResultsList.notifyReload();
    }

    WinJS.Namespace.define("ViewModels", {
        loadSearchResults: loadSearchResults,
        loadPlaylist: loadPlaylist,
        searchResults: searchResultsList,
        playlist: playlistList,
        addSearchResult: function (title, thumbnailImgUrl, sourceUrl) {
            Data.addSearchResult(new Models.SearchResultModel(title, thumbnailImgUrl, sourceUrl));
        },
        addToPlaylist: function (title, thumbnailImgUrl, sourceUrl) {
            Data.addToPlaylist(new Models.SearchResultModel(title, thumbnailImgUrl, sourceUrl));
        },
        removeFromPlaylist: function (index){
            Data.removeFromPlaylist(index);
        },
        submitSearchText: changeSearchQuery,
        searchQuery: searchQuery
    });
})();