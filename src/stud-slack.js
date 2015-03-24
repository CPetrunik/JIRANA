/**
 * Created by frank.law on 3/23/15.
 */

//=========
// Slack
//=========
<!-- Split button -->
/*<div class="btn-group">
<button id="button1" type="button" class="btn btn-warning wdSlackButton pingAssignee">Action</button>
<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
<span class="caret"></span>
<span class="sr-only">Toggle Dropdown</span>
</button>
<ul class="dropdown-menu" role="menu">
<li><a href="#" class="wdSlackButton resolveAssignee">Tell Assignee to Resolve Jira</a></li>
<li><a href="#" class="wdSlackButton commentAssignee">Tell Assignee to Comment</a></li>
<li><a href="#" class="wdSlackButton pingQALead">Ping QA Lead</a></li>
<li class="divider"></li>
<li><a href="#" class="wdSlackButton customMessage">Custom Message...</a></li>
</ul>
</div>*/

$(".wdSlackButton").click(function (e) {

    var button = $(this);
    if (button.hasClass("pingAssignee"))
    {
        sendSlack("@frank.law", "Ping");
    }
    else if (button.hasClass("resolveAssignee"))
    {
        sendSlack("@frank.law", "Please Resolve This");
    }
    else if (button.hasClass("commentAssignee"))
    {
        sendSlack("@frank.law", "Please add a comment");
    }
    else if (button.hasClass("pingQALead"))
    {
         sendSlack("@frank.law", "Ping QA");
    }
    else if (button.hasClass("customMessage"))
    {
        alert("custom message to come");
    }

    e.preventDefault();
});







function sendSlack(channel, comment) {

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://hooks.slack.com/services/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", true);

    var data=
    {
        "text":comment,
        "channel":channel,
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

