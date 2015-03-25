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
var jira;

function routeCorrectSlackOnID(button, itemID)
{
    jira = stud.d[itemID];

    if (button.hasClass("pingAssignee"))
    {
        sendSlack(jira, "@"+jira.u,  "Ping", '', "#B4C09B");
    }
    else if (button.hasClass("resolveAssignee"))
    {
        sendSlack(jira, "@"+jira.u, "Please Resolve This", '', "#0067AC");
    }
    else if (button.hasClass("commentAssignee"))
    {
        sendSlack(jira, "@"+jira.u, "Please add a comment", '', "#F37949");
    }
    else if (button.hasClass("pingQALead"))
    {
        if (jira.verifier)
        {
            sendSlack(jira, "@"+jira.verifier, "Ping QA");
        }
        else
        {
            sendFlashMessage('No QA Verifier assigned', 'DANGER');
        }
    }
    else if (button.hasClass("customMessage"))
    {
        // pops a modal
    }
    else
    {
        alert("not mapped");
    }
}

$(".sendCustomMessage").click(function (e) {
    console.log(this);
    var modalContent = $(this).closest(".modal-content");
    var recipientInput = $(modalContent).find("#recipient-name");
    var messageInput = $(modalContent).find("#message-text");

    sendSlack(jira, "@" + recipientInput.val(), messageInput.val(), "Custom Ping");
});





function sendSlack(jira, channel, comment, message, colorCode) {

    message = (typeof message === 'undefined') ? '' : message;
    colorCode = (typeof colorCode === 'undefined') ? '#D00000' : colorCode;

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("post", "https://hooks.slack.com/services/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", true);

    var title = jira.i;
    title += (jira.n) ? ": " + jira.n : "";
    title += (jira.type) ? " ["+ jira.type + "] " : "";
    title += "<https://jira2.workday.com/browse/" + jira.i + "| - Click to goto Jira>";
    var data=
    {
        "text":message,
        "channel":channel,
        "username": "jirana",
        "attachments":[
            {
                "fallback":title,
                "pretext":title,
                "color":colorCode,
                "fields":[
                    {
                        "title":"Message",
                        "value":comment,
                        "short":false
                    }
                ]
            }
        ]
    };

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        var message = "";
        var type;
        if(xhr.readyState == 4 && xhr.status == 200)
        {
            message = "Message sent!"
            type = "SUCCESS";
        }
        else if (xhr.readyState == 4 && xhr.status == 500)
        {
           message = "Something went wrong.";
            type = "DANGER";
        }

        sendFlashMessage(message, type);
    }
    xhr.send(JSON.stringify(data));
};


function sendFlashMessage(message, type)
{
    type = (typeof type === 'undefined') ? 'SUCCESS' : type;

    var flashDiv = $("#flash-message");
    // clean up old styles
    flashDiv.removeClass('alert-success');
    flashDiv.removeClass('alert-danger');

    // Add new styles
    if(type == 'SUCCESS')
    {
        flashDiv.addClass('alert-success');
    }
    else if (type == 'DANGER')
    {
        flashDiv.addClass('alert-danger');
    }

    var flashMessageSpan = $('#flash-message-text');

    flashMessageSpan.text(message);

    flashDiv.fadeIn();
    if( flashDiv.is(':visible') )
    {
        // it's visible, do something
    }
    else
    {
        flashDiv.fadeIn();
    }

    setInterval(function () {flashDiv.fadeOut();}, 5000);

};

