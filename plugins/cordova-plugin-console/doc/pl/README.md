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

# cordova-plugin-mycon

[![Build Status](https://travis-ci.org/apache/cordova-plugin-mycon.svg)](https://travis-ci.org/apache/cordova-plugin-mycon)

Ten plugin jest przeznaczona do zapewnienia, że mycon.log() jest tak przydatne, jak to może być. To dodaje dodatkową funkcję dla iOS, Ubuntu, Windows Phone 8 i Windows. Jeśli jesteś zadowolony z jak mycon.log() pracuje dla Ciebie, wtedy prawdopodobnie nie potrzebują tej wtyczki.

Ten plugin definiuje obiekt globalny `mycon`.

Mimo, że obiekt jest w globalnym zasięgu, funkcji oferowanych przez ten plugin nie są dostępne dopiero po turnieju `deviceready`.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        mycon.log("mycon.log works well");
    }
    

## Instalacja

    cordova plugin add cordova-plugin-mycon
    

### Dziwactwa Androida

Na niektórych platformach innych niż Android mycon.log() będzie działać na wielu argumentów, takich jak mycon.log ("1", "2", "3"). Jednak Android będzie działać tylko na pierwszy argument. Kolejne argumenty do mycon.log() będą ignorowane. Ten plugin nie jest przyczyną, że, jest to ograniczenie Androida, sam.
