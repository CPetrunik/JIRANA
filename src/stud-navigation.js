/* DO NOT USE
ALL JS NOW COMES FROM THE JS FOLDER
THIS IS LEFT AS A REFERENCE


Navigation now occurs in the js/stud-routes.js
*/



/**
 * Created by frank.law on 3/24/15.
 */
function transitionToItem(itemNumber)
{

    $("#search-out").fadeOut(function () {
        if(itemNumber.charAt(0) === 'j'){
            $("#item-container").html(Handlebars.templates.parentTemplate(itemNumber));
        }else{
            $("#item-container").html(Handlebars.templates.parentAsanaTemplate(itemNumber));
        }
        $(".wdSlackButton").click(function (e) {
            var button = $(this);
            routeCorrectSlackOnID(button, itemNumber);
        });

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
