/**
 * Created by andrew.choi on 9/23/14.
 */

function HttpManager(domain, cookieName) {
    this.domain = domain;
    this.cookieName = cookieName;
}

HttpManager.prototype.request = function (apiCall, requestType, data, callback) {
    var url = this.domain + apiCall;
    chrome.cookies.get({
        url: url,
        name: this.cookieName
    }, function(cookie) {
        if (!cookie) {
            callback({
                status: 401,
                error: "Not Authorized"
            });
            return;
        }

        // Note that any URL fetched here must be matched by a permission in
        // the manifest.json file!
        var attrs = {
            type: requestType,
            url: url,
            timeout: 30000,   // 30 second timeout
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            accept: "application/json",
            success: function(data, status, xhr) {
                console.log('returned http request:\n' + '   ' + url);
                callback(data);
            },
            error: function(xhr, status, error) {
                // jQuery's ajax() method has some rather funky error-handling.
                // We try to accommodate that and normalize so that all types of
                // errors look the same.
                if (status === "error" && xhr.responseText) {
                    var response;
                    try {
                        response = $.parseJSON(xhr.responseText);
                    } catch (e) {
                        response = {
                            errors: [{message: "Could not parse response from server" }]
                        };
                    }
                    callback(response);
                } else {
                    callback({ error: error || status });
                }
            },
            xhrFields: {
                withCredentials: true
            }
        };
        if (requestType === "POST" || requestType === "PUT") {
            attrs.data = JSON.stringify({data: data});
            attrs.dataType = "json";
            attrs.processData = false;
            attrs.contentType = "application/json";
        }
        $.ajax(attrs);
        console.log('sent http request:\n' + '   ' + url);
    });
};

HttpManager.prototype.getRequest = function (api, data, callback) {
    this.request(api, 'GET', data, callback);
};

HttpManager.prototype.postRequest = function (api, data, callback) {
    this.request(api, 'POST', data, callback);
};
