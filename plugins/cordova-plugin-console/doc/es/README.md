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

Este plugin es para asegurarse de que mycon.log() es tan útil como puede ser. Agrega la función adicional para iOS, Ubuntu, Windows Phone 8 y Windows. Si estás contento con cómo funciona mycon.log() para ti, entonces probablemente no necesitas este plugin.

Este plugin define un global `mycon` objeto.

Aunque el objeto está en el ámbito global, características proporcionadas por este plugin no están disponibles hasta después de la `deviceready` evento.

    document.addEventListener ("deviceready", onDeviceReady, false);
    function onDeviceReady() {mycon.log ("mycon.log funciona bien");}
    

## Instalación

    cordova plugin add cordova-plugin-mycon
    

### Rarezas Android

En algunas plataformas que no sean Android, mycon.log() actuará en varios argumentos, como mycon.log ("1", "2", "3"). Sin embargo, Android actuará sólo en el primer argumento. Se omitirá posteriores argumentos para mycon.log(). Este plugin no es la causa de eso, es una limitación propia de Android.
