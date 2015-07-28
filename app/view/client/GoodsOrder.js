Ext.define('SpinningFactory.view.client.GoodsOrder', {

    extend: 'Ext.form.Panel',
    xtype: 'goodsorder',
    //alias: 'widget.NewGoodsFormPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'订单详情',

        style:{
            'padding':'1px'
        },
        scrollable: 'vertical',
        layout: 'fit',
        fullscreen: true,
        items:[
            {
                xtype: 'container',
                layout: 'fit',
                items:[
                    {
                        xtype:'fieldset',
                        instructions:'请填写订单信息',
                        centered: true,
                        defaults:{
                            labelWidth:'100px'
                        },
                        items:[{
                            xtype:'textfield',
                            name:'goodsname',
                            label:'商品名称',
                            readOnly:true,
                            required:true,
                            clearIcon:true,
                            labelAlign:'left'
                        },
                            {
                                xtype:'spinnerfield',
                                name:'nums',
                                increment: 1,
                                stepValue:10,
                                //flex:'1',
                                label:'数量',
                                placeHolder:'请输入数量',
                                minValue: 1,
                                maxValue: 10000,
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },{
                                name:'gid',
                                xtype:'textfield',
                                hidden:true
                            },{
                                name:'unit',
                                xtype:'textfield',
                                hidden:true
                            },{
                                name:'factoryid',
                                xtype:'textfield',
                                hidden:true
                            },


                            {
                                xtype: 'textfield',
                                maxRows: 4,
                                name:'colors',
                                label:'颜色',
                                required:true,
                                readOnly:false,
                                clearIcon:true,
                                labelAlign:'left'
                            }

                        ]
                    }
                ]

            },

            {
                xtype   : 'toolbar',
                docked  : 'bottom',
                layout  : {
                    pack  : 'center'
                },
                items:[
                    {
                        xtype:'button',
                        text:'提交',
                        ui:'confirm',
                        itemId:'ordersend'
                    },
                    {
                        xtype:'button',
                        text:'取消',
                        ui:'decline',
                        itemId:'ordercancel'
                    }
                ]
            }
        ]


    }
});