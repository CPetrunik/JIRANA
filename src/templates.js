(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search'] = template({"1":function(depth0,helpers,partials,data) {
    return "                "
    + this.escapeExpression((helpers.template || (depth0 && depth0.template) || helpers.helperMissing).call(depth0,"searchResult",{"name":"template","hash":{},"data":data}))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-hover\">\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>";
},"useData":true});
templates['searchResult'] = template({"1":function(depth0,helpers,partials,data) {
    return "        "
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr>\n    <td>\n"
    + ((stack1 = helpers['with'].call(depth0,(depth0 != null ? depth0.j : depth0),{"name":"with","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        <div class=\"row\">\n            <div class=\"col-xs-2\">\n                <div class=\"jira\">\n                    <h4 style=\"margin-top:0px;margin-bottom:0px;\">"
    + alias3(((helper = (helper = helpers.i || (depth0 != null ? depth0.i : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"i","hash":{},"data":data}) : helper)))
    + "</h4>\n                </div>\n            </div>\n\n            <div class=\"col-xs-6\">\n                <h4 style=\"margin-top:0px;margin-bottom:0px;padding-bottom:5px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">"
    + alias3(((helper = (helper = helpers.n || (depth0 != null ? depth0.n : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"n","hash":{},"data":data}) : helper)))
    + "</h4>\n            </div>\n            <div class=\"col-xs-3\" style=\"text-align:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">"
    + alias3(((helper = (helper = helpers.u || (depth0 != null ? depth0.u : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"u","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"col-xs-1\" style=\"text-align:right;\"><span class=\"label label-default\" style=\"margin-left:-50px;\">revision</span>\n            </div>\n        </div>\n        \n        \n        <div class=\"row\">\n            <div class=\"col-xs-2\" style=\"text-align:right;\">\n                <span class=\"label label-info\" data-toggle=\"tooltip\" data-animation=\"false\" data-placement=\"left\" title=\"Open\"><span class=\"glyphicon glyphicon-link\"></span></span>\n            </div>\n            <div class=\"col-xs-10\">\n                This is a sample asana name\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-2\" style=\"text-align:right;\">\n                <span class=\"label label-info\" data-toggle=\"tooltip\" data-animation=\"false\" data-placement=\"left\" title=\"Crucible\"><span class=\"glyphicon glyphicon-link\"></span></span>\n            </div>\n            <div class=\"col-xs-10\">\n                This is a sample asana name\n            </div>\n        </div>\n    </td>\n</tr>";
},"useData":true});
})();