(function() {
    "use-strict";

    WinJS.UI.Pages.define("/pages/settings/searchOptions.html", {
        ready: function(element, options) {
            var defaultsearchNumber = Windows.Storage.ApplicationData.current.roamingSettings.values["search-number"];
            
            var searchNumber = 0;
            if (defaultsearchNumber === undefined) {
                defaultsearchNumber = 5;
                searchNumber = defaultsearchNumber;
            }

            var save = document.getElementById("save");
            save.addEventListener("click", function (e) {
                var newNumber = document.getElementById("search-number").value;
                searchNumber = newNumber;
                Windows.Storage.ApplicationData.current.roamingSettings.values["search-number"] = searchNumber;
                Windows.Storage.ApplicationData.current.localSettings.values["search-number"] = searchNumber;
                var displayMessage = document.getElementById("settings-msg");
                displayMessage.setAttribute("display", "block");
            });
        }
    });
})();
