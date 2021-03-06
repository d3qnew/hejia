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

Ce plugin est destiné à faire en sorte que mycon.log() est aussi utile que possible. Il ajoute une fonction supplémentaire pour iOS, Ubuntu, Windows Phone 8 et Windows. Si vous êtes satisfait du fonctionnement de mycon.log() pour vous, alors vous avez probablement pas besoin ce plugin.

Ce plugin définit un global `mycon` objet.

Bien que l'objet est dans la portée globale, les fonctions offertes par ce plugin ne sont pas disponibles jusqu'après la `deviceready` événement.

    document.addEventListener (« deviceready », onDeviceReady, false) ;
    function onDeviceReady() {mycon.log ("mycon.log fonctionne bien");}
    

## Installation

    cordova plugin add cordova-plugin-mycon
    

### Quirks Android

Sur certaines plateformes autres que Android, mycon.log() va agir sur plusieurs arguments, tels que mycon.log ("1", "2", "3"). Toutefois, Android doit agir uniquement sur le premier argument. Les arguments suivants à mycon.log() seront ignorées. Ce plugin n'est pas la cause de cela, il s'agit d'une limitation d'Android lui-même.
