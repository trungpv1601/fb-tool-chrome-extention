// Trigger some event on clicking the browser action button
chrome.browserAction.onClicked.addListener(function(activeTab) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Send message to content script to execute the script
        chrome.tabs.sendMessage(tabs[0].id, { status: "execute" }, function(response) {
            // Response from, the content script after receiving the message
            if(response.status == "success"){
                console.log('Script executed successfully');
            }
        });
    });
});
