//====================
// Main
//====================
/*jslint browser: true , unparam:true*/
/*global $, stud */

var stud = window.stud || {};
stud.log = (function () {
    'use strict';
    var log,
        size = 1000,
        ready = $.Deferred();
    
    function write(message) {
        log.unshift({ time: new Date().getTime(), message: message});
        while (log.length >= size) {
            log.pop();
        }
    }
    
    function start() {
        stud.storage.ready.done(function () {
            log = stud.storage.log();
            ready.resolve();
        });
    }
    
    return {
        write: write,
        ready: ready,
        start: start
    };
}());