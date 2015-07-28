/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.Customer', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'customer.Customers',
            'customer.CustomersMessage'

        ],
        models: [
            'customer.Customer',
            'customer.CustomerMessage'

        ],
        stores: [

            'customer.Customers',
            'customer.CustomerMessages'

        ],
        maxPosition: 0,
        scroller: null,
        control: {
            customersnavview: {
                push: 'onMainPush'

            },
            sendmessagebtn:{
                tap:'sendMessage'
            },
            'customermessagelistview': {
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
            customerssview: {
                itemtap: 'oncustomerSelect',
                itemtaphold:'oncustomerHold',
                viewshow:'listShow'
            },
            choosepicbtn:{
                tap:'doImgCLick'
            }

        },
        refs: {
            customerssview: '#customersnavigationview #customerlist',
            customermessagelistview:'customermessagelist',
            factorysview: '#factorysnavigationview #factorylist',

            choosepicbtn: '#customersnavigationview #choosepic',

            mainview:'main',
            sendmessagebtn: '#customersnavigationview #sendmessage',
            messagecontent: '#customersnavigationview #messagecontent',
            customersnavview:'main #customersnavigationview'
        }
    },
    doImgCLick:function(item){

        var list=item.up('list');
        var btn=list.down('#sendmessage');
        //testobj=btn;
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

                    me.sendMessage(btn);

                }
            });
        };
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
                        html:'<div id="voicerecordtocustomer">正在录音,松开发送...</div>',
                        title: 'Overlay Title'
                    }
                ]
            });

        }

        this.voiceoverlay.show();
        this.makerecording();



    },
    voicetouchend:function(item){
        var me=this;
        this.voiceoverlay.hide();

        //Ext.Msg.alert('end', me.voicerecordsrc, Ext.emptyFn);
        this.mediaRec.stopRecord();
        me.mediaRec.release();

        //me.getMessagecontent().setValue('<audio  src="'+me.voicerecordsrc+'" controls>')  ;

        var btn=item.down('#sendmessage');

        btn.isfile=true;
        btn.filetype='voice';
        btn.fileurl=me.voicerecordsrc;

        me.sendMessage(btn);





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



    sendMessage:function(btn){


        var me=this;
        var message=btn.up('list').down('#messagecontent');
        var content = Ext.String.trim(message.getValue());
        //var content=Ext.String.trim(this.getMessagecontent().getValue());

        if((content&&content!='')||btn.isfile){
            var listview=btn.up('list');
            var myinfo= listview.mydata;

            var toinfo=listview.data;
            var imgid='chatstatusimg'+(new Date()).getTime();
            var message=Ext.apply({message:content}, myinfo);
            //console.log(imgid);
            if(!btn.isfile)listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));
            //listview.getStore().add(Ext.apply({local: true,imgid:imgid}, message));

            var factoryController=this.getApplication().getController('factory');
            //(Ext.bind(factoryController.scrollMsgList, this) ());


            /*var d = new Ext.util.DelayedTask(function(){
                //me.websocketInit();
                var img=Ext.get(imgid);
                if(img.getStyleValue('display')!=='none'){
                    img.dom.setAttribute('src','111');
                }
            });
            d.delay(10000);

            console.log(imgid);*/

            var mainController=this.getApplication().getController('Main');

            var socket=mainController.socket;

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

                    //(Ext.bind(factoryController.scrollMsgList, me) ());

                    socket.send(JSON.stringify({
                        type:"factorychat",
                        from:myinfo._id,
                        fromtype:0,
                        imgid:imgid,
                        ctype:btn.filetype,
                        to :toinfo.get("customerinfo")._id,
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
                    fromtype:0,
                    imgid:imgid,
                    to :toinfo.get("customerinfo")._id,
                    content: content
                }));

            }



            /*socket.send(JSON.stringify({
                type:"factorychat",
                from:myinfo._id,
                fromtype:0,
                imgid:imgid,
                to :toinfo.get("customerinfo")._id,
                content: content
            }));*/



        }else{
            CommonUtil.showMessage("no content",true);
        }


    },


    showfactoryList:function(record){
        this.selectcustomer=record;

        //Ext.Msg.alert('test', 'test', Ext.emptyFn);

        var view=this.getcustomersnavview();
        var factorysList=Ext.widget('factorys',{title:'选择工厂'});
        factorysList.on({
            itemtap  : { fn: this.onfactorySelect, scope: this, single: true }
        });

        view.push(factorysList);
    },
    onfactorySelect:function(list, index, node, record){
        var me=this;
        //Ext.Msg.alert('2323', '2323', Ext.emptyFn);
        var view=me.getcustomersnavview();
        Ext.Msg.confirm('消息','确定推荐工厂',function(buttonId){

            if(buttonId=='yes'){


                var successFunc = function (response, action) {

                    var res=JSON.parse(response.responseText);
                     if(res.success){
                         Ext.Msg.alert('成功', '推荐工厂成功', Ext.emptyFn);

                     }else{
                         Ext.Msg.alert('提示', res.message, Ext.emptyFn);
                     }
                    view.pop();

                };
                var failFunc=function(response, action){
                    Ext.Msg.alert('失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
                    //Ext.Msg.alert('test', 'test', Ext.emptyFn);
                    view.pop();

                }
                var url="customer/sendmyfactoryTocustomer";

                var params={
                    customerid:me.selectcustomer.get('customerinfo')._id,
                    factoryid:record.get('_id'),
                    fromcustomerid:Globle_Variable.user._id

                };
                CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');
            }else{

                view.pop();
            }


        })

    },
    oncustomerHold:function(list,index, target, record, e) {
        //long customer hold
        var me=this;
        list.lastTapHold = new Date();

        var actionSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    text: '推荐工厂',
                    handler:function(){
                        me.showfactoryList(record);
                        actionSheet.hide();
                    }
                },
                /*{
                    text: '添加黑名单',
                    ui  : 'decline',
                    handler:function(){
                        me.addtoblacklist(record,actionSheet);
                    }
                },*/
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
        this.getcustomerssview().deselectAll();
    },
    listShow:function(){
        //this.initcustomerList();
    },
    messageView:{},
    oncustomerSelect: function (list, index, node, record) {
        if (!list.lastTapHold || ( new Date()-list.lastTapHold  > 1000)) {

            if (!this.messageView[record.get('customerinfo')._id]){
                this.messageView[record.get('customerinfo')._id] =Ext.create('SpinningFactory.view.customer.customersMessage');

            }
            var selectview=this.messageView[record.get('customerinfo')._id];
            //var messageView=Ext.create('factoryApp.view.factorys.factoryMessage');
            selectview.setTitle(record.get('customerinfo').realname);
            selectview.data=record;
            selectview.mydata=Globle_Variable.user;
            this.getcustomersnavview().push(selectview);

        }
        // Push the show contact view into the navigation view
    },



    initcustomerList:function(){

        var store=Ext.getStore('customers');
        store.load({
            //define the parameters of the store:
            params:{
                customerid : Globle_Variable.user._id
            },
            scope: this,
            callback : function(records, operation, success) {

            }});

    },
    receiveQuickAcceptProcess:function(recommend,e){

        var me=this;

        try {

            //Ext.Msg.alert('test', cordova.plugins.notification.local.schedule , Ext.emptyFn);
            cordova.plugins.notification.local.schedule({
                id: recommend._id ,
                title: "正在进行的问诊..",
                text: recommend.userinfo.sectionname+"工厂:"+recommend.userinfo.realname,
                //firstAt: monday_9_am,
                //every: "week",
                //sound: "file://sounds/reminder.mp3",
                //icon: "http://icons.com/?cal_id=1",
                data: { data:recommend,type:'quickaccept'}
            });

            /*cordova.plugins.notification.local.on("click", function (notification) {

                me.receiveQuickAcceptShow(recommend,e);

            });*/

        }catch (err){

            me.receiveQuickAcceptShow(recommend,e);

        } finally{


        }



    },

    receiveQuickAcceptShow:function(recommend,e){
       //Ext.Msg.alert("sss","sss");
        var mainView=this.getMainview();
        mainView.setActiveItem(1);
        var list=this.getfactorysview();
        var store=list.getStore();
        var flag=true;
        //console.log(store.data);
        for(var i=0;i<store.data.items.length;i++){

            if(recommend._id==store.data.items[i].get("_id")){
                flag=false;
                break;
            }
        }
        if(flag){
            recommend.userinfo.sectionname="临时急救---"+recommend.userinfo.sectionname;
            store.add(recommend);
        }
        var factoryController=this.getApplication().getController('factory');
        try{

            factoryController.showDoctosView({fromid:recommend._id});
        }catch (err){


        }finally{
            var view=factoryController.messageView[recommend._id];
            var btn=view.down('#sendmessage');

            //factoryController.sendMessageControler(factoryController.getSendmessagebtn());
            factoryController.sendMessageControler(btn);
        }

    }



});