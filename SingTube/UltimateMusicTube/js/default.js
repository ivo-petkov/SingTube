// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {                
               
                args.setPromise(WinJS.UI.processAll());

                var applicationData = Windows.Storage.ApplicationData.current;
                var localFolder = applicationData.localFolder;

                localFolder.createFileAsync("currentPlaylist.json", Windows.Storage.CreationCollisionOption.openIfExists).then(
                function () {

                    localFolder.getFileAsync("currentPlaylist.json").then(function (sampleFile) {
                        Windows.Storage.FileIO.readTextAsync(sampleFile).done(function (content) {
                            if (content.length != 0) {

                                var loadedPlaylistData = JSON.parse(content);

                                for (var i = 0; i < loadedPlaylistData.length; i++) {
                                    var title = loadedPlaylistData[i].title;
                                    var thumbnailImgUrl = loadedPlaylistData[i].thumbnailImgUrl;
                                    var sourceUrl = loadedPlaylistData[i].sourceUrl;
                                    ViewModels.addToPlaylist(title, thumbnailImgUrl, sourceUrl);
                                }
                                ViewModels.loadPlaylist();
                                var currTitle = loadedPlaylistData[0].title;
                                var currUrl = loadedPlaylistData[0].sourceUrl;

                                WinJS.Navigation.navigate("/pages/videoPlayer/videoPlayer.html", {
                                    title: currTitle,
                                    videoUrl: currUrl
                                });
                            }
                        });
                    }).done()
                });
                
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            var shareImageHandler = function (event) {
                var dataRequest = event.request;
                var currentVideo = CurrentVideo.Get();
                dataRequest.data.properties.title = "I'm singing with SingTube! It's great!";

                if (currentVideo.sourceUrl === undefined) {
                    var errorMsg = new Windows.UI.Popups.MessageDialog("You can't share  from this page!");
                    errorMsg.showAsync();
                }
                else {
                    dataRequest.data.properties.description = currentVideo.lyrics;
                    dataRequest.data.setUri(new Windows.Foundation.Uri(currentVideo.sourceUrl));
                }
            };

            dataTransferManager.addEventListener("datarequested", shareImageHandler);

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                WinJS.Application.onsettings = function(e) {
                    e.detail.applicationcommands = {
                         "searchOptions": {
                             title: "Search Options",
                             href: "/pages/settings/searchOptions.html"
                         }
                    };
                    WinJS.UI.SettingsFlyout.populateSettings(e);
                };

                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
       
    };
    app.start();
})();
