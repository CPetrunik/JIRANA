/**
 * Created by frank.law on 3/23/15.
 */

//=========
// Slack
//=========
function testSlack() {
    $("#search").val('frank');
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://hooks.slack.com/services/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", true);

    var data=
    {
        "text":"Jirana is coming for you.",
        "channel":"jirana",
        "username": "jirana",
        "attachments":[
            {
                "fallback":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
                "pretext":"New open task [Urgent]: <http://url_to_task|Test out Slack message attachments>",
                "color":"#D00000",
                "fields":[
                    {
                        "title":"Notes",
                        "value":"This is much easier than I thought it would be.",
                        "short":false
                    }
                ]
            }
        ]
    };
    xhr.send(JSON.stringify(data));
};

