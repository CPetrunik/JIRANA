/*global $, JSLINT, QUnit */
(function test() {
    'use strict';
    var strUrl = "../stud-search.js",
        strReturn = "";

    $.ajax({
        url: strUrl,
        success: function (html) {
            strReturn = html;
        },
        async: false
    });
    console.log();

    function test_jslint(path) {
        var file = "", pass = null;
        $.ajax({
            url: path,
            success: function (data) {
                file = data;
            },
            async: false
        });
        var message;
        var pass = JSLINT(file);
        if (pass) {
            message = "0 Problems Found!";
        } else {
            message = JSLINT.errors.length + " Problems Found!";
            console.log(JSLINT);
            $.each(JSLINT.errors, function(key,val){
                message = message + "\n       Line:" + val.line + " - " + val.reason + " " + val.evidence;
            });
        }
        QUnit.test("Lint: " + path, function lint_test(assert){
            assert.equal(JSLINT.errors.length, 0, message);
        });

    }
    test_jslint('../stud-search.js');
    QUnit.test("stud-search.js", function testt(assert){
        assert.push(true, null, null, "noooo");


        assert.equal("fdsajfkldasjflkdsjafkldsjaklfjdslkafjldksajflkdsajflkdjsalkfjdlskafjldksjfalkdsjlfkdsafjldsakflsajflkdsjflksja","fdjskafjdlksjfkldsjaflksdruruytyryrieiieiejejfhefn ef nvrjnjrebfhe","fail");
        assert.ok(false, "15 errors\nb manny errors");
        assert.ok(JSLINT(strReturn), "Line: " + (JSLINT.errors[0].line - 1) + " \nChar: " + (JSLINT.errors[0].character - 1) + " " +(JSLINT.errors[0].reason));
    });
}());
