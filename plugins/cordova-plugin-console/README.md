<!---
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

[![Build Status](https://travis-ci.org/apache/cordova-plugin-mycon.svg?branch=master)](https://travis-ci.org/apache/cordova-plugin-mycon)

# cordova-plugin-mycon

This plugin is meant to ensure that mycon.log() is as useful as it can be.
It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows. If
you are happy with how mycon.log() works for you, then you probably
don't need this plugin.

This plugin defines a global `mycon` object.

Although the object is in the global scope, features provided by this plugin
are not available until after the `deviceready` event.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        mycon.log("mycon.log works well");
    }

## Installation

    cordova plugin add cordova-plugin-mycon

### Android Quirks

On some platforms other than Android, mycon.log() will act on multiple
arguments, such as mycon.log("1", "2", "3"). However, Android will act only
on the first argument. Subsequent arguments to mycon.log() will be ignored.
This plugin is not the cause of that, it is a limitation of Android itself.

## Supported Methods

The plugin support following methods of the `mycon` object:

- `mycon.log`
- `mycon.error`
- `mycon.exception`
- `mycon.warn`
- `mycon.info`
- `mycon.debug`
- `mycon.assert`
- `mycon.dir`
- `mycon.dirxml`
- `mycon.time`
- `mycon.timeEnd`
- `mycon.table`

## Partially supported Methods

Methods of the `mycon` object which implemented, but behave different from browser implementation:

- `mycon.group`
- `mycon.groupCollapsed`

The grouping methods are just log name of the group and don't actually indicate grouping for later
calls to `mycon` object methods.

## Not supported Methods

Methods of the `mycon` object which are implemented, but do nothing:

- `mycon.clear`
- `mycon.trace`
- `mycon.groupEnd`
- `mycon.timeStamp`
- `mycon.profile`
- `mycon.profileEnd`
- `mycon.count`

## Supported formatting

The following formatting options available:

Format chars:

*  `%j` - format arg as JSON
*  `%o` - format arg as JSON
*  `%c` - format arg as `''`. No color formatting could be done.
*  `%%` - replace with `'%'`

Any other char following `%` will format its arg via `toString()`.
