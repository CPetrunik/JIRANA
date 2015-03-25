(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['asanaTemplate'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "        <li class=\"list-group-item\">\n            <h5 class=\"list-group-item-heading\">"
    + alias2((helpers.nameFormat || (depth0 && depth0.nameFormat) || alias1).call(depth0,(depth0 != null ? depth0.user : depth0),{"name":"nameFormat","hash":{},"data":data}))
    + "</h5>\n            <p class=\"list-group-item-text\">"
    + alias2(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p>\n        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"panel panel-"
    + alias3(((helper = (helper = helpers.panelColor || (depth0 != null ? depth0.panelColor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"panelColor","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"panel-heading\">\n        <h6 class=\"panel-title\">\n            "
    + alias3(((helper = (helper = helpers.asanaComplete || (depth0 != null ? depth0.asanaComplete : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"asanaComplete","hash":{},"data":data}) : helper)))
    + " <a href=\""
    + alias3(((helper = (helper = helpers.asanaLink || (depth0 != null ? depth0.asanaLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"asanaLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" style=\"color:inherit;\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></h6>\n            <div style=\"margin-top:10px;\">"
    + alias3((helpers.nameFormat || (depth0 && depth0.nameFormat) || alias1).call(depth0,(depth0 != null ? depth0.user : depth0),{"name":"nameFormat","hash":{},"data":data}))
    + "&nbsp;<div class=\"badge pull-right\" style=\"clear:none;\">"
    + alias3(((helper = (helper = helpers.module || (depth0 != null ? depth0.module : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"module","hash":{},"data":data}) : helper)))
    + "</div></div>\n        \n    </div>\n    <div class=\"panel-body\">\n        <strong>Due:</strong> "
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + "\n        <br>\n        <strong>Description: </strong><span style=\"word-wrap: break-word;\">"
    + alias3(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"desc","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>";
},"useData":true});
templates['jiraTemplate'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "				<p class=\"commentrow\">"
    + alias3(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"user","hash":{},"data":data}) : helper)))
    + ": "
    + alias3(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = 
  "<div class=\"panel panel-primary\">\n    <div class=\"panel-heading\">\n        <h6 class=\"panel-title\">\n                <a href=\""
    + alias3(((helper = (helper = helpers.jiraLink || (depth0 != null ? depth0.jiraLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"jiraLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" style=\"color:inherit;\"><span class=\"jira-id\">"
    + alias3(((helper = (helper = helpers.i || (depth0 != null ? depth0.i : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"i","hash":{},"data":data}) : helper)))
    + "</span>: "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n                <span class=\"badge label-spacer pull-right\">"
    + alias3(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + "</span></h6>\n    </div>\n	<div class=\"panel-body\">\n        <div class=\"row\">\n            <div class=\"col-xs-6 col-md-4\"><strong>Assignee:</strong> "
    + alias3((helpers.nameFormat || (depth0 && depth0.nameFormat) || alias1).call(depth0,(depth0 != null ? depth0.user : depth0),{"name":"nameFormat","hash":{},"data":data}))
    + "</div>\n            <div class=\"col-xs-6 col-md-4\"><strong>Type:</strong> "
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6 col-md-4\"><strong>Verified By:</strong> "
    + alias3((helpers.nameFormat || (depth0 && depth0.nameFormat) || alias1).call(depth0,(depth0 != null ? depth0.verifier : depth0),{"name":"nameFormat","hash":{},"data":data}))
    + "</div>\n            <div class=\"col-xs-6 col-md-4\"><strong>Toggled By:</strong> "
    + alias3(((helper = (helper = helpers.toggle || (depth0 != null ? depth0.toggle : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"toggle","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-6 col-md-4\"><strong>Fix Version:</strong> "
    + alias3(((helper = (helper = helpers.fix || (depth0 != null ? depth0.fix : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"fix","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"col-xs-6 col-md-4\"><strong>Latest Commit:</strong> "
    + alias3(((helper = (helper = helpers.commit || (depth0 != null ? depth0.commit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"commit","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <p></p>\n		<div class=\"panel panel-default\">\n			<div class=\"panel-heading\">Latest Comment</div>\n			<div class=\"panel-body\">\n";
  stack1 = ((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias1),(options={"name":"comments","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.comments) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</div>\n			</div>            			\n	</div>\n</div>";
},"useData":true});
templates['parentAsanaTemplate'] = template({"1":function(depth0,helpers,partials,data) {
    return "        <div class=\"row\">\n            <div class=\"col-xs-12\">"
    + this.escapeExpression((helpers.template || (depth0 && depth0.template) || helpers.helperMissing).call(depth0,"asanaTemplate",{"name":"template","hash":{},"data":data}))
    + "</div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\" style=\"padding-top:15px;padding-bottom:15px; min-height: 50px;\">\n            <div class=\"col-xs-5\">\n                <button type=\"button\" id=\"returnToSearch\" class=\"btn btn-default btn-md\">\n                    <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span> Back\n                </button>\n            </div>\n            <div class=\"col-xs-4\">\n                <div class=\"alert alert-success\" role=\"alert\" id=\"flash-message\"> <span id=\"flash-message-text\"></span></div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"btn-group pull-right fix-header\">\n                    <button type=\"button\" class=\"btn btn-warning wdSlackButton pingAssignee\">Ping Assignee</button>\n                    <button type=\"button\" class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n                        <span class=\"caret\"></span>\n                        <span class=\"sr-only\">Toggle Dropdown</span>\n                    </button>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n<!--                        <li><a href=\"#\" class=\"wdSlackButton resolveAssignee\">Tell Assignee to Resolve Jira</a></li>-->\n                        <li><a href=\"#\" class=\"wdSlackButton commentAssignee\">Tell Assignee to Comment</a></li>\n<!--                        <li><a href=\"#\" class=\"wdSlackButton pingQALead\">Ping QA Lead</a></li>-->\n                        <li class=\"divider\"></li>\n                        <li><a href=\"#\" class=\"wdSlackButton customMessage\" data-toggle=\"modal\" data-target=\"#exampleModal\" data-whatever=\"@getbootstrap\">Custom Message...</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"data","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>";
},"useData":true});
templates['parentTemplate'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"row\">\n            <div class=\"col-xs-12\">"
    + this.escapeExpression((helpers.template || (depth0 && depth0.template) || helpers.helperMissing).call(depth0,"jiraTemplate",{"name":"template","hash":{},"data":data}))
    + "</div>\n        </div>\n        <div class=\"row\">\n            "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.l : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  " ";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"data","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + " ";
},"3":function(depth0,helpers,partials,data) {
    return "\n            <div class=\"col-xs-6\">"
    + this.escapeExpression((helpers.template || (depth0 && depth0.template) || helpers.helperMissing).call(depth0,"asanaTemplate",{"name":"template","hash":{},"data":data}))
    + "</div>\n            ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\" style=\"padding-top:15px;padding-bottom:15px; min-height: 50px;\">\n            <div class=\"col-xs-5\">\n                <button type=\"button\" id=\"returnToSearch\" class=\"btn btn-default btn-md\">\n                    <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span> Back\n                </button>\n            </div>\n            <div class=\"col-xs-4\">\n                <div class=\"alert alert-success\" role=\"alert\" id=\"flash-message\"> <span id=\"flash-message-text\"></span></div>\n            </div>\n            <div class=\"col-xs-3\">\n                <div class=\"btn-group pull-right fix-header\">\n                    <button type=\"button\" class=\"btn btn-warning wdSlackButton pingAssignee\">Ping Assignee</button>\n                    <button type=\"button\" class=\"btn btn-warning dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n                        <span class=\"caret\"></span>\n                        <span class=\"sr-only\">Toggle Dropdown</span>\n                    </button>\n                    <ul class=\"dropdown-menu\" role=\"menu\">\n                        <li><a href=\"#\" class=\"wdSlackButton resolveAssignee\">Tell Assignee to Resolve Jira</a></li>\n                        <li><a href=\"#\" class=\"wdSlackButton commentAssignee\">Tell Assignee to Comment</a></li>\n                        <li><a href=\"#\" class=\"wdSlackButton pingQALead\">Ping QA Lead</a></li>\n                        <li class=\"divider\"></li>\n                        <li><a href=\"#\" class=\"wdSlackButton customMessage\" data-toggle=\"modal\" data-target=\"#exampleModal\" data-whatever=\"@getbootstrap\">Custom Message...</a></li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"data","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>";
},"useData":true});
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
    var stack1, helper, options, buffer = 
  "        <input class=\"jira_id\" type=\"hidden\" value=\""
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"data","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"row\">\n            <div class=\"col-xs-2\">\n                <a href=\""
    + alias3(((helper = (helper = helpers.jiraLink || (depth0 != null ? depth0.jiraLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"jiraLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n                <div class=\"jira\">\n                    <h4 style=\"margin-top:0px;margin-bottom:0px;\">"
    + alias3(((helper = (helper = helpers.i || (depth0 != null ? depth0.i : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"i","hash":{},"data":data}) : helper)))
    + "</h4>\n                </div>\n                    </a>\n            </div>\n\n            <div class=\"col-xs-6\">\n                <h4 style=\"margin-top:0px;margin-bottom:0px;padding-bottom:5px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">"
    + alias3(((helper = (helper = helpers.n || (depth0 != null ? depth0.n : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"n","hash":{},"data":data}) : helper)))
    + "</h4>\n            </div>\n            <div class=\"col-xs-2 pull-left\" style=\"text-align:right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;\">"
    + alias3((helpers.nameFormat || (depth0 && depth0.nameFormat) || alias1).call(depth0,(depth0 != null ? depth0.user : depth0),{"name":"nameFormat","hash":{},"data":data}))
    + "</div>\n            <div class=\"col-xs-2 pull-right\" style=\"text-align:right;\"><span class=\"label label-default\" >"
    + alias3(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + "</span>\n            </div>\n        </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "        <input class=\"asana_id\" type=\"hidden\" value=\""
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"data","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        \n        <div class=\"row\">\n            <div class=\"col-xs-2\" style=\"text-align:right;\">\n                <a href=\""
    + alias3(((helper = (helper = helpers.asanaLink || (depth0 != null ? depth0.asanaLink : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"asanaLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><span class=\"label label-info\" data-toggle=\"tooltip\" data-animation=\"false\" data-placement=\"left\" title=\"Open\"><span class=\"glyphicon glyphicon-link\"></span></span></a>\n            </div>\n            <div class=\"col-xs-10\">\n                "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n        \n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<tr class=\"searchResult\" style=\"cursor:default;\">\n    <td>\n"
    + ((stack1 = helpers['with'].call(depth0,(depth0 != null ? depth0.j : depth0),{"name":"with","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.a : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n</tr>";
},"useData":true});
})();