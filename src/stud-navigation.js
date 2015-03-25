/**
 * Created by frank.law on 3/24/15.
 */
function transitionToItem(item)
{

    $("#search-out").fadeOut(function () {
        $("#item-container").html(Handlebars.templates.jiraTemplate());
        $("#item-container").fadeIn();
    });

}

function transitionToList()
{

}