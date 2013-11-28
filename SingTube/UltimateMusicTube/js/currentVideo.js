(function () {   

    var setCurrentVideo = function (title, sourceUrl) {
        var player = document.getElementById("player");
        var lyricsContainer = document.getElementById("lyrics");
        var lyrics = Lyrics.getSongLyrics(title);
        lyricsContainer.innerText = lyrics;
        player.src = sourceUrl;
    }

    var getCurrentVideo = function () {
        var player = document.getElementById("player");
        var lyricsContainer = document.getElementById("lyrics");
        if (player != undefined && lyricsContainer != undefined) {
            var currentVideo = {
                "sourceUrl": player.src,
                "lyrics": lyricsContainer.innerText
            }
        }
        
        return currentVideo;
    }

    WinJS.Namespace.define("CurrentVideo", {
        Get: getCurrentVideo,
        Set: setCurrentVideo
    });
})()