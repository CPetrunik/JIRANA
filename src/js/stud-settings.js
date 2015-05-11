var stud = window.stud || {};
stud.settings = (function () {
    'use strict';

    function put_auth(type, key) {
        stud.storage.put("g", type + ".auth",{value: key});
    }
    function get_auth(type) {
        return stud.storage.get("g", type + ".auth");
    }
    function get_module_list(){
        return stud.storage.all("m");
    }
    function get_module(id){
        stud.storage.get("m", id);
    }
    function put_module(mod){
        console.log("modulePUT");
        stud.storage.put("m", mod.type + "." + mod.project, mod);
    }
    
    return {
        put_auth: put_auth,
        get_auth: get_auth,
        get_module_list: get_module_list,
        get_module: get_module,
        put_module: put_module
    };
}());