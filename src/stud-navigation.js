/**
 * Created by frank.law on 3/24/15.
 */
function transitionToItem(itemNumber)
{

    $("#search-out").fadeOut(function () {

        $("#item-container").html(Handlebars.templates.parentTemplate("j:" + itemNumber));
        $("#item-container").fadeIn();

        $("#returnToSearch").click(function (e) {
            transitionToList();
        });
    });

}

function transitionToList()
{
    $("#item-container").fadeOut(function () {
        $("#search-out").fadeIn();
    });
}