// Add listener to listen to incoming messages from background
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Execute the script if the status from background is "ecexute"
        if (request.status == "execute") {

            // Gathers all the invite links/buttons in an array and click them one by one
            function inviteAll() {
                // Go to top of the container containing all the friends
                document.body.scrollTop = 0;

                // Get all the invite links. This will get all the invite links/buttons in an array
                var elements = document.getElementsByClassName("fbProfileBrowserListItem");

                (function myLoop (i) {          
                   setTimeout(function () {  
                        if(elements[i] !== undefined && elements[i].getElementsByClassName("_6a rfloat _ohf") !== undefined){
                            var el = elements[i].getElementsByClassName("_6a rfloat _ohf")[0];
                            if(el !== undefined && el.getElementsByTagName('A').length != 0){
                                var aEl = el.getElementsByTagName('A')[0];
                                aEl.click();
                            }
                        }
                        if (++i < elements.length) myLoop(i); 
                   }, 2000)
                })(0);
            }

            function goDown() {
                var temp = document.body.scrollTop;
                // Scroll the div
                document.body.scrollTop = document.body.scrollHeight;

                console.log(temp);
                    console.log(document.body.scrollTop);
                if(temp === document.body.scrollTop) {
                    // Clear interval
                    clearInterval(intervalId);
                    // Once at the end of the div, call invite function
                    inviteAll();
                }
            }

            var intervalId = setInterval(goDown, 2000);

            // Send respons status as success to the background
            sendResponse({ status: "success" });
        }
    });