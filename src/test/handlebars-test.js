var source   = $("#jira-template").html();
var template = Handlebars.compile(source);
var context = {
        'name': 'Test Asana Title Test Asana Title Test Asana Title', // name
        'user': 'Jeremy White', // user
        'module': 'Admissions', // module
        'patch': 'Y', // patch
        'backlog': 'N', // backlog
        'fix': '23.0', // actual fix version
        'status': 'Incomplete', // JIRA Asana status
        'date': '03-29-2015', // Asana Due Date
        'link': ['238957523987'],   // links to JIRAs and tasks
        'priority': 'Major', // JIRA priority
        'toggle': 'Admissions Toggle', // JIRA Toggled By
        'commit': '123456', // Lastest JIRA Commit Revision
        'desc': 'This is the description for the Asana', // JIRA Long Description
        'comments': [
        	{
        		'user':'ben.mccurdy',
        		'comment':'hey'
        	},
        	{
        		'user':'chris.petrunik',
        		'comment':'hi as well'
        	}
        	], // The comments on the JIRA or Asana
        'verifier': 'Ilana', // The verified by field on the JIRA
        'type': 'Task', // The type of the JIRA
        'index': 'STU-10804' // The index for the jira and asana
    };
    
var html    = template(context);   

$('#template').html(html);