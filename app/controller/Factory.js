/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Factory', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'factory.Factorys',
            'factory.MessageList',
            'factory.FactorysMessage'

        ],
        models: [
            'factory.Factory',
            'factory.Message',
            'factory.FactoryMessage'

        ],
        stores: [

            'factory.Factorys',
            'factory.Messages',
            'factory.FactoryMessages'

        ],
        maxPosition: 0,
        scroller: null,
        control: {
            factorysnavview: {
                push: 'onMainPush'
            },
            'factorymessagelistview': {

                /*initialize: function (list) {
                    var me = this,
                        scroller = list.getScrollable().getScroller();

                    scroller.on('maxpositionchange', function (scroller, maxPos, opts) {
                        me.setMaxPosition(maxPos.y);
                    });
                    //console.log(scroller);
                    //testobj=list;
                    me.setScroller(scroller);

                    //me.getMessage().setValue(Ext.create('Chat.ux.LoremIpsum').getSentence());
                },*/
                touchend:'voicetouchend',
                touchstart:'voicetouchbegin'
            },
            factorysview: {
                itemtap: 'onfactorySelect',
                itemtaphold:'onfactoryHold',
                viewshow:'listShow'
            },
            messagelistview: {
                itemtap: 'onMessageListSelect',
                itemtaphold:'onMessageListHold'/*,
                viewshow:'listShow'*/
            },
            sendmessagebtn:{
                tap:'sendMessageControler'
            },
            sendmessagebtnboss:{
                tap:'sendMessageControlerboss'
            }
            ,
            choosepicbtn:{
                tap:'doImgCustomerCLick'
            },
            choosepicbtnboss:{
                tap:'doImgBossCLick'
            }

        },
        refs: {
            factorysview: 'factorylist',
            messagelistview: 'messagelist',
            clientmainview: 'clientmain',
            officemainview: 'officemain',
            workshopview: 'workshopmain',
            bossmainview: 'bossmain',
            factorymessagelistview:'factorymessagelist',
            //messagecontent: '#factorysnavigationview #messagecontent',
            messagecontent: '#messagenavigationview #messagecontent',
            messagecontentboss: 'bossmain #messagecontent',
            //choosepicbtn: '#factorysnavigationview #choosepic',
            choosepicbtn: '#messagenavigationview #choosepic',
            choosepicbtnboss: 'bossmain #choosepic',
            //sendmessagebtn: '#factorysnavigationview #sendmessage',
            sendmessagebtn: '#messagenavigationview #sendmessage',
            sendmessagebtnboss: 'bossmain #sendmessage',
            customersview: '#customersnavigationview #customerlist',
            factorysnavview:'main #factorysnavigationview',
            messagenavview:'clientmain #messagenavigationview'

        }
    },
    voicetouchbegin:function(item){
        if(!this.voiceoverlay){
            this.voiceoverlay = Ext.Viewport.add({
                xtype: 'panel',

                // We give it a left and top property to make it floating by default
                /*left: 0,
                top: 0,*/
                centered:true,

                // Make it modal so you can click the mask to hide the overlay
                modal: true,
                hideOnMaskTap: true,

                // Make it hidden by default
                hidden: true,

                // Set the width and height of the panel
                width: 200,
                height: 140,

                // Here we specify the #id of the element we created in `index.html`
                contentEl: 'content',

                // Style the content and make it scrollable
                styleHtmlContent: true,
                scrollable: true,

                // Insert a title docked at the top with a title
                items: [
                    {
                        //docked: 'top',
                        xtype: 'panel',
                        html:'<div id="voicerecord">正在录音,松开发送...</div>',
                        title: 'Overlay Title'
                    }
                ]
            });

        }

        this.voiceoverlay.show();
        this.makerecording();



    },

    makerecording:function(){
        var me=this;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,gotFS , function(){});
         function gotFS(fileSystem) {

            fileSystem.root.getFile("blank.mp3", {create: true, exclusive: false}, gotFileEntry,  function(){

         });

         function gotFileEntry(fileEntry) {

             me.voicefileentry=fileEntry;
             me.voicerecordsrc=fileEntry.toInternalURL();
             //Ext.Msg.alert("filepath",src);

             me.mediaRec = new Media(me.voicerecordsrc,
             // success callback
             function() {
             //Ext.Msg.alert("success","recordAudio():Audio Success");
             },

             // error callback
             function(err) {
             //console.log("recordAudio():Audio Error: "+ err.code);
             Ext.Msg.alert("success","recordAudio():Audio Success"+ err.code);
             });

             // Record audio
             me.mediaRec.startRecord();

             setTimeout(function() {


             }, 3000);



         }
         }



    },

    voicetouchend:function(item){
        testobj=me;
        var me=this;
        this.voiceoverlay.hide();

        //Ext.Msg.alert('end', me.voicerecordsrc, Ext.emptyFn);
        this.mediaRec.stopRecord();
        me.mediaRec.release();

        //me.getMessagecontent().setValue('<audio  src="'+me.voicerecordsrc+'" controls>')  ;

        var btn=item.down('#sendmessage');

        if(Globle_Variable.factoryinfo)btn.fromtype=1;
        else btn.fromtype=0;

        btn.isfile=true;
        btn.filetype='voice';
        btn.fileurl=me.voicerecordsrc;

        me.applyforfactory(btn,Ext.bind(me.sendMessage, me));

        //me.sendMessageControler(btn);





    },
    doImgBossCLick:function(item){
        this.doImgCLick(item,1)
    },
    doImgCustomerCLick:function(item){
        this.doImgCLick(item,0)
    },
    doImgCLick: function (item,fromtype) {
        var list=item.up('list');
        var btn=list.down('#sendmessage');
        btn.fromtype=fromtype;

        var me = this;
        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '相机拍照',
                    handler: function () {
                        //alert(1);

                        imagfunc('camera');
                    }
                    //ui  : 'decline'
                },
                {
                    text: '图片库',
                    handler: function () {
                        //alert(2);
                        imagfunc('library');
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

        var imagfunc = function (type) {
            actionSheet.hide();
            //var imgpanel = me.getImgpanel();
            //alert(1);
            Ext.device.Camera.capture({
                source: type,
                destination: 'file',
                success: function (imgdata) {

                    //var srcdata="data:image/png;base64,"+imgdata;
                    //me.getMessagecontent().setValue('<img height="200" width="200" src="'+imgdata+'">')  ;
                    btn.isfile=true;
                    btn.filetype='image';
                    btn.fileurl=imgdata;

                    me.applyforfactory(btn,Ext.bind(me.sendMessage, me));

                    //me.sendMessageControler(btn);

                }
            });
        };


    },

    continueAsk:function(btn){
        var me=this;
        var listview=btn.up('list');
        var myinfo= listview.mydata;

        var toinfo=listview.data;
        var successFunc = function (response, action) {

            var res=JSON.parse(response.responseText);

            if(res.success){

                Ext.Msg.show({
                    title:'成功',
                    message: '继续问诊',
                    buttons: Ext.MessageBox.OK,
                    fn:function(){
                        me.sendMessageControler(btn);
                    }
                });


            }else{
                Ext.Msg.alert('失败', res.message,function(){});
            }

        };
        var failFunc=function(response, action){
            Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', function(){

            });
            //Ext.Msg.alert('test', 'test', Ext.emptyFn);
        }
        var url="customer/continuewithapply";
        var params={
            userid:myinfo._id,
            factoryid:toinfo.get("_id")
        };
        CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');


    },
    aliback:function(btn){
        var listview=btn.up('list');
        var myinfo= listview.mydata;

        var toinfo=listview.data;
        var me=this;

        //Ext.Msg.alert('提示', '这里模拟支付宝退款接口', function(){
            //makemoneybyuserid

            var successFunc = function (response, action) {

                var res=JSON.parse(response.responseText);

                if(res.success){

                    Ext.Msg.show({
                        title:'成功',
                        message: '费用已退回',
                        buttons: Ext.MessageBox.OK,
                        fn:Ext.emptyFn
                    });


                }else{
                    Ext.Msg.alert('失败', res.message,function(){

                    });
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', function(){

                });
                //Ext.Msg.alert('test', 'test', Ext.emptyFn);
            }
            var url="customer/backmoneybyuseridwithapply";
            var params={
                userid:myinfo._id,
                factoryid:toinfo.get("_id")
            };
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        //});


    },



    alipay:function(btn){

        var settingsController=this.getApplication().getController('Settings');
        settingsController.showAddMoneyForm(btn);
       /* var listview=btn.up('list');
        var myinfo= listview.mydata;

        var toinfo=listview.data;
        var me=this;

        Ext.Msg.alert('提示', '这里模拟支付宝支付接口', function(){
            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){
                    Ext.Msg.show({
                        title:'成功',
                        message: '现在可以问诊了',
                        buttons: Ext.MessageBox.OK,
                        fn:Ext.emptyFn //任务描述这里可以输入默认信息
                    });

                }else{
                    Ext.Msg.alert('失败', res.message,function(){

                    });
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', function(){

                });
                //Ext.Msg.alert('test', 'test', Ext.emptyFn);
            }
            var url="customer/makemoneybyuseridwithapply";
            var params={
                userid:myinfo._id,
                money:20,
                factoryid:toinfo.get("_id")
            };
            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');

        });*/

    },
    applyforpay:function(myinfo,toinfo,btn){
        var me=this;
        Ext.Msg.confirm('消息','是否现在挂号?',function(buttonId){

            if(buttonId=='yes'){

                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);

                    if(res.success){

                        Ext.Msg.show({
                            title:'成功',
                            message: '现在可以问诊了',
                            buttons: Ext.MessageBox.OK,
                            fn:Ext.emptyFn
                        });
                        //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                    }else{
                        Ext.Msg.alert('失败', res.message,function(){

                            var actionSheet = Ext.create('Ext.ActionSheet', {
                                items: [
                                    {
                                        text: '支付宝支付',
                                        handler:function(){
                                            me.alipay(btn);
                                            actionSheet.hide();
                                        }
                                    },

                                    {
                                        text: '取消',
                                        handler : function() {
                                            actionSheet.hide();
                                        },
                                        ui  : 'confirm'
                                    }
                                ]
                            });

                            Ext.Viewport.add(actionSheet);
                            actionSheet.show();

                        });
                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', function(){


                    });
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url="customer/makeapplyforfactory";
                var params={
                    customerid:myinfo._id,
                    factoryid:toinfo.get("_id")
                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{
                //var view=me.getfactorysnavview();
                //view.pop();
            }


        });
    },
    applyforfactory:function(btn,callback){
        callback(btn);

    },

    showDoctosView:function(message){
        var mainView=this.getMainview();
        mainView.setActiveItem(1);

        var listView=this.getfactorysview();
        var store=listView.getStore();
        var index =this.filterReceiveIndex(message,store);
        listView.select(index);
        listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index));

    },

    sendMessageControler:function(btn){
        var me=this;
        btn.fromtype=0;
        me.applyforfactory(btn,Ext.bind(me.sendMessage, me));
    },
    sendMessageControlerboss:function(btn){
        var me=this;
         //alert(1);
        btn.fromtype=1;

        me.applyforfactory(btn,Ext.bind(me.sendMessage, me));
    },
    scrollMsgList:function(){
        var scroller=this.getScroller();

        var task = Ext.create('Ext.util.DelayedTask', function() {
            scroller.scrollToEnd(true);
        });
        task.delay(500);

    },
    sendMessage:function(btn){
        var me=this;
        //var content=Ext.String.trim(this.getMessagecontent().getValue());
        var message=btn.up('list').down('#messagecontent');
        console.log(btn);
        testobjs=btn;
        var content = Ext.String.trim(message.getValue());

        if((content&&content!='')||btn.isfile){
            var listview=btn.up('list');
            var myinfo= listview.mydata;

            var toinfo=listview.data;
            var imgid='chatstatusimg'+(new Date()).getTime();
            var message=Ext.apply({message:content}, myinfo);
            //console.log(imgid);
            if(!btn.isfile)listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

            //this.scrollMsgList();

            var clientController=this.getApplication().getController('Client');
            var officeController=this.getApplication().getController('Office');
            var bossController=this.getApplication().getController('Boss');

            var socket=null;
            if(clientController.socket)socket=clientController.socket;
            else if(officeController.socket)socket=officeController.socket;
            else if(bossController.socket)socket=bossController.socket;

            /*Ext.Msg.alert('tip',JSON.stringify({
                type:"factorychat",

                to :toinfo.get("_id")
            }));*/
            if(btn.isfile){

                var win = function (r) {
                    //Ext.Msg.alert('seccess',r.response);
                    var res=JSON.parse(r.response);
                    var messagestr="";
                    if(btn.filetype=='image'){
                        messagestr='<img height="200" width="200" src="'+Globle_Variable.serverurl+'files/'+res.filename+'">';
                    }else if(btn.filetype=='voice'){
                        messagestr='<audio  src="'+Globle_Variable.serverurl+'files/'+res.filename+'" controls>';
                    }
                    message.message=messagestr;
                    listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

                    //me.scrollMsgList();

                    socket.send(JSON.stringify({
                        type:"factorychat",
                        from:myinfo._id,
                        fromtype:btn.fromtype,
                        imgid:imgid,
                        ctype:btn.filetype,
                        to :toinfo.get("factoryuser")._id,
                        content: res.filename
                    }));

                    me.voicefileentry.remove(function(){},function(){});

                }

                var fail = function (error) {
                    me.voicefileentry.remove(function(){},function(){});
                    //Ext.Msg.alert('error',"An error has occurred: Code = " + error.code);

                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = btn.fileurl.substr(btn.fileurl.lastIndexOf('/') + 1);

                var ft = new FileTransfer();
                //Ext.Msg.alert('seccess',Globle_Variable.serverurl+'common/uploadfile');
                ft.upload(btn.fileurl, encodeURI(Globle_Variable.serverurl+'common/uploadfile'), win, fail, options);

                btn.isfile=false;


            }else{
                socket.send(JSON.stringify({
                    type:"factorychat",
                    from:myinfo._id,
                    fromtype:btn.fromtype,
                    imgid:imgid,
                    to :toinfo.get("factoryuser")._id,
                    content: content
                }));

            }





        }else{
            CommonUtil.showMessage("no content",true);
        }


    },

    recommendConfirmProcess:function(recommend,e){
        var me = this;
        try {
            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                //id: recommend._id,
                id:me.messageid,
                title: "新买家",
                text:  customerinfo.realname ,

                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: {data: recommend,type:'recommendconfirm'}
            });
            me.messageid++;
            /*cordova.plugins.notification.local.on("click", function (notification) {

             me.receiveQuickApplyShow(notification.data.data, e);

             });*/

        } catch (err) {

            me.receiverecommendConfirmShow(recommend, e);

        } finally {


        }

    },

    receiverecommendConfirmShow:function(recommend, e){
        var mainView = this.getMainview();
        mainView.setActiveItem(1);
       this.initfactoryList();
    },

    receiveRecommendProcess:function(data,e,type){
        //console.log(data);
        //alert("1");
        for(var i=0;i<data.length;i++){
            //alert(i);
            var recommend=data[i];
            //message.message=message.content;
            this.receiveRecommendNotification(recommend,e,type);
        }
        //listView.select(1);
    },

    receiveRecommendNotification:function(recommend,e,type){
        var me=this;
        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                //id: recommend._id ,
                id:me.messageid,
                title:(recommend.rectype==1?"工厂主:"+recommend.frominfo.realname+"推荐":
                "买家:"+recommend.frominfo.realname+"推荐")+(type==0?"新工厂主:"+recommend.factoryinfo.realname:"新买家:"+recommend.customerinfo.realname),
                text: "请求建立关系",
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { data:recommend,type:'recommend'}
            });
            me.messageid++;
            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveRecommendShow(recommend,e);

            });*/

        }catch (err){

            me.receiveRecommendShow(recommend,e,type);

        } finally{


        }


    },
    receiveRecommendShow:function(recommend,e,type){
        //alert(1);
        //console.log(recommend);
        Ext.Msg.confirm('消息','是否添加'+ (recommend.rectype==1?"工厂主:"+recommend.frominfo.realname+"推荐":
        "买家:"+recommend.frominfo.realname+"推荐")+(type==0?"新工厂主:"+recommend.factoryinfo.realname:"新买家:"+recommend.customerinfo.realname),function(buttonId){

            if(buttonId=='yes'){

                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);

                    if(res.success){

                        Ext.Msg.show({
                            title:'成功',
                            message: (recommend.isfactoryaccepted||recommend.iscustomeraccepted)?'已成功添加'+(type==0?"工厂主":"买家"):
                                '已接受推荐，等待对方同意',
                            buttons: Ext.MessageBox.OK,
                            fn:Ext.emptyFn
                        });
                        //Ext.Msg.alert('成功', '已接受推荐，等待对方同意', Ext.emptyFn);

                    }else{
                        Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    }

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                }
                var url=(type==0?"customer/acceptrecommend":"factory/acceptrecommend");
                var params={
                    rid:recommend._id
                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{
                //var view=me.getfactorysnavview();
                //view.pop();
            }


        });



    },
    onfactoryHold:function(list,index, target, record, e) {
        //long customer hold
        var me=this;
        list.lastTapHold = new Date();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐买家',
                    handler:function(){
                        me.showcustomerList(record);
                        actionSheet.hide();
                    }
                },

                {
                    text: '取消',
                    handler : function() {
                        actionSheet.hide();
                    },
                    ui  : 'confirm'
                }
            ]
        });

        Ext.Viewport.add(actionSheet);
        actionSheet.show();

    },
    onMainPush: function (view, item) {
        //this.getfactorysnavview().deselectAll();
    },
    listShow:function(view){
        var store=view.getStore();

        store.load({
            //define the parameters of the store:
            params:{
                customerid : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {
            }});
    },
    messageView:{},

    onMessageListSelect:function(list,index,node,record){
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {
            console.log(record);

            if (!this.messageView[record.get('factoryuser')._id]){
                this.messageView[record.get('factoryuser')._id] =Ext.create('SpinningFactory.view.factory.FactorysMessage');

            }
            var selectview=this.messageView[record.get('factoryuser')._id];
            selectview.setTitle(record.get('factoryuser').realname);
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;
            if(this.getMessagenavview())this.getMessagenavview().push(selectview);
            else if(this.getBossmainview())this.getBossmainview().push(selectview);

        }
    },
    onfactorySelect: function (list, index, node, record) {
        //console.log(record);

        var me=this;

        me.getClientmainview().setActiveItem(2);
        var messagelist=me.getMessagelistview();
        var store=messagelist.getStore();

        try {

            var data=store.data.items;
            var flag=false;
            for(var i=0;i<data.length;i++){
                if(data[i].data.fromid==record.data.factoryuser._id){
                    flag=true;
                    messagelist.select(i);
                    messagelist.fireEvent('itemtap',messagelist,i,messagelist.getActiveItem(),store.getAt(i));
                    break;
                }

            }
            if(!flag){
                record.data.fromid=record.data.factoryuser._id;
                store.add(record.data);
                var index=data.length-1;
                messagelist.fireEvent('itemtap',messagelist,index,messagelist.getActiveItem(),store.getAt(index));

            }

        }catch(e){

        }





        /*if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView[record.get('factoryuser')._id]){
                this.messageView[record.get('factoryuser')._id] =Ext.create('SpinningFactory.view.factory.FactorysMessage');

            }
            var selectview=this.messageView[record.get('customerinfo')._id];
            //var messageView=Ext.create('factoryApp.view.factorys.factoryMessage');
            selectview.setTitle(record.get('customerinfo').realname);
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;
            this.getcustomersnavview().push(selectview);

        }*/



        /*if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {
            console.log(record);

            if (!this.messageView[record.get('_id')]){
                this.messageView[record.get('_id')] =Ext.create('SpinningFactory.view.factory.factorysMessage');

            }
            var selectview=this.messageView[record.get('_id')];
            testobj=this;

            selectview.setTitle(record.get('userinfo').realname);
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;

            console.log("this.getfactorysnavview().getItems()");
            console.log(this.getfactorysnavview().getItems());
            testobj=this.getfactorysnavview();

            this.getfactorysnavview().push(selectview);


        }
*/


        // Push the show contact view into the navigation view

    },
    receiveMessageProcess:function(data,e){
        for(var i=0;i<data.length;i++){
            var message=data[i];
            message.message=message.content;
            if(message.type=='image'){
                message.message='<img height="200" width="200" src="'+Globle_Variable.serverurl+'files/'+message.content+'">';
            }else if(message.type=='voice'){
                message.message='<audio  src="'+Globle_Variable.serverurl+'files/'+message.content+'" controls>';
            }
            //console.log(1111111111);
            //console.log(message);
            this.receiveMessageNotification(message,e);
        }
        //listView.select(1);
    },
    messageid:0,
    receiveMessageNotification:function(message,e){

        var me=this;
        try {

            if(Globle_Variable.isactived){
                me.receiveMessageShow(message,e);

            }else{

                (function(message,cid){

                    cordova.plugins.notification.local.schedule({
                        //id: message._id,
                        id: cid,
                        title: (message.fromtype==0?'病友 ':'工厂主 ')+ message.userinfo.realname+' 来消息啦!' ,
                        text: message.message,
                        //firstAt: monday_9_am,
                        //every: "week",
                        //sound: "file://sounds/reminder.mp3",
                        //icon: "http://icons.com/?cal_id=1",
                        data: { data: message }
                    });


                } )(message,me.messageid)  ;
                me.messageid++;

            }



        }catch (err){
            console.log("33333333333333") ;
           me.receiveMessageShow(message,e);

        } finally{


        }


    },

    messageshowfinal:function(message){
        var factoryController=this.getApplication().getController('Factory');
            //Ext.Msg.alert('clicked event',JSON.stringify(message));
        var messagestore=factoryController.messageView[message.fromid].getStore();

        messagestore.add(Ext.apply({local: false}, message));
        //alert(3);

    },
    receiveMessageShow:function(message,e){
        var me=this;
        //console.log(message);
        try{

            var listView=null;
            var messagestore=null;

            if(me.getBossmainview()){

                /*var bossontroller=this.getApplication().getController('Boss');
                bossontroller.returnhomemenuFunc();*/

                testobjss=me.getBossmainview();
                var nav=me.getBossmainview();
                if(nav.getInnerItems()[nav.getInnerItems().length-1].xtype=='factorymessagelist'){

                }else{
                    /*nav.pop(nav.getInnerItems().length - 1);
                    var length=nav.getInnerItems().length - 1;*/
                    while(nav.getInnerItems().length>2){
                        nav.removeAt(nav.getInnerItems().length-1);
                    }

                    nav.down('#mymessages').fireEvent('tap');
                }

                //nav.pop()me.getBossmainview()
                //alert(1);
                //this.getBossmainview().fireEvent('itemtap')


            }else if(me.getClientmainview()){
                me.getClientmainview().setActiveItem(2);





            }

            var messagelist=me.getMessagelistview();
            var store=messagelist.getStore();
            var data=store.data.items;
            var flag=false;
            for(var i=0;i<data.length;i++){
                if(data[i].data.fromid==message.fromid){
                    flag=true;
                    messagelist.select(i);
                    messagelist.fireEvent('itemtap',messagelist,i,messagelist.getActiveItem(),store.getAt(i));
                    break;
                }

            }
            if(!flag){
                message.factoryuser=message.userinfo;
                message.factoryinfo=message.userinfo;
                console.log("message");
                console.log(message);
                store.add(message);
                testobj=store;
                var index=data.length-1;
                messagelist.fireEvent('itemtap',messagelist,index,messagelist.getActiveItem(),store.getAt(index));

            }
        }catch(err){

        }finally{

            me.messageshowfinal(message);
        }





            /*if(message.fromtype==0){

                mainView.setActiveItem(0);
                listView=this.getcustomersview();


            }else{
                mainView.setActiveItem(1);
                listView=this.getfactorysview();
            }
            var store=listView.getStore();

            var flag=true;
            //console.log(store.data);
            var index=0;
            for(var i=0;i<store.data.items.length;i++){
                var fromid=message.fromtype==1?store.data.items[i].get('_id'):store.data.items[i].get('customerinfo')._id
                if(message.fromid==fromid){
                    flag=false;
                    index=i;
                    break;
                }
            }
            if(flag){
                //message.userinfo.realname="<div style='color: #176982'>(New)</div>"+message.userinfo.realname;
                //store.insert(0,[message]);
                //index=store.data.items.length;
                message._id=message.fromid;
                store.add(message);
                index =me.filterReceiveIndex(message,store);

            }



            //var index =this.filterReceiveIndex(message,store);
            var nav =listView.getParent();



            if(nav.getItems().length==3&&message.fromid!=(message.fromtype==1?nav.getActiveItem().data.get('_id'):nav.getActiveItem().data.get('customerinfo')._id)){
                nav.pop();
                setTimeout(function(){
                    try{
                        listView.select(index);
                        listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);

                    }catch(err){

                    }finally{

                        me.messageshowfinal(message);
                    }

                },500);
            }
            else{
                listView.select(index);
                listView.fireEvent('itemtap',listView,index,listView.getActiveItem(),store.getAt(index),e);

            }
            //alert(1);*/


    },
    filterReceiveIndex:function(data,store){
        var listdata=store.data.items;
        var index=0;
        for(var i=0;i<listdata.length;i++){
            if(listdata[i].get("_id")==data.fromid){
                index=i;
                break;
            }
        }
        return index;
    },
    initfactoryList:function(){

        var store=Ext.getStore('factorys');
        store.load({
            //define the parameters of the store:
            params:{
                customerid : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    }


});