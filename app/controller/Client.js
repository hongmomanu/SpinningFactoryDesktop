/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Client', {
    extend: 'Ext.app.Controller',
    config: {
        views: [

            'client.ClientMain',
            'client.GoodsOrder',
            'client.GoodsDetail',
            'client.GoodsPicsView',
            'menu.MainMenu',
            'client.GoodsViewList'

        ],
        models: [
            'client.ClientGoodView'
        ],
        stores: [
            'client.ClientGoodViews'

        ],
        control: {
            clientmainview:{
                initialize:'initFunc',
                returnhomemenu:'returnhomemenuFunc',
                showqrcode:'showqrcodeFunc',
                logoutmenu:'logoutShow',
                showabout:'showaboutFunc',
                loginmenu:'loginShow'


            },
            managerpicbtn:{
                tap:'shownmanagerpicview'
            },
            goodsdetailchatbtn:{
                tap:'showngoodsdetailchatview'
            },
            goodsdetailorderbtn:{
                tap:'showngoodsdetailorderview'
            },
            goodsordersendbtn:{
                tap:'sendorder'
            },
            goodsordercancelbtn:{
                tap:'cancelorder'
            },
            clientgoodssearchbtn:{
                tap:'goodsearch'
            },
            clientgoodsviewlistview:{

                viewshow:'viewinit',
                itemtap: 'onGoodsSelect'
            }

        },
        refs: {
            clientmainview: 'clientmain',
            clientgoodsviewlistview: 'clientgoodsviewlist',
            clientgoodssearchbtn: 'clientgoodsviewlist #search',

            goodsdetailview:'goodsdetail',
            goodsdetailchatbtn:'goodsdetail #chat',
            goodsordersendbtn:'goodsorder #ordersend',
            goodsordercancelbtn:'goodsorder #ordercancel',
            goodsdetailorderbtn:'goodsdetail #ordergood',
            managerpicbtn: 'clientmain #managerpic',
            messagelist: 'clientmain #messagelist',

            navView:'clientmain #villagenavigationview'
        }
    },
    // app init func

    initFunc:function (item,e){


        item.getTabBar().add({
            //xtype: 'button',
            xtype:'mainmenu',
            ui: 'confirm',
            iconCls:'fa fa-cog fa-color-blue'

        });
        this.websocketInit();

    },
    goodsearch:function(btn){
        //alert(1);
        var viewlist=btn.up('clientgoodsviewlist');
        this.viewinit(viewlist);
    },
    sendorder:function(btn){
        var form=btn.up('formpanel');
        var formvalues=form.getValues();
        var me=this;
        formvalues.fromid=Globle_Variable.user._id;
        var successFunc = function (response, action) {

            var res=JSON.parse(response.responseText);
            if(res.success){

                Ext.Msg.alert('提示', "提交订单成功", Ext.emptyFn);

                me.getNavView().pop();

            }else{
                Ext.Msg.alert('提示', res.message, Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            //Ext.Msg.alert('test', 'test', Ext.emptyFn);
        }
        var url="customer/makeorderbyid";

        var params=formvalues;
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');




    },
    cancelorder:function(btn){
        this.getNavView().pop();

    },

    showngoodsdetailorderview:function(btn){
        testobj=btn;
        var form=btn.up('formpanel');
        var formvalues=form.getValues();

        var data=formvalues;
        //data.gid=data._id;
        if(!this.clientgoodlorderView){
            this.clientgoodlorderView=Ext.create('SpinningFactory.view.client.GoodsOrder');
        }
        //this.altergoodlView.setTitle(record.get('name'));
        var nav=this.getNavView();

        this.clientgoodlorderView.setValues(data);
        nav.push(this.clientgoodlorderView);


    },

    showngoodsdetailchatview:function(btn){


        var form=btn.up('formpanel');
        var formvalues=form.getValues();
        var factoryid=formvalues.factoryid;
        var userid=Globle_Variable.user._id;
        var me=this;
        var successFunc = function (response, action) {

            var res=JSON.parse(response.responseText);
            if(res.success){
                me.getClientmainview().setActiveItem(2);
                var messagelist=me.getMessagelist();
                var store=messagelist.getStore();

                var data=store.data.items;
                var flag=false;
                for(var i=0;i<data.length;i++){

                    if(data[i].data.fromid==res.factoryuser._id){
                        flag=true;
                        messagelist.select(i);
                        messagelist.fireEvent('itemtap',messagelist,i,messagelist.getActiveItem(),store.getAt(i));
                        break;
                    }

                }
                if(!flag){
                    res.fromid=res.factoryuser._id;
                    store.add(res);
                    var index=data.length-1;
                    messagelist.fireEvent('itemtap',messagelist,index,messagelist.getActiveItem(),store.getAt(index));

                }





            }else{
                Ext.Msg.alert('提示', res.message, Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            //Ext.Msg.alert('test', 'test', Ext.emptyFn);
        }
        var url="factory/getfactoryinfobyid";

        var params={
            factoryid:factoryid
        };
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },
    shownmanagerpicview:function(btn){

        var me=this;
        //var picform=this.getNewgoodsformview();
        var picform=btn.up('formpanel');
        if(!picform.pics){
            picform.pics=['files/14296004957076511'];
        }
        var showpicsview=Ext.create('SpinningFactory.view.client.GoodsPicsView');

        var carousel=showpicsview.down('carousel');


        Ext.each(picform.pics,function(item){
            carousel.add(
                [
                    {
                        xtype: 'image',
                        src: Globle_Variable.serverurl+item
                    }
                ]
            );
        });


        this.overlay = Ext.Viewport.add(showpicsview);
        this.overlay.showBy(btn);




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
                console.log('chatsuc');
                me.hideloadingimg(data.data)

            }else if(data.type=='refresh'){

                var clientview=me.getClientmainview();
                var clientordersviewlist=clientview.down('#clientordersviewlist');

                if(clientordersviewlist)clientordersviewlist.getStore().load({
                    //define the parameters of the store:
                    params:{
                        clientid : Globle_Variable.user._id,
                        status:'0,1,2,3,4,5'
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
                type:"customerconnect",
                content: Globle_Variable.user._id
            }));
        };

    },


    hideloadingimg:function(data){
        //console.log(imgid);
        var factoryController=this.getApplication().getController('Factory');


        var store=factoryController.messageView[data["toid"]].getStore();
        //var store=Ext.getStore('PatientMessages');
        store.data.each(function(a){
            if(a.get('imgid')==data["imgid"]){
                a.set('issend','none');
            }
        });
        factoryController.getMessagecontent().setValue('');
    },

    onGoodsSelect:function(list, index, node, record){

        var nav=this.getNavView();
        var me=this;


        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            //console.log(res);
            if(res.success){
                var data=record.data;
                data.gid=data._id;
                if(!this.clientgoodlView){
                    this.clientgoodlView=Ext.create('SpinningFactory.view.client.GoodsDetail');
                }
                //this.altergoodlView.setTitle(record.get('name'));
                this.clientgoodlView.pics=data.imgs.split(",");
                this.clientgoodlView.setValues(data);
                nav.push(this.clientgoodlView);



            }else{
                Ext.Msg.prompt('提示', '请输入请求信息', function(btn,text) {
                    // text represents the user input value

                    if(btn==='ok'){

                        var successFunc = function (response, action) {

                            var res=JSON.parse(response.responseText);
                            if(res.success){
                                //Ext.Msg.alert('成功', '推荐医生成功', Ext.emptyFn);

                            }else{
                                Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                            }

                        };
                        var failFunc=function(response, action){
                            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                            //Ext.Msg.alert('test', 'test', Ext.emptyFn);

                        }
                        var url="customer/sendmyfactoryTocustomer";

                        var params={
                            customerid:Globle_Variable.user._id,
                            fromcustomerid:Globle_Variable.user._id,
                            factoryid:res.user._id,
                            text:text

                        };
                        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

                    }else{

                    }
                })
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="customer/ismyfactorysbyid";
        var params={customerid:Globle_Variable.user._id,factoryid:record.data.factoryid};
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },




    viewinit:function(view){
        var store=view.getStore();
        var seachinput=view.down('#seachinput');
        //store.setParams({keyword:seachinput.getValue()});
        store.load({
            //define the parameters of the store:
            params:{
                page:1,
                keyword:seachinput.getValue()
            },

            scope: this,
            callback : function(records, operation, success) {
            }});
        store.setParams({page:2,keyword:seachinput.getValue()});
    },
    returnhomemenuFunc:function(){
        Ext.Viewport.hideMenu('right');
        var nav=this.getClientmainview();
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
                    factoryController.receiveRecommendShow(message,e,0);
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
                    localStorage.user=JSON.stringify(res.user);
                    Globle_Variable.user=res.user;
                    if(user.usertype===0){
                        Ext.Viewport.add(Ext.create('SpinningFactory.view.boss.BossMain'));
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
                    Ext.Msg.alert('登录失败', '用户名密码错误', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="user/customerlogin";
            var params=formpanel.getValues();
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    doNewcustomer:function(btn){
        var view=this.getLoginformview();
        var registerView=Ext.create('SpinningFactory.view.register.Register');
        view.push(registerView);
    }
});