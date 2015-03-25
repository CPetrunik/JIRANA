
var d = {
    'STU-0000' : {
        'name' : 'TEST'   
    },
    'STU-2':{
        'name': "T2"
    }
};

var r = ['STU-0000','STU-2'];

Handlebars.registerHelper('data', function(options) {
    console.log(this);
    console.log(d[this]);
    return options.fn(d[this]);
});
Handlebars.registerPartial('mypartial', $("#mypartial").html());


var source = $("#entry-template").html();
var template = Handlebars.compile(source);





var context = {
    'name': 'Test JIRA Name', // name
    'user': 'Jeremy White', // user
    'module': 'Admissions', // module
    'patch': false, // patch
    'backlog': false, // backlog
    'version': '2015.15', // fix version
    'status': 'In Progress', // JIRA Asana status
    'date': '03-25-2015', // Asana Due Date
    'link': ['238957523987'], // links to JIRAs and tasks
    'priority': 'Major', // JIRA priority
    'toggle': 'Admissions Toggle', // JIRA Toggled By
    'commit': '123456', // Lastest JIRA Commit Revision
    'confidence':'Internal',
    'description': 'This is the long description for the JIRA', // JIRA Long Description
    'comments': [
        {
            'user': 'ben.mccurdy',
            'comment': 'hey'
         },
        {
            'user': 'chris.petrunik',
            'comment': 'hi as well'
         }
         ], // The comments on the JIRA or Asana
    'verifier': 'ilana.reveli', // The verified by field on the JIRA
    'type': 'Task' // The type of the JIRA
};
var html = template(r);
$('#template').html(html);

