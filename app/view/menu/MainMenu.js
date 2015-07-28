Ext.define('SpinningFactory.view.menu.MainMenu', {
    extend: 'Ext.ux.ActionOverFlowMenuButton',
    xtype:'mainmenu',
    alias: 'widget.mainmenus',

    requires: [

    ],

    config: {

        docked: 'right',
        align:'right',
        iconCls:'home',
        //border:0,
        menuItems: [


            {
                text: '用户退出',
                itemId:'logoutmenu',
                iconCls: 'user',

                scope: this,
                handler: function() {
                    var mainview=Ext.Viewport.down('officemain');
                    mainview=mainview?mainview:Ext.Viewport.down('bossmain');
                    mainview=mainview?mainview:Ext.Viewport.down('clientmain');
                    mainview=mainview?mainview:Ext.Viewport.down('workshopmain');
                    mainview.fireEvent('logoutmenu', mainview);
                }
            },

            {
                xtype: 'button',
                ui: 'plain',
                text: '______',
                disabled: true,
                cls: 'separator'
            },{
                text: '返回首页',
                iconCls: 'home',
                scope: this,
                handler: function(item) {



                    var mainview=Ext.Viewport.down('officemain');
                    mainview=mainview?mainview:Ext.Viewport.down('bossmain');
                    mainview=mainview?mainview:Ext.Viewport.down('clientmain');
                    mainview=mainview?mainview:Ext.Viewport.down('workshopmain');
                    mainview.fireEvent('returnhomemenu', mainview);

                }
            }, {
                text: '二维码名片',
                iconCls: 'organize',
                scope: this,
                handler: function() {
                    /*var mainview=Ext.Viewport.down('officemain');
                    mainview=mainview?mainview:Ext.Viewport.down('bossmain');
                    mainview=mainview?mainview:Ext.Viewport.down('clientmain');
                    mainview=mainview?mainview:Ext.Viewport.down('workshopmain');
                    mainview.fireEvent('showqrcode', mainview);*/

                    Ext.Viewport.hideMenu('right');


                    var overlay = Ext.Viewport.add({
                        xtype: 'panel',

                        // We give it a left and top property to make it floating by default
                        /*left: 0,
                        top: 0,*/

                        // Make it modal so you can click the mask to hide the overlay
                        modal: true,
                        centered: true,
                        fullscreen:true,
                        hideOnMaskTap: true,

                        // Make it hidden by default
                        hidden: true,


                        // Set the width and height of the panel
                        width: 280,
                        height: 280,

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
                                html:'<div id="biggercode"></div>',
                                title: 'Overlay Title'
                            }
                        ]
                    });


                    var cont=$('#biggercode');
                    cont.html('');
                    cont.qrcode({
                        text	: Globle_Variable.serverurl+'files/download.html',//3g.qq.com
                        width		: 220,
                        height		: 220
                    });
                    overlay.show();



                    //Ext.Viewport.hideMenu('right');
                    /*Ext.getCmp('searchBar').hide();
                     this.container.setActiveItem(1);
                     this.getBBMStore().clearFilter();*/
                }
            },

            {
                text: '关于我们',
                iconCls: 'info',
                scope: this,
                handler: function() {
                    var mainview=Ext.Viewport.down('officemain');
                    mainview=mainview?mainview:Ext.Viewport.down('bossmain');
                    mainview=mainview?mainview:Ext.Viewport.down('clientmain');
                    mainview=mainview?mainview:Ext.Viewport.down('workshopmain');
                    mainview.fireEvent('showabout', mainview);
                    //Ext.Viewport.hideMenu('right');
                    /*Ext.getCmp('searchBar').hide();
                     this.container.setActiveItem(1);
                     this.getBBMStore().clearFilter();*/
                }
            }]

    }
});