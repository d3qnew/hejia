/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


//以app为入口，监听<div id="deviceready">标签的load事件



var app = {
    // Application Constructor 构造函数

    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);


    }, //   deviceready事件处理程序　这是事件的范围。为了调用“receivedEvent” 函数,我们必须显式地称之为“app.receivedEvent(…)
    onDeviceReady: function () {
        //LocalFileSystem.PERSISTENT需要onDeviceReady事件
        //DirectoryEntry.root.getDirectory 使用本地存储根目录
        app.receivedEvent('deviceready');

        //设置文件存储目录
        switch (cordova.platformId) {
            case 'windows':
                app.datadir = cordova.file.dataDirectory;
                break;

            case 'android':
                app.datadir = cordova.file.externalRootDirectory;
                break;

            case 'ios':
                app.datadir = cordova.file.documentsDirectory;
                break;
        }

        app.writetype = LocalFileSystem.PERSISTENT;

        window.requestFileSystem(1, 0, callbackdir, err);
        function callbackdir(fssystem) {
            fssystem.root.getDirectory("hejiadan", { create: true }, no, err);

        }








        //邮件事务预处理 
        //console.log(cordova.plugins.email);
    }, // Update DOM on a Received Event  接收事件后更新DOM

    receivedEvent: function (id) {


        //这里建立一个本机存储根目录下的hejiadan文件夹

        function err(error) {                      //报错函数
            console.log("Failed to create file:" + error.code);
        }


    },
};
app.initialize();   //启动app构造函数



$(function () {
    // 设置jQuery Ajax全局的参数  
    $.ajaxSetup({
        type: "POST",
        async: false,
        cache: false,
        error: function (jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case (500):
                    console.log("服务器系统内部错误");
                    break;
                case (401):
                    console.log("未登录");
                    break;
                case (403):
                    console.log("无权限执行此操作");
                    break;
                case (408):
                    console.log("请求超时");
                    break;
                default:
                    console.log("未知错误");
            }
        }

    });








});


var no = function () { }
var err = function (err) { console.log(err) }