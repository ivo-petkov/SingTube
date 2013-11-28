(function () {  

    var savePlaylist = function (savePicker) {        

        savePicker.pickSaveFileAsync().then(function (file) {
            savePlaylistJson(file);
        });       
    }

    var loadPlaylist = function (storageFile) {
        Windows.Storage.FileIO.readTextAsync(storageFile).done(function (content) {
            var loadedPlaylistData = JSON.parse(content);
            Data.clearPlaylistModels();

            for (var i = 0; i < loadedPlaylistData.length; i++) {
                var title = loadedPlaylistData[i].title;
                var thumbnailImgUrl = loadedPlaylistData[i].thumbnailImgUrl;
                var sourceUrl = loadedPlaylistData[i].sourceUrl;
                ViewModels.addToPlaylist(title, thumbnailImgUrl, sourceUrl);
            }
            ViewModels.loadPlaylist();
            var currTitle = loadedPlaylistData[0].title;
            var currUrl = loadedPlaylistData[0].sourceUrl;
            CurrentVideo.Set(currTitle, currUrl);
        });
    }    
    
    var storeCurrentPlaylist = function () {
        var applicationData = Windows.Storage.ApplicationData.current;
        var localFolder = applicationData.localFolder;

        localFolder.createFileAsync("currentPlaylist.json", Windows.Storage.CreationCollisionOption.replaceExisting).done(
            function (file) {
                savePlaylistJson(file);
            }
        );
    }

    var savePlaylistJson = function (file) {

        var data = Data.getPlaylistResults();
        var playlist = {
            videos: []
        };

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            playlist.videos.push({ 
                "title" : item.title,
                "thumbnailImgUrl" : item.thumbnailImgUrl,
                "sourceUrl" : item.sourceUrl 
            });               
            
            var jsonData = JSON.stringify(playlist.videos);
            if (file.fileType == ".json") {
                Windows.Storage.FileIO.writeTextAsync(file, jsonData);  
            }
        }
    }

    WinJS.Namespace.define("PlaylistStorage", {
        savePlaylist: savePlaylist,
        loadPlaylist: loadPlaylist,
        storeCurrentPlaylist: storeCurrentPlaylist
    });
}())