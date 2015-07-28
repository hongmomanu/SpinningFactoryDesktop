Ext.define('SpinningFactory.view.office.GoodsPicsView', {

    extend: 'Ext.Container',
    xtype: 'goodspicsview',
    //alias: 'widget.NewGoodsFormPanel',
    requires: [

    ],

    config: {

        title:'新商品',
        modal: true,
        hideOnMaskTap: false,

        // Make it hidden by default
        hidden: true,

        // Set the width and height of the panel
        width: '100%',
        height: '100%',

        contentEl: 'content',

        // Style the content and make it scrollable
        styleHtmlContent: true,
        scrollable: false,
        layout:'fit',

        items: [
            {
                xtype: 'carousel',
                defaults: {
                    styleHtmlContent: true
                },

                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        align:'right',
                        items: [

                            {
                                text:'新增',
                                iconCls:'fa fa-plus-circle',
                                ui:'confirm',

                                itemId:'uploadpicture'
                            },
                            {
                                text:'删除',
                                iconCls:'fa fa-times',
                                ui:'decline',

                                itemId:'delpicture'
                            },
                            {
                                text:'完成',
                                iconCls:'fa fa-reply-all',
                                ui:'confirm',

                                itemId:'cancelpicture'
                            }


                        ]
                    }
                ]

            }
        ]



    }
});