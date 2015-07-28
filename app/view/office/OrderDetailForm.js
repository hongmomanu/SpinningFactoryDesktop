Ext.define('SpinningFactory.view.office.OrderDetailForm', {

    extend: 'Ext.form.Panel',
    xtype: 'orderdetailform',
    //alias: 'widget.NewGoodsFormPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'订单处理',

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
                        instructions:'订单处理',
                        centered: true,
                        defaults:{
                            labelWidth:'100px'
                        },
                        items:[{
                            xtype:'textfield',
                            name:'goodsname',
                            label:'商品名称',
                            placeHolder:'请输入商品名称',
                            readOnly:true,
                            labelAlign:'left'
                        },
                            {
                                name:'gid',
                                xtype:'textfield',
                                hidden:true
                            },
                            {
                                name:'_id',
                                xtype:'textfield',
                                hidden:true
                            },{
                                name:'status',
                                xtype:'textfield',
                                hidden:true
                            },{
                                name:'factoryid',
                                xtype:'textfield',
                                hidden:true
                            },
                            {
                                xtype:'textfield',
                                name:'num',
                                label:'订单数量',
                                placeHolder:'请输入单位',
                                readOnly:true,
                                labelAlign:'left'
                            }, {
                                xtype:'textfield',
                                name:'hasnum',
                                label:'库存',
                                readOnly:true,
                                labelAlign:'left'
                            }, {
                                xtype:'textfield',
                                name:'unit',
                                flex:'1',
                                label:'单位',
                                readOnly:true,
                                labelAlign:'left'
                            },


                            {
                                xtype: 'textareafield',
                                maxRows: 4,
                                name:'colors',
                                label:'颜色',
                                readOnly:true,
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
                        text:'提交工厂',
                        ui:'confirm',
                        itemId:'sendtowork'
                    },
                    {
                        xtype:'button',
                        text:'完成订单',
                        ui:'decline',
                        itemId:'finishorder'
                    },
                    {
                        xtype:'button',
                        text:'退回订单(客户修改)',
                        ui:'decline',
                        itemId:'backorder'
                    }
                ]
            }
        ]


    }
});