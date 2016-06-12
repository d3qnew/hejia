/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

//------------------------------------------------------------------------------

var logger = require("./logger");

//------------------------------------------------------------------------------
// object that we're exporting
//------------------------------------------------------------------------------
var mycon = module.exports;

//------------------------------------------------------------------------------
// copy of the original mycon object
//------------------------------------------------------------------------------
var WinConsole = window.mycon;

//------------------------------------------------------------------------------
// whether to use the logger
//------------------------------------------------------------------------------
var UseLogger = false;

//------------------------------------------------------------------------------
// Timers
//------------------------------------------------------------------------------
var Timers = {};

//------------------------------------------------------------------------------
// used for unimplemented methods
//------------------------------------------------------------------------------
function noop() {}

//------------------------------------------------------------------------------
// used for unimplemented methods
//------------------------------------------------------------------------------
mycon.useLogger = function (value) {
    if (arguments.length) UseLogger = !!value;

    if (UseLogger) {
        if (logger.useConsole()) {
            throw new Error("mycon and logger are too intertwingly");
        }
    }

    return UseLogger;
};

//------------------------------------------------------------------------------
mycon.log = function() {
    if (logger.useConsole()) return;
    logger.log.apply(logger, [].slice.call(arguments));
};

//------------------------------------------------------------------------------
mycon.error = function() {
    if (logger.useConsole()) return;
    logger.error.apply(logger, [].slice.call(arguments));
};

//------------------------------------------------------------------------------
mycon.warn = function() {
    if (logger.useConsole()) return;
    logger.warn.apply(logger, [].slice.call(arguments));
};

//------------------------------------------------------------------------------
mycon.info = function() {
    if (logger.useConsole()) return;
    logger.info.apply(logger, [].slice.call(arguments));
};

//------------------------------------------------------------------------------
mycon.debug = function() {
    if (logger.useConsole()) return;
    logger.debug.apply(logger, [].slice.call(arguments));
};

//------------------------------------------------------------------------------
mycon.assert = function(expression) {
    if (expression) return;

    var message = logger.format.apply(logger.format, [].slice.call(arguments, 1));
    mycon.log("ASSERT: " + message);
};

//------------------------------------------------------------------------------
mycon.clear = function() {};

//------------------------------------------------------------------------------
mycon.dir = function(object) {
    mycon.log("%o", object);
};

//------------------------------------------------------------------------------
mycon.dirxml = function(node) {
    mycon.log(node.innerHTML);
};

//------------------------------------------------------------------------------
mycon.trace = noop;

//------------------------------------------------------------------------------
mycon.group = mycon.log;

//------------------------------------------------------------------------------
mycon.groupCollapsed = mycon.log;

//------------------------------------------------------------------------------
mycon.groupEnd = noop;

//------------------------------------------------------------------------------
mycon.time = function(name) {
    Timers[name] = new Date().valueOf();
};

//------------------------------------------------------------------------------
mycon.timeEnd = function(name) {
    var timeStart = Timers[name];
    if (!timeStart) {
        mycon.warn("unknown timer: " + name);
        return;
    }

    var timeElapsed = new Date().valueOf() - timeStart;
    mycon.log(name + ": " + timeElapsed + "ms");
};

//------------------------------------------------------------------------------
mycon.timeStamp = noop;

//------------------------------------------------------------------------------
mycon.profile = noop;

//------------------------------------------------------------------------------
mycon.profileEnd = noop;

//------------------------------------------------------------------------------
mycon.count = noop;

//------------------------------------------------------------------------------
mycon.exception = mycon.log;

//------------------------------------------------------------------------------
mycon.table = function(data, columns) {
    mycon.log("%o", data);
};

//------------------------------------------------------------------------------
// return a new function that calls both functions passed as args
//------------------------------------------------------------------------------
function wrappedOrigCall(orgFunc, newFunc) {
    return function() {
        var args = [].slice.call(arguments);
        try { orgFunc.apply(WinConsole, args); } catch (e) {}
        try { newFunc.apply(mycon,    args); } catch (e) {}
    };
}

//------------------------------------------------------------------------------
// For every function that exists in the original mycon object, that
// also exists in the new mycon object, wrap the new mycon method
// with one that calls both
//------------------------------------------------------------------------------
for (var key in mycon) {
    if (typeof WinConsole[key] == "function") {
        mycon[key] = wrappedOrigCall(WinConsole[key], mycon[key]);
    }
}
