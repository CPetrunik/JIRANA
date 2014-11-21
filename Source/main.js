/**
 * Created by andrew.choi on 10/1/14.
 */

onStart();

document.addEventListener('DOMContentLoaded', function () {
    onLoad();
});

/* Global vars */
/* http managers */
var asana;
var jira;
/* hashes for autocomplete */
var users;
var projects;
var tags;
/* html elements */
var topRadioDiv;
var topRadios;
var asanaStatusRadioDiv;
var asanaStatusRadios;
var asanaFilterRadioDiv;
var asanaFilterRadios;
var searchDiv;
var searchInput;
var searchButton;
var tableSpaceDiv;
/* spinner */
var loadingSpinner;

/* called at start */
function onStart() {
    initHttpManagers();
}

/* called when html doc is loaded */
function onLoad() {
    initUI();
}

/* initialize UI elements */
function initUI() {
    setHtmlGlobalVars();
    hideElements();
    setTopRadiosListener();
    setAsanaFilterRadioListener();
    setSearchButtonListener();
}

/* hide all elements that should not be shown at start */
function hideElements() {
    asanaStatusRadioDiv.hide();
    asanaFilterRadioDiv.hide();
    searchDiv.hide();
}

/* initialize the objects used for hhtp requests */
function initHttpManagers() {
    asana = new HttpManager('https://app.asana.com/api/1.0/', 'ticket');
    jira = new HttpManager('https://jira.workday.com/rest/api/2/', 'JSESSIONID');
    asana.studentWorkspaceId = '5311864561437';
    jira.studentProjectId = 'STU';
    /* option fields sent in with request to get only the fields desired in the returned JSON object */
    asana.allOptFields = 'opt_fields=subtasks,subtasks.name,created_at,modified_at,notes,completed_at,due_on,parent';
    asana.rowOptFields = 'opt_fields=name,tags,tags.name,projects,projects.name,completed,assignee,assignee.name';
    jira.optFields = '&fields=key,customfield_17400,status,summary&maxResults=100';
    setHash('workspaces/' + asana.studentWorkspaceId + '/users/', function (hash) {
        users = hash;
        users['me'] = 'me';
        /* trigger radio change.
         * only trigger if user has not selected a different radio */
        if (asanaFilterRadios[0].checked) {
            changeRadioSelection('asanaFilterRadio', 'user', false);
            changeRadioSelection('asanaFilterRadio', 'user');
        }
    });
    setHash('workspaces/' + asana.studentWorkspaceId + '/projects/', function (hash) {
        projects = hash;
        /* trigger radio change.
         * only trigger if user has not selected a different radio */
        if (asanaFilterRadios[1].checked) {
            changeRadioSelection('asanaFilterRadio', 'proj', false);
            changeRadioSelection('asanaFilterRadio', 'proj');
        }
    });
    setHash('workspaces/' + asana.studentWorkspaceId + '/tags/', function (hash) {
        tags = hash;
        /* trigger radio change.
         * only trigger if user has not selected a different radio */
        if (asanaFilterRadios[2].checked) {
            changeRadioSelection('asanaFilterRadio', 'tag', false);
            changeRadioSelection('asanaFilterRadio', 'tag');
        }
    });
}

/*todo set searchButton listeners */
function setSearchButtonListener() {
    searchButton.click(function () {
        var tableCaption = 'weffrfe';
        var tableHeaders = ['werfwe', 'werf', 'werffweg'];
        var tableDiv = $('<div></div>');
        if (topRadios[0].checked) {
            tableHeaders = ['ID', 'Name', 'Assignee', 'Project', 'Tag', 'Status'];
            var apiCall = 'tasks/?workspace=' + asana.studentWorkspaceId;
            if (asanaStatusRadios[0].checked) {
            }
            else if (asanaStatusRadios[1].checked) {
                apiCall += '&completed_since=now';
            }
            if (asanaFilterRadios[0].checked) {
                apiCall += '&assignee=' + users[searchInput.val()];
                tableCaption = 'Asana Tasks Assigned to ' + searchInput.val();
            }
            else if (asanaFilterRadios[1].checked) {
                apiCall += '&project=' + projects[searchInput.val()];
                tableCaption = 'Asana Tasks for Project "' + searchInput.val() + '"';
            }
            else if (asanaFilterRadios[2].checked) {
                apiCall += '&tag=' + tags[searchInput.val()];
                tableCaption = 'Asana Tasks for Tag "' + searchInput.val() + '"';
            }
            else if (asanaFilterRadios[3].checked) {
                apiCall = 'tasks/' + searchInput.val();
                tableCaption = 'Asana Task with ID "' + searchInput.val() + '"';
            }
            apiCall += '&' + asana.rowOptFields;
            tableDiv = createTableDiv(tableCaption, tableHeaders, 'asana');
            var tableEl = tableDiv.find('table');
            asana.getRequest(apiCall, {}, function (data) {
                $.each(data.data, function (key, value) {
                    var trEl = $('<tr></tr>');
                    var tdEl;
                    tdEl = $('<td></td>');
                    tdEl.append(value.id);
                    trEl.append(tdEl);
                    tdEl = $('<td></td>');
                    tdEl.append(value.name);
                    trEl.append(tdEl);
                    tdEl = $('<td></td>');
                    if (value.assignee == null) {
                        value.assignee = {'name': 'NA'};
                    }
                    tdEl.append(value.assignee.name);
                    trEl.append(tdEl);
                    tdEl = $('<td></td>');
                    $.each(value.projects, function (key, value) {
                        var divEl = $('<div></div>');
                        divEl.append(value.name);
                        tdEl.append(divEl);
                    });
                    trEl.append(tdEl);
                    tdEl = $('<td></td>');
                    $.each(value.tags, function (key, value) {
                        var divEl = $('<div></div>');
                        divEl.append(value.name);
                        tdEl.append(divEl);
                    });
                    tdEl.addClass('asanaTag');
                    trEl.append(tdEl);
                    tdEl = $('<td></td>');
                    tdEl.append(value.completed ? 'closed' : 'open');
                    trEl.append(tdEl);
                    trEl.addClass('asanaRow');
                    tableEl.append(trEl);
                    tableEl.addClass('asana');
                });
            });
        }
        if (topRadios[0].checked) {
            /*todo*/
        }
        tableSpaceDiv.empty();
        tableSpaceDiv.append(tableDiv);
        setTableListener(tableEl);
    });
}

/*todo set topRadios listeners */
function setTopRadiosListener() {
    topRadios.change(function () {
        if (topRadios[0].checked) {
            changeRadioSelection('asanaStatusRadio', 'all');
            changeRadioSelection('asanaFilterRadio', 'user', false);
            changeRadioSelection('asanaFilterRadio', 'proj', false);
            changeRadioSelection('asanaFilterRadio', 'tag', false);
            changeRadioSelection('asanaFilterRadio', 'task', false);
            asanaStatusRadioDiv.show();
            asanaFilterRadioDiv.show();
        }
        else if (topRadios[1].checked) {
            /*todo*/
        }
        searchDiv.hide();
    });
}

/*todo set listener for all the tables*/
function setTableListener(table) {
    table.click(function (event) {
        event.stopPropagation();
        var target = $(event.target);
        var trEl = $(target.closest('tr'));
        var tdEl = $(target.closest('td'));
        var divEl = $(target.closest('div'));
        console.log(divEl);

        if (trEl.is('.expandedAsana')) {
            trEl.remove();
        }
        else if (trEl.is('.asanaRow')) {
            if (tdEl.is('.asanaTag')) {
                console.log($(divEl).innerText);
            }
            else if (trEl.next().is('.expandedAsana')) {
                trEl.next().remove();
            }
            else {
                var column = $(table.first()).find('th')[tdEl.index()].innerText;
                if (column == 'Name' || column == 'ID' || column == 'Status') {
                    expandRow(trEl);
                }
            }
        }
        else {
        }
    });
}

/*todo expand the table row */
function expandRow(row) {
    var taskID = $(row.first()).find('td')[0].innerText;
    var apiCall = 'tasks/' + taskID + '?' + asana.allOptFields;
    asana.getRequest(apiCall, {}, function (data) {
        row.after(createExpandedAsanaDiv(data.data));
    });
}

/* set asanaFilterRadios listeners */
function setAsanaFilterRadioListener() {
    asanaFilterRadios.change(function () {
        searchDiv.show();
        makeArr = function (hash) {
            /* array of the users for the auto complete.
             * done after setting hash for alphabetization  */
            var tempArr = [];
            $.each(hash, function (name, id) {
                tempArr.push(name);
            });
            return tempArr;
        };
        if (asanaFilterRadios[0].checked && users != null) {
            setAutoComplete(makeArr(users));
        }
        else if (asanaFilterRadios[1].checked && projects != null) {
            setAutoComplete(makeArr(projects));
        }
        else if (asanaFilterRadios[2].checked && tags != null) {
            setAutoComplete(makeArr(tags));
        }
        else if (asanaFilterRadios[3].checked) {
            setAutoComplete([]);
        }
        else {
            searchDiv.hide();
        }
    });
}

/* assign HTML elemnt to global vars */
function setHtmlGlobalVars() {
    topRadioDiv = $('#topRadioDiv');
    topRadios = $('input[name=topRadio]:radio');
    asanaStatusRadioDiv = $('#asanaStatusRadioDiv');
    asanaStatusRadios = $('input[name=asanaStatusRadio]:radio');
    asanaFilterRadioDiv = $('#asanaFilterRadioDiv');
    asanaFilterRadios = $('input[name=asanaFilterRadio]:radio');
    tableSpaceDiv = $('#tableSpaceDiv');
    searchInput = $('#searchInput');
    searchButton = $('#searchButton');
    searchDiv = $('#searchDiv');
}

/* pass a filled hash to th callback from a http request */
function setHash(apiCall, callback) {
    /* make http request to get asana users */
    asana.getRequest(apiCall, {}, function (data) {
        var hash = {};
        /* fill global hash users with the returned data */
        $.each(data.data, function (key, value) {
                var id = parseInt(value.id);
                hash[value.name] = id;
            }
        );
        callback(hash);
    });
}

/* change radio to input with value */
function changeRadioSelection(name, value, checked) {
    if (checked == null) checked = true;
    $('input[name=' + name + '][value=' + value + ']').prop("checked", checked).change();
}

/* set the input autocomplete array parm */
function setAutoComplete(arr) {
    searchInput.autocomplete({source: arr});
}

/* create table div */
function createTableDiv(caption, headers) {
    var divEl = $('<div></div>');
    var tableEl = $('<table></table>');
    var captionEl = $('<caption></caption>');
    captionEl.append(caption);
    tableEl.append(captionEl);
    var trEl = $('<tr></tr>');
    $.each(headers, function (index, value) {
        var thEl = $('<th></th>');
        thEl.append(value);
        trEl.append(thEl);
    });
    tableEl.append(trEl);
    divEl.append(tableEl);
    /*remove*/
    return divEl;
}

/* create table div */
function createExpandedAsanaDiv(data) {
    var trEl = $('<tr></tr>');
    trEl.addClass('expandedAsana');
    var tdEl = $('<td></td>');
    var creAtDivEl = $('<div>Created on: ' + data.created_at + '</div>');
    creAtDivEl.addClass('expandedAsanaCre');
    var modAtDivEl = $('<div>Modified on: ' + data.modified_at + '</div>');
    modAtDivEl.addClass('expandedAsanaMod');
    var notesDivEl = $('<div>Notes: ' + data.notes + '</div>');
    notesDivEl.addClass('expandedAsanaNot');
    if (data.completed_at == null) {
        data.completed_at = 'NA';
    }
    var comAtDivEl = $('<div>Completed on: ' + data.completed_at + '</div>');
    comAtDivEl.addClass('expandedAsanaCom');
    var dueOnDivEl = $('<div>Due on: ' + data.due_on + '</div>');
    dueOnDivEl.addClass('expandedAsanaDue');
    if (data.parent == null) {
        data.parent = {'id': 'NA', 'name': ''};
    }
    var parentDivEl = $('<div>Parent: ' + data.parent.id + ': ' + data.parent.name + '</div>');
    parentDivEl.addClass('expandedAsanaPar');
    var subTasksDivEl = $('<div>Subtasks: </div>');
    subTasksDivEl.addClass('expandedAsanaSub');
    $.each(data.subtasks, function (key, value) {
        subTasksDivEl.append($('<div>' + value.id + ': ' + value.name + '</div>'));
    });
    tdEl.append(creAtDivEl);
    tdEl.append(modAtDivEl);
    tdEl.append(comAtDivEl);
    tdEl.append(dueOnDivEl);
    tdEl.append(notesDivEl);
    tdEl.append(parentDivEl);
    tdEl.append(subTasksDivEl);
    tdEl.attr('colspan', 6);
    trEl.append(tdEl);
    /*remove*/
    return trEl;
}