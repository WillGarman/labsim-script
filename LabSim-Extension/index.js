console.log("Starting Listener index.js");

const labs = []
const test = []

function skips() {

    const nextButton = document.querySelector("#ProductViewer-NavNextBtn");

    // Wait for the next page to load
    setTimeout(function() {
        // Check if the span element exists
        const playText = document.querySelector("span.VideoViewer-posterPlayBtn");

        const spans = document.querySelectorAll("span");
        let startTestSpan = null;
        let startLabSpan = null;
        for (let i = 0; i < spans.length; i++) {
            // Check all span tags for the text "Start Exam" or "Start Lab"
            if (spans[i].textContent === "Start Exam") {
                console.log("Start Exam found!");
                startTestSpan = spans[i];
                break;
            }
            if (spans[i].textContent === "Start Lab") {
                startLabSpan = spans[i];
                break;
            }
        }


        if (playText) {
            // If there is a play button, click it
            console.log("Play button found!");
            const playButton = document.querySelector("button.to-button.primary");
            playButton.click();
            console.log("Play button clicked!");

        } else {
            // The element doesn't exist, do something else here
            console.log("Play button not found.");


            if (startLabSpan) {
                // If there is a start lab button, skip it and move on
                console.log("Start Lab button found!");
                const currentUrl = window.location.href;
                labs.push(currentUrl);
                
                nextButton.click();
                console.log("Next button clicked, Skipped Lab");
                console.log("Skipped Labs: " + labs.length);

                skips();
            }

            if (startTestSpan) {
                // If there is a start test button, skip it and move on
                console.log("Start Test button found!");
                const currentUrl = window.location.href;
                test.push(currentUrl);
                
                nextButton.click();
                console.log("Next button clicked, Skipped Test");
                console.log("Skipped Tests: " + test.length);

                skips();
            }
        }
    }, 2000); // Wait for 2 seconds before checking for the element

}

//--------MAIN----------

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.data === "hi") { //check if the message is "hi" (trigger from background.js)
        console.log("Request found!");

        const nextButton = document.querySelector("#ProductViewer-NavNextBtn");

        nextButton.click();

        console.log("Next button clicked!");
        
        skips();
    }
  });