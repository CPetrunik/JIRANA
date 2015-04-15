//=======
// Asana
//=======
/*global chrome, $ */
var stud = stud || {};
stud.asana = (function () {
    'use strict';
    var last_update = null,
        last_modified = null,
        ready = $.Deferred(),
        event = {};

    function get(id) {
        return stud.storage.get('a', id);
    }

    function put(id, data) {

    }

    function getProjectListRequest(workspace) {
        return $.getJSON([
            "https://app.asana.com/api/1.0/workspaces/",
            workspace,
            "/projects?archived=false"
        ].join(""));
    }

    function processProjectListRequest(data) {
        var projects = [];
        $.each(data.data, function (key, val) {
            projects.push(val.id);
        });
        return projects;
    }

    function getTaskListRequest(project) {
        return $.getJSON([
            "https://app.asana.com/api/1.0/projects/",
            project,
            "/tasks?modified_since=",
            last_modified.toISOString(),
            "&opt_fields=",
            [
                "name",
                "assignee.name",
                "tags.name",
                "modified_at",
                "completed",
                "due_on",
                "projects.name",
                "notes"
            ].join(",")
        ].join(''));
    }

    function processTaskListRequest(data) {
        $.each(data.data, function (key, val) {
            console.log(val);
            var links = [];
            $.each(val.tags, function (key, val) {
                if (val.name.toLowerCase().match(/^[a-z]+[\-][0-9]+$/)) {
                        links.push(val.name.toUpperCase());
                }
            });

            stud.storage.put("a", val.id, {
                "index": val.id,
                "name": val.name,
                "assignee": val.assignee ? val.assignee.name : undefined,
                "status": val.completed ? "Complete" : "Incomplete",
                "due": new Date(val.due_on).getTime(),
                "modified": new Date(val.modified_at).getTime(),
                "description": val.notes,
                "module": val.projects[0].name,
                "links": links
            });
        });
    }

    function update() {
        return $.when(ready).then(function () {
            return getProjectListRequest("5311864561437");
        }).then(function (data) {
            return processProjectListRequest(data);
        }).then(function (projectList) {
            var requests = [];
            $.each(projectList, function (key, project) {
                if (project === 5311864561448) {
                requests.push(getTaskListRequest(project));
                }
            });
            return $.when.apply($, requests);
        }).then(function () {
            var status = 1, data = 0;
            if (arguments[status] === "success") {
                processTaskListRequest(arguments[data]);
            } else {
                $.each(arguments, function (key, args) {
                    processTaskListRequest(args[0]);
                });
            }
        });
    }

    function start() {
        var thirty_days = 30 * 24 * 60 * 60 * 1000;
        //startDate = new Date(today.getTime() - 30*24*60*60*1000);
        last_modified = new Date(new Date().getTime() - thirty_days);
        chrome.storage.local.get("asana-last-update", function (data) {
            last_update = data["asana-last-update"] || null;
        });
        //$.when(stud.event.ready).then
        $(stud.storage.event).on("persist", function (e, d) {
            if (last_modified && last_update && d.time > last_update) {
                chrome.local.set(); //TODO - STORE LAST MODIFIED
            }
        });
        ready.resolve();
    }

    return {
        get: get,
        update: update,
        start: start,
        ready: ready
    };
}());
