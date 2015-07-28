/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Login', {
    extend: 'Ext.app.Controller',


    config: {

        views: [
         'login.Login'
        ],
        models: [
            'login.Login'
        ],
        stores: [

            //'customers.customers',

            //'Contacts'
        ],
        control: {

            customerloginbtn:{

                tap:'docustomerLogin'
            },
            newcustomerbtn:{

                tap:'doNewcustomer'
            },
            loginformview:{
                initialize:'initFunc'

            }

        },
        refs: {

            customerloginbtn: 'loginform #customerlogin',
            newcustomerbtn: 'loginform #newcustomer',
            loginformcontent:'loginform #loginformcontent',
            loginformview: 'loginform',
            navView:'officemain #villagenavigationview',
            ordernavView:'officemain #ordernavigationview'
        }
    },
    // app init func

    initFunc:function (item,e){
        this.autoLogin();
        this.makeLocationListener();
        this.makeBackGroundListener();
        this.pauseListener();
        this.resumeListener();
        this.backbuttonListener();
        this.initNotificationClick(e);

    },

    makeBackGroundListener:function(){
        document.addEventListener('deviceready', function () {
            // cordova.plugins.backgroundMode is now available

            /*cordova.plugins.backgroundMode.setDefaults({
                text:'e医通',
                ticker:'e医通患者端正在后台运行',
                title:'e医通患者端'
            });

            // Enable background mode
            cordova.plugins.backgroundMode.enable();*/




        }, false);

    },
    initNotificationClick:function(e){




            ///Ext.Msg.alert('clicked event0', 'is clicked');

            var factoryController=this.getApplication().getController('Factory');
            var customerController=this.getApplication().getController('Customer');
            cordova.plugins.notification.local.on("click", function (notification) {

                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    //Ext.Msg.alert('clicked event', type);
                    factoryController.receiveRecommendShow(message,e,(localStorage.isfactory=="factory"?1:0));
                }else if(type=='quickapplying'){
                    villageController.applywaitinginfoShow(message,e)
                }else if(type=='quickaccept'){
                    customerController.receiveQuickAcceptShow(message,e)
                }
                else if(type=='recommendconfirm'){

                    factoryController.receiverecommendConfirmShow(message, e);
                }
                else{
                    factoryController.receiveMessageShow(message,e);
                }


                //(Ext.bind(factoryController.receiveMessageShow, factoryController) (notification.data,e)) ;

            });






    },
    autoLogin:function(){

        if(!localStorage.isfactory){
            var me=this;

            var actionSheet = Ext.create('Ext.ActionSheet', {
                items: [
                    {
                        text: '我是工厂',
                        handler: function () {
                            localStorage.isfactory="factory";
                            actionSheet.hide();
                            me.autoLoginMain();
                        }
                        //ui  : 'decline'
                    },
                    {
                        text: '我是买家',
                        handler: function () {
                            localStorage.isfactory="client";
                            actionSheet.hide();
                            me.autoLoginMain();
                        }
                    }

                ]
            });
            Ext.Viewport.add(actionSheet);
            actionSheet.show();

        }else{
            this.autoLoginMain();
        }



    },
    autoLoginMain:function(){
        var userinfo=JSON.parse(localStorage.user);

        if(userinfo){
            var formpanel=this.getLoginformcontent();
            formpanel.setValues(userinfo);
            this.docustomerLogin();

        }
    },
    pauseListener:function(){
        document.addEventListener("pause", onPause, false);

        function onPause() {
            // Handle the pause event
            //Ext.Msg.alert('停止测试', '停止测试', Ext.emptyFn);
            Globle_Variable.isactived=false;
        }

    },

    resumeListener:function(){
        document.addEventListener("resume", onResume, false);

        function onResume() {
            // Handle the resume event
            //Ext.Msg.alert('恢复测试', Globle_Variable.isactived+'121', Ext.emptyFn);
            Globle_Variable.isactived=true;
        }

    },
    isallnotdisplay:function(backbuttons){
        var flag=true;
        var element=null;
        for(var i=0;i<backbuttons.elements.length;i++){
            if(backbuttons.elements[i].style.display!='none'){
                flag=false;
                element=backbuttons.elements[i];
                break;

            }
        }
        return {flag:flag,element:element}
    },
    backbuttonListener:function(){
        var me=this;
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            document.addEventListener("backbutton", onBackKeyDown, false);
        }
        function onBackKeyDown() {
            var backbuttons=Ext.select('.x-button-back');
            var filteritem=me.isallnotdisplay(backbuttons);
            if(backbuttons.elements.length==0||filteritem.flag){
                Ext.Msg.confirm( "提示", "是否确认退出", function(btn){
                    if(btn==='yes'){
                        navigator.app.exitApp();

                    }else{

                    }
                })
            }else{
                var id=filteritem.element.id;
                var btn=Ext.getCmp(id);
                btn.fireEvent('tap');
            }
            /*if(items.length>1){
                //me.getNav().pop()
            }else{
                Ext.Msg.confirm( "提示", "是否确认退出", function(btn){
                    if(btn==='yes'){
                        navigator.app.exitApp();

                    }else{

                    }
                })
            }*/

        }

    },


    makeLocationListener:function(){

        function onSuccess(position) {
            /*var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
             'Longitude: ' + position.coords.longitude     + '<br />' +
             '<hr />'      + element.innerHTML;*/
            //Ext.Msg.alert('location suc',position.coords.latitude);

            localStorage.lat=position.coords.latitude;
            localStorage.lon=position.coords.longitude;

        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {

            if(!localStorage.lat)localStorage.lat=30.0111;
            if(!localStorage.lon)localStorage.lon=120.0111;
        }
        // Options: throw an error if no update is received every 5 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});

    },
    docustomerLogin:function(btn){

        var formpanel=this.getLoginformcontent();
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.login.Login', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    var user=res.user;
                    Ext.Viewport.removeAt(0);
                    //alert(1);
                    localStorage.user=JSON.stringify(res.user);
                    //console.log(JSON.stringify(res.user))
                    //alert(0);
                    /*for(var item in res.factoryinfo){
                        if (res.factoryinfo[item]==null){
                            delete res.factoryinfo[item];
                        }
                    }*/
                    //localStorage.factoryinfo=JSON.stringify(res.factoryinfo);
                    //console.log(JSON.stringify(res.factoryinfo))
                    //alert(2);
                    Globle_Variable.user=res.user;
                    //alert(4);
                    Globle_Variable.factoryinfo=res.factoryinfo;
                    //alert(5);

                    if(user.usertype===0){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.boss.BossMain'));

                    }else if(user.usertype===1){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.office.OfficeMain'));
                    }else if(user.usertype===2){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.workshop.WorkShopMain'));
                    }else if(user.usertype===3){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.client.ClientMain'));
                    }
                    /*Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('SpinningFactory.view.Main'));
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                    var customerCotroller=me.getApplication().getController('customer');
                    var factoryCotroller=me.getApplication().getController('factory');
                    customerCotroller.initcustomerList();
                    factoryCotroller.initfactoryList();*/


                }else{
                    localStorage.isfactory='';
                    Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                localStorage.isfactory='';
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url=localStorage.isfactory=='factory'?"user/factorylogin":"user/customerlogin";
            var params=formpanel.getValues();
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    doNewcustomer:function(btn){
        var view=this.getLoginformview();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '我是工厂',
                    handler: function () {
                        //localStorage.isfactory="factory";
                        actionSheet.hide();
                        var registerView=Ext.create('SpinningFactory.view.register.Register');
                        view.push(registerView);

                        //me.autoLoginMain();
                    }
                    //ui  : 'decline'
                },
                {
                    text: '我是买家',
                    handler: function () {
                        //localStorage.isfactory="client";
                        actionSheet.hide();
                        var registerView=Ext.create('SpinningFactory.view.register.ClientRegister');
                        view.push(registerView);
                    }
                }

            ]
        });
        Ext.Viewport.add(actionSheet);
        actionSheet.show();


    }
});