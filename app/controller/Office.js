/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Office', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'menu.MainMenu',
            'office.GoodsViewList',
            'office.OrdersViewList',
            'office.GoodsPicsView',
            'office.OfficeMain',
            'office.NewGoodsForm',
            'office.OrderDetailForm',
            'office.EditGoodsForm'
        ],
        models: [
            'office.GoodView',
            'office.OrderView'
        ],
        stores: [
            'office.GoodViews',
            'office.OrderViews'

        ],
        control: {
            officemainview:{
                initialize:'initFunc',
                returnhomemenu:'returnhomemenuFunc',
                showqrcode:'showqrcodeFunc',
                logoutmenu:'logoutShow',
                showabout:'showaboutFunc',
                loginmenu:'loginShow'


            },
            goodsviewlistview:{

                viewshow:'viewinit',
                itemtap: 'onGoodsSelect'
            },

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
            delpicturebtn:{
                tap:'delImgCLick'
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
        backorderbtn:{
            tap:'backorder'
        },
            finishorderbtn:{
                tap:'finishorder'
            }

        },
        refs: {
            officemainview: 'officemain',
            newgoodsbtn: 'officemain #newgoods',
            managerpicbtn: 'officemain #managerpic',
            uploadpicturebtn: 'goodspicsview #uploadpicture',
            cancelpicturebtn: 'goodspicsview #cancelpicture',
            delpicturebtn: 'goodspicsview #delpicture',
            goodsviewlistview: 'goodsviewlist',
            ordersviewlistview: 'ordersviewlist',
            newgoodsformview:'newgoodsform',
            editgoodsformview:'editgoodsform',
            savegoodinfobtn:'newgoodsform #savegoodinfo',
            sendtoworkbtn:'orderdetailform #sendtowork',
            finishorderbtn:'orderdetailform #finishorder',
            backorderbtn:'orderdetailform #backorder',
            altergoodinfobtn:'editgoodsform #savegoodinfo',
            navView:'officemain #villagenavigationview',
            ordernavView:'officemain #ordernavigationview'
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

    backorder:function(btn){
        var form=btn.up('formpanel');
        var data=form.getValues();
        var me=this;
        //alert(data.status);
        if(data.status==4){
            Ext.Msg.alert("提示","已经完成订单不能退回");
            return ;

        }

        var successFunc = function (response, action) {

            var res=JSON.parse(response.responseText);

            if(res.success){
                //me.makegoodnum(data);
                Ext.Msg.alert('成功', '订单已退回客户修改', Ext.emptyFn);
                me.getOrdernavView().pop();

            }else{
                //Ext.Msg.alert('失败', '绣', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="factory/changestatusbyid";
        var params={
            status:5,
            oid:data._id
        };
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');




    },

    sendtowork:function(btn){
        //alert(1);

        var form=btn.up('formpanel');
        var data=form.getValues();
        console.log(data);
        if(data.status>=1){
            Ext.Msg.alert('提示', '已提交过,请勿重复提交', Ext.emptyFn);
            return;
        }
        var me=this;
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                Ext.Msg.alert('成功', '提交工厂成功', Ext.emptyFn);
                me.getOrdernavView().pop();

            }else{
                Ext.Msg.alert('失败', '提交工厂出错', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="factory/sendtowork";
        var params=data;
        params.oid=data._id;

        //params.gid=Globle_Variable.factoryinfo._id;
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

    },

    finishorder:function(btn){

        var form=btn.up('formpanel');
        var data=form.getValues();
        var me=this;
        if(data.status==4){
            Ext.Msg.alert("提示","已完成的订单");
            return ;

        }
        if(data.hasnum-data.num<0){
            Ext.Msg.alert("提示","库存不足无法完成订单");
        }
        else{

            var successFunc = function (response, action) {

                var res=JSON.parse(response.responseText);

                if(res.success){
                    me.makegoodnum(data);

                }else{
                    //Ext.Msg.alert('失败', '绣', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/changestatusbyid";
            var params={
                status:4,
                oid:data._id
            };
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');










        }

    },

    makegoodnum:function(data){
        var me=this;
        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){

                Ext.Msg.alert('成功', '完成订单', Ext.emptyFn);
                me.getOrdernavView().pop();


            }else{
                //Ext.Msg.alert('失败', '绣', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        // console.log(data);
        var url="factory/makegoodnumsbyid";
        var params={
            num:(0-data.num),
            factoryid:data.factoryid,
            goodsid:data.gid
        };

        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');


    },
    cancelImgCLick:function(btn){
        this.overlay.hide();



        /*if(!this.altergoodlView){
            this.altergoodlView=Ext.create('SpinningFactory.view.office.EditGoodsForm');
        }
        //this.altergoodlView.setTitle(record.get('name'));
        this.altergoodlView.pics=data.imgs.split(",");
        this.altergoodlView.setValues(data);
        nav.push(this.altergoodlView);*/


    },

    onOrdersSelect:function(list,index,node,record){


        var nav=this.getOrdernavView();
        var me=this;

        console.log(record.data);

        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            if(res.success){
                var data=res.data;

                if(!me.orderdetailView){
                    me.orderdetailView=Ext.create('SpinningFactory.view.office.OrderDetailForm');
                }
                //this.altergoodlView.setTitle(record.get('name'));

                var formdata=record.data;
                formdata.gid=record.data.goodinfo._id;
                formdata.goodsname=record.data.goodinfo.goodsname;
                console.log("formdata")
                //formdata.gid=record.data.goodinfo._id;
                if(data.length==0)formdata.hasnum=0;
                else formdata.hasnum=data[0].num;
                me.orderdetailView.setValues(formdata);
                nav.push(me.orderdetailView);

            }else{
                Ext.Msg.alert('失败', '获取库存失败', Ext.emptyFn);
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        }
        var url="factory/gethasnumbygid";
        var params={
            gid:record.data.goodinfo._id

        };

        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');


    },
    onGoodsSelect:function(list, index, node, record){

        var nav=this.getNavView();
        var me=this;

        //alert(1);
        console.log(record);
        var data=record.data;
        data.gid=data._id;
        if(!this.altergoodlView){
            this.altergoodlView=Ext.create('SpinningFactory.view.office.EditGoodsForm');
        }
        //this.altergoodlView.setTitle(record.get('name'));
        this.altergoodlView.pics=data.imgs.split(",");
        this.altergoodlView.setValues(data);
        nav.push(this.altergoodlView);
    },

    altergood:function(btn){

        var formpanel=btn.up('formpanel');
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.office.GoodView', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    me.getNavView().pop();
                    var store=me.getGoodsviewlistview().getStore();
                    store.load({
                        //define the parameters of the store:
                        params:{
                            factoryid : Globle_Variable.user.factoryid,
                            status:'0,1,2,3,4,5'
                        },
                        scope: this,
                        callback : function(records, operation, success) {

                        }});
                }else{
                    Ext.Msg.alert('添加失败', '修改货物出错', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/altergoodsbyfid";
            var params=formpanel.getValues();
            params.imgs=formpanel.pics.join(",");
            params.factoryid=Globle_Variable.factoryinfo._id;
            //params.gid=Globle_Variable.factoryinfo._id;
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }

    },
    savenewgood:function(btn){
        var formpanel=btn.up('formpanel');
        CommonUtil.addMessage();
        var me=this;
        var valid = CommonUtil.valid('SpinningFactory.model.office.GoodView', formpanel);
        if(valid){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    me.getNavView().pop();
                    var store=me.getGoodsviewlistview().getStore();
                    store.load({
                        //define the parameters of the store:
                        params:{
                            factoryid : Globle_Variable.user.factoryid,
                            status:'0,1,2,3,4,5'
                        },
                        scope: this,
                        callback : function(records, operation, success) {

                        }});
                }else{
                    Ext.Msg.alert('添加失败', '添加货物出错', Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

            }
            var url="factory/addgoodsbyfid";
            var params=formpanel.getValues();
            if(!formpanel.pics)formpanel.pics='';
            params.imgs=formpanel.pics.join(",");
            params.factoryid=Globle_Variable.factoryinfo._id;
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        }


    },
    delImgCLick:function(btn){

        var form=btn.up('goodspicsview');
        var picform=form.picform;
        var carousel=this.overlay.down('carousel');
        testobj=carousel;
        //console.log(carousel.getActiveIndex( ));
        Ext.Msg.confirm( "提示", "是否确认删除当前图片", function(btn){
            if(btn==='yes'){
                var pics=picform.pics;
                var src=carousel.getActiveItem().get('src').split(Globle_Variable.serverurl)[1];
                for(var i=0;i<pics.length;i++){
                    if(src==pics[i]){
                        Ext.Array.remove(pics,pics[i]);
                        carousel.remove(carousel.getActiveItem());
                        break;
                    }
                }

                //carousel.removeAt(carousel.getActiveIndex());
            }else{

            }
        })
    },
    doImgCLick: function (btn) {
        var form=btn.up('goodspicsview');
        var picform=form.picform;

        var me = this;

        console.log(picform);
        testobj=me;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '相机拍照',
                    hidden:true,
                    handler: function () {
                        imagfunc('camera');
                    }
                    //ui  : 'decline'
                },
                {
                    text: '图片库',
                    hidden:true,
                    handler: function () {
                        imagfunc('library');
                    }
                },
                {
                    text: '选择图片',
                    xtype: 'filefield',
                    accept:'image',
                    multiple:true,
                        listeners: {

                        change: function (button, newValue, oldValue, eOpts) {
                            Ext.Msg.confirm( "提示", "是否确认上传图片", function(btn){
                                if(btn==='yes'){

                                    if(newValue){
                                        var fs=require('fs');
                                        var request = require('request');
                                        //alert(newValue);
                                        var files=newValue.split(";");
                                        var failnum=0;
                                        var uploadfunc=function(index){
                                            if(index==files.length){
                                                Ext.Viewport.mask({ xtype: 'loadmask',
                                                    message: "上传图片完成.."+(files.length-failnum)+"/"+files.length });
                                                setTimeout(function(){
                                                    Ext.Viewport.unmask();
                                                },2000);

                                            }else{
                                                Ext.Viewport.mask({ xtype: 'loadmask',
                                                    message: "上传图片完成.."+(index-failnum+1)+"/"+files.length });
                                                var formData = {
                                                    // Pass a simple key-value pair
                                                    fileName: 'my_value',
                                                    // Pass data via Streams
                                                    file: fs.createReadStream(files[index])

                                                    // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
                                                    // Use case: for some types of streams, you'll need to provide "file"-related information manually.
                                                    // See the `form-data` README for more information about options: https://github.com/felixge/node-form-data

                                                };
                                                request.post({url:Globle_Variable.serverurl+'common/uploadfile', formData: formData}, function optionalCallback(err, httpResponse, body) {
                                                    if (err) {
                                                        console.log(err);
                                                        failnum++;

                                                        //alert("上传图片错误,请稍后再试");
                                                    }
                                                    uploadfunc(index+1);
                                                    var res=JSON.parse(body);
                                                    var path='files/'+res.filename;
                                                    var url=Globle_Variable.serverurl+path;
                                                    picform.pics.push(path);
                                                    var carousel=me.overlay.down('carousel');

                                                    carousel.add(
                                                        {
                                                            xtype: 'image',
                                                            src: url
                                                        }
                                                    );
                                                    //console.log('Upload successful!  Server responded with:', body);
                                                });

                                            }




                                        };
                                        if(files.length>0){
                                            Ext.Viewport.mask({ xtype: 'loadmask',
                                                message: "上传图片中..0/"+files.length });
                                            uploadfunc(0);
                                        }
                                        /*for(var i=0;i<files.length;i++){


                                        }*/
                                        actionSheet.hide();
                                    }

                                }else{

                                }
                            });
                            //alert(newValue);


                            /**/
                        }
                    },
                    handler: function () {
                        imagfuncdesktop();
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
        //testobj=me;


        var imagfuncdesktop=function(){

        };

        var imagfunc = function (type) {
            actionSheet.hide();

            //alert(1);
            Ext.device.Camera.capture({
                source: type,
                destination: 'file',
                //encoding:'png',
                success: function (imgdata) {
                    //show the newly captured image in a full screen Ext.Img component:
                    //var a=Ext.getCmp('imagerc');
                    //imgpanel.setSrc("data:image/png;base64,"+imgdata);

                    var win = function (r) {
                        //Ext.Msg.alert('seccess',r.response);
                        var res=JSON.parse(r.response);
                        var path='files/'+res.filename;
                        var url=Globle_Variable.serverurl+path;
                        picform.pics.push(path);
                        var carousel=me.overlay.down('carousel');

                        carousel.add(
                                {
                                    xtype: 'image',
                                    src: url
                                }
                        );
                        //carousel.setActiveItem(0);

                    }

                    var fail = function (error) {

                    };

                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = imgdata.substr(imgdata.lastIndexOf('/') + 1);

                    var ft = new FileTransfer();
                    //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                    ft.upload(imgdata, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);


                }
            });
        };


    },

    shownmanagerpicview:function(btn){

        var me=this;
        //var picform=this.getNewgoodsformview();
        var picform=btn.up('formpanel');
        if(!picform.pics){
            //picform.pics=['files/14296004957076511'];
            picform.pics=[];
        }
        var showpicsview=Ext.create('SpinningFactory.view.office.GoodsPicsView');

        showpicsview.picform=picform;

        var carousel=showpicsview.down('carousel');

        /*carousel.add(
            [

                {
                    xtype: 'image',
                    src: Globle_Variable.serverurl+'files/14296004957076511'

                }
            ]
        );*/

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
    shownewgoodsform:function(btn){

        if(!this.goodsform)this.goodsform=Ext.create('SpinningFactory.view.office.NewGoodsForm');
        this.getNavView().push(this.goodsform);

    },
    viewinit:function(view){
        var store=view.getStore();
        store.load({
            //define the parameters of the store:
            params:{
                factoryid : Globle_Variable.user.factoryid,
                status:'0,1,2,3,4,5'
            },
            scope: this,
            callback : function(records, operation, success) {

            }});
    },
    returnhomemenuFunc:function(){
        Ext.Viewport.hideMenu('right');
        var nav=this.getOfficemainview();

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

                var officeview=me.getOfficemainview();
                var ordersviewlist=officeview.down('#ordersviewlist');

                if(ordersviewlist)ordersviewlist.getStore().load({
                    //define the parameters of the store:
                    params:{
                        factoryid : Globle_Variable.user.factoryid,
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