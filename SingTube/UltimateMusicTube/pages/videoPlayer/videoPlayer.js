// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/videoPlayer/videoPlayer.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            CurrentVideo.Set(options.title, options.videoUrl);

            WinJS.Utilities.id("remove-files-button").listen("click", function () {
                Commands.removeSelectionFromPlaylist();
            });

            WinJS.Utilities.id("open-playlist-button").listen("click", function () {

                var openPicker = Windows.Storage.Pickers.FileOpenPicker();
                openPicker.suggestedStartLocation = Windows.Storage.KnownFolders.documentsLibrary;
                openPicker.fileTypeFilter.append(".json");
                openPicker.pickSingleFileAsync().then(PlaylistStorage.loadPlaylist);
            });

            WinJS.Utilities.id("save-playlist-button").listen("click", function () {

                var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                savePicker.suggestedStartLocation = Windows.Storage.KnownFolders.documentsLibrary;
                savePicker.defaultFileExtension = ".json";
                savePicker.fileTypeChoices.insert("playlist", [".json"]);
                savePicker.suggestedFileName = "SingTubePlaylist";
                PlaylistStorage.savePlaylist(savePicker);
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },        
    });
})();
