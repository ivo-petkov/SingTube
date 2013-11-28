(function () {

    var applicationData = Windows.Storage.ApplicationData.current;
    var temporaryFolder = applicationData.temporaryFolder;

    var getSongLyrics = function (songTitle) {

        songTitle = songTitle.replace(/ *\([^)]*\) */g, "");
        var dashIndex = songTitle.indexOf('-');
        var artist = "";
        var song= "";
        if (dashIndex != -1) {
            song = songTitle.substring(dashIndex + 1, songTitle.length);
            artist = songTitle.substring(0, dashIndex);
        }
        else{

            song = songTitle;
        }

        var lyricsContainer = document.getElementById("lyrics");

        temporaryFolder.getFileAsync(songTitle + ".txt").then(function (file) {
            return Windows.Storage.FileIO.readTextAsync(file);
        }).done(function (lyrics) {
            lyricsContainer.innerText = lyrics;
        }, function () {
            var songLyrics = "";
            var mainUrl = "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?";

            WinJS.xhr({
                url: mainUrl + "artist=" + artist + "&song=" + song,
                responseType: "document"

            }).then(function (result) {
                return new WinJS.Promise(function (complete, error) {

                    try {
                        var lyricsXML = result.responseXML;
                        songLyrics = lyricsXML.getElementsByTagName("Lyric")[0].childNodes[0].nodeValue;
                        complete(songLyrics);
                    }
                    catch (e) {
                        error("Lyrics not found");
                    }
                }).then(function complete(lyr) {
                    lyricsContainer.innerText = lyr;
                    cacheLyrics(songTitle, lyr);
                }, function error(err) {
                    lyricsContainer.innerText = err;
                    cacheLyrics(songTitle, err);
                });

            }, function (error) {
                lyricsContainer.innerText = "Lyrics not found";
            });
        });   
    };   

    var cacheLyrics = function (songTitle, lyrics) {        

        temporaryFolder.createFileAsync(songTitle + ".txt", Windows.Storage.CreationCollisionOption.replaceExisting).then(
            function (file) {
                Windows.Storage.FileIO.writeTextAsync(file, lyrics).done();
        });
    }

    WinJS.Namespace.define("Lyrics", {
        getSongLyrics: getSongLyrics
    })
})()