Ext.define('SpinningFactory.view.office.OfficeMain', {
    extend: 'Ext.tab.Panel',
    xtype: 'officemain',
    alias: 'widget.OfficeMain',
    //itemId: 'loginpanel',
    requires: [
        'Ext.TitleBar',
        'Ext.NavigationView',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',
        fullscreen: true,

        items: [
            {
                title: '订单详情',
                iconCls: 'fa fa-tasks',

                styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',

                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        scrollable: false,
                        //fullscreen: true,
                        itemId: 'ordernavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'ordersviewlist',
                                title: '订单详情'
                            }
                        ]


                    }

                ]

               /*items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: '订单申请'/!*,
                    items:[

                        {
                            xtype:'mainmenu',
                            iconCls:'fa fa-cog'
                        }
                    ]*!/
                }],

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")*/
            },
            {
                title: '产品维护',
                iconCls: 'fa fa-shopping-cart',
                styleHtmlContent: true,
                scrollable: false,
                layout: 'fit',

                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        scrollable: false,
                        //fullscreen: true,
                        itemId: 'villagenavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'goodsviewlist',
                                title: '产品维护'
                            }
                        ]


                    }

                ]
            }/*,

            {
                title: '我的消息',
                iconCls: 'fa fa-weixin',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '我的消息'/!*,
                        items:[

                            {
                                xtype:'mainmenu',
                                iconCls:'fa fa-cog'
                            }
                        ]*!/
                    },

                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }*/
        ]
    }
});
