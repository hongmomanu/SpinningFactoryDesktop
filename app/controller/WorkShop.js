/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.WorkShop', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'menu.MainMenu',

            'workshop.WorkShopMain',
            'workshop.OrdersFinishViewList',
            'workshop.OrdersStatueViewList'
        ],
        models: [
            /*'workshop.GoodView',*/
            'workshop.OrderStatueView'
        ],
        stores: [
            /*'workshop.GoodViews',*/
            'workshop.OrderStatueViews'

        ],
        control: {
            workshopmainview:{
                initialize:'initFunc',
                returnhomemenu:'returnhomemenuFunc',
                showqrcode:'showqrcodeFunc',
                logoutmenu:'logoutShow',
                showabout:'showaboutFunc',
                loginmenu:'loginShow'


            },
            workshoporderslistview:{

                viewshow:'viewinit',
                itemtap: 'onOrdeSelect'
            },
            ordersfinishviewlistview:{

                viewshow:'viewinitfinish'
            }/*,

            ordersviewlistview:{

                viewshow:'viewinit',
                itemtap: 'onOrdersSelect'
            },
            newgoodsbtn:{
                tap:'shownewgoodsform'
            },
            managerpicbtn:{
                tap:'shownmanagerpicview'
            },
            uploadpicturebtn:{
                tap:'doImgCLick'
            },
            cancelpicturebtn:{
                tap:'cancelImgCLick'
            },
            savegoodinfobtn:{
                tap:'savenewgood'
            },
            altergoodinfobtn:{
                tap:'altergood'
            },
            sendtoworkbtn:{
                tap:'sendtowork'
            },
            finishorderbtn:{
                tap:'finishorder'
            }*/

        },
        refs: {
            workshopmainview: 'workshopmain',
            workshoporderslistview: 'ordersstatueviewlist',
            ordersfinishviewlistview: 'ordersfinishviewlist'
            /*newgoodsbtn: 'officemain #newgoods',
            managerpicbtn: 'officemain #managerpic',
            uploadpicturebtn: 'goodspicsview #uploadpicture',
            cancelpicturebtn: 'goodspicsview #cancelpicture',
            goodsviewlistview: 'goodsviewlist',
            ordersviewlistview: 'ordersviewlist',
            newgoodsformview:'newgoodsform',
            editgoodsformview:'editgoodsform',
            savegoodinfobtn:'newgoodsform #savegoodinfo',
            sendtoworkbtn:'orderdetailform #sendtowork',
            finishorderbtn:'orderdetailform #finishorder',
            altergoodinfobtn:'editgoodsform #savegoodinfo',
            navView:'officemain #villagenavigationview',
            ordernavView:'officemain #ordernavigationview'*/
        }
    },
    // app init func

    initFunc:function (item,e){

        this.websocketInit();
        item.getTabBar().add({
            //xtype: 'button',
            xtype:'mainmenu',
            ui: 'confirm',
            iconCls:'fa fa-cog fa-color-blue'

        });

    },


    viewinit:function(view){

        var store=view.getStore();
        store.load({
            //define the parameters of the store:
            params:{
                factoryid : Globle_Variable.user.factoryid,
                status:'0,1,2,3,5'
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    },
    viewinitfinish:function(view){
        var store=view.getStore();
        store.load({
            //define the parameters of the store:
            params:{
                factoryid : Globle_Variable.user.factoryid,
                status:'4'
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    },
    returnhomemenuFunc:function(){
        Ext.Viewport.hideMenu('right');
        var nav=this.getWorkshopmainview();

        nav.setActiveItem(0);

    },
    logoutShow:function(){


        Ext.Msg.confirm( "提示", "是否确认退出", function(btn){
            if(btn==='yes'){
                Globle_Variable.user=null;
                localStorage.user="";
                localStorage.isfactory="";
                var menu=Ext.Viewport.down('mainmenu');
                menu.getMenuItems()[0].hidden=false;
                menu.getMenuItems()[1].hidden=true;
                Ext.Viewport.hideMenu('right');
                Ext.Msg.alert("提示信息","退出成功!",function(){
                    window.location.reload();
                });
            }else{

            }
        })



    },
    makegoodnums:function(data){

        var me=this;
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
               //alert(1);
                me.viewinit(me.getWorkshoporderslistview());

            }else{
                //Ext.Msg.alert('失败', '绣', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="factory/makegoodnumsbyid";
        var params={
            num:(data.num-data.hasnum),
            factoryid:data.factoryid,
            goodsid:data.goodinfo._id
        };

        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
    },

    onOrdeSelect:function(list, index, node, record){

        console.log(record);
        var me=this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '开始生产',
                    hidden:(!(record.data.status==1)),
                    handler: function () {
                        changestaus(2,record.data);
                    }
                    //ui  : 'decline'
                },
                {
                    text: '生产完成',
                    hidden:(!(record.data.status==2)),
                    handler: function () {
                        changestaus(3,record.data);
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        actionSheet.hide();
                    },
                    ui: 'decline'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

        var changestaus = function (type,data) {

            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    Ext.Msg.alert('成功', '操作成功', Ext.emptyFn);
                    actionSheet.hide();
                    if(type==3){
                        me.makegoodnums(data);

                    }else{

                        me.viewinit(list);
                    }

                }else{
                    //Ext.Msg.alert('失败', '绣', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/changestatusbyid";
            var params={
                status:type,
                oid:data._id
            };
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');




        }

    },

    hideloadingimg:function(data){
        //console.log(imgid);
        var factoryController=me.getApplication().getController('Factory');
        var customerController=me.getApplication().getController('Cutomer');
        var store=factoryController.messageView[data["toid"]]?factoryController.messageView[data["toid"]].getStore():
            customerController.messageView[data["toid"]].getStore();
        //var store=Ext.getStore('PatientMessages');
        store.data.each(function(a){
            if(a.get('imgid')==data["imgid"]){
                a.set('issend','none');
            }
        });
        factoryController.getMessagecontent().setValue('');
    },

    websocketInit:function(){
        var url=Globle_Variable.serverurl;
        url=url.replace(/(:\d+)/g,":3003");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;

        this.socket.onmessage = function(event) {
            var data=JSON.parse(event.data);
            var factoryController=me.getApplication().getController('Factory');
            var customerController=me.getApplication().getController('Cutomer');
            if(data.type=='factorychat'){
                //聊天咨询
                console.log("factorychat");
                console.log(data.data);
                factoryController.receiveMessageProcess(data.data,event);
            }
            else if(data.type=='recommend'){
                //推荐
                console.log('recommend');
                console.log(data.data);
                factoryController.receiveRecommendProcess(data.data,event,0);

            }else if(data.type=='recommendconfirm'){

                console.log('recommendconfirm')
                factoryController.recommendConfirmProcess(data.data,event);
            }
            else if(data.type=='quickaccept'){
                //门诊应答
                console.log('quickaccept');

                console.log(data.data);

                customerController.receiveQuickAcceptProcess(data.data,event);


            }
            else if(data.type=='chatsuc'){
                console.log('recommendconfirm');
                me.hideloadingimg(data.data)

            }else if(data.type=='refresh'){

                var workview=me.getWorkshopmainview();
                // var ordersviewlist=workview.down('#ordersviewlist');

                var ordersstatueviewlist=workview.down('#ordersstatueviewlist');
                var ordersfinishviewlist=workview.down('#ordersfinishviewlist');
                if(ordersstatueviewlist)ordersstatueviewlist.getStore().load({
                    //define the parameters of the store:
                    params:{
                        factoryid : Globle_Variable.user.factoryid,
                        status:'0,1,2,3,5'
                    },
                    scope: me,
                    callback : function(records, operation, success) {

                    }})
                if(ordersfinishviewlist)ordersfinishviewlist.getStore().load({
                    //define the parameters of the store:
                    params:{
                        factoryid : Globle_Variable.user.factoryid,
                        status:'4'
                    },
                    scope: me,
                    callback : function(records, operation, success) {

                    }})

            }


        };

        this.socket.onclose = function(event) {

            var d = new Ext.util.DelayedTask(function(){
                me.websocketInit();
            });
            d.delay(5000);
        };
        this.socket.onopen = function() {
            me.socket.send(JSON.stringify({
                type:"factoryconnect",
                content: Globle_Variable.user._id
            }));
        };

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

            var factoryController=this.getApplication().getController('factory');
            var customerController=this.getApplication().getController('customer');
            cordova.plugins.notification.local.on("click", function (notification) {

                var data=JSON.parse(notification.data);
                var message=data.data;
                var type=data.type;
                if(type=='recommend'){
                    factoryController.receiveRecommendShow(message,e);
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
    /*backbuttonListener:function(){
        document.addEventListener("backbutton", onBackKeyDown, false);
        function onBackKeyDown() {
            navigator.Backbutton.goHome(function() {
                //console.log('success')
            }, function() {
                //console.log('fail')
            });
        }

    },*/


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

    }
});