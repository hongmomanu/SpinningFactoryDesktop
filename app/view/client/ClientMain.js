Ext.define('SpinningFactory.view.client.ClientMain', {
    extend: 'Ext.tab.Panel',
    xtype: 'clientmain',
    alias: 'widget.ClientMain',
    //itemId: 'loginpanel',
    requires: [
        'Ext.TitleBar',
        'Ext.NavigationView'
    ],
    config: {
        tabBarPosition: 'bottom',
        fullscreen: true,

        items: [
            {
                title: '我的工厂',
                iconCls: 'fa fa-tasks',

                styleHtmlContent: true,
                scrollable: true,
                layout:'fit',

               items: [
                   {
                       docked: 'top',
                       xtype: 'titlebar',
                       title: '我的工厂'
                   },

                   {
                       xtype: 'factorylist'

                   }

               ]


            },
            {
                title: '查找商品',
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
                                xtype: 'clientgoodsviewlist',
                                title: '查找商品'
                            }
                        ]


                    }

                ]
            },

            {
                title: '我的消息',
                iconCls: 'fa fa-weixin',
                layout:'fit',
                items: [

                    {
                        xtype: 'navigationview',
                        autoDestroy: false,
                        scrollable: false,
                        //fullscreen: true,
                        itemId: 'messagenavigationview',
                        //inside this first item we are going to add a button
                        items: [
                            {
                                xtype: 'messagelist',
                                title: '我的消息'
                            }
                        ]


                    }

                ]
            }
        ]
    }
});
