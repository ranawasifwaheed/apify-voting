const { Actor } = require('apify');
const { PuppeteerCrawler } = require('crawlee');
Actor.main(async () => {
    // Create proxy configuration with residential proxies
    // const proxyConfiguration = await Actor.createProxyConfiguration({
    //     groups: ['RESIDENTIAL'],
    // });

    const crawler = new PuppeteerCrawler({
        // proxyConfiguration: proxyConfiguration,
        requestHandler: async ({ page, request }) => {
            try {
                    await page.goto(request.url);
        
                    // Click the vote button
                    const result = await page.evaluate(() => {
                        // Define a function to click the vote button
                        function clickVoteButton() {
                            // Find the vote button element
                            var voteButton = document.querySelector('.submitVote.videoact-QYDkVXgb4P3x0BnwGlZ3L2r851aERO7NJzdy6ApK');
                            // If the button is found, click it
                            if (voteButton) {
                                voteButton.click();
                                console.log("Vote button clicked.");
                                return "Vote button clicked.";
                            } else {
                                console.log("Vote button not found.");
                                return "Vote button not found.";
                            }
                        }
                        // Call the function to click the vote button
                        return clickVoteButton();
                    })
                
            } catch (error) {
                console.error('An error occurred while handling the page:', error);
            }
        },
    });
    const votesCount = 200; // Number of times to vote

    for (let i = 0; i < votesCount; i++) {
        console.log(i)
        await crawler.run(['https://turisticna-zveza.si/video-glasovanje/turizmu-pomaga-lastna-glava-okusni-zakladi']);
        await new Promise(resolve => setTimeout(resolve, 30000));

    }    
});