Ext.define('SpinningFactory.view.workshop.WorkShopMain', {
    extend: 'Ext.tab.Panel',
    xtype: 'workshopmain',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: '订单任务',
                iconCls: 'fa fa-tasks',

                styleHtmlContent: true,
                scrollable: true,
                layout:'fit',

                items: [{
                    docked: 'top',
                    xtype: 'titlebar',
                    title: '订单任务'
                },
                    /*{

                        xtype:'ordersstatueviewlist'
                    }*/
                    {
                        xtype: 'ordersstatueviewlist',
                        title: '订单任务'
                    }
                ]

               /* html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")*/
            },
            {
                title: '已完成订单',
                iconCls: 'fa fa-check',
                layout:'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: '已完成订单'
                    },
                    {
                        xtype: 'ordersfinishviewlist'

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
                        title: '我的消息'
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
