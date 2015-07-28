Ext.define('SpinningFactory.view.client.GoodsDetail', {

    extend: 'Ext.form.Panel',
    xtype: 'goodsdetail',
    //alias: 'widget.NewGoodsFormPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'商品详情',

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
                        instructions:'请填写信息',
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
                                xtype:'textfield',
                                name:'price',
                                flex:'1',
                                label:'价格(元)',
                                placeHolder:'请输入价格',
                                readOnly:true,
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },{
                                name:'gid',
                                xtype:'textfield',
                                hidden:true
                            },{
                                name:'factoryid',
                                xtype:'textfield',
                                hidden:true
                            },
                            {
                                xtype:'textfield',
                                name:'unit',
                                readOnly:true,
                                flex:'1',
                                label:'单位',
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },


                            {
                                xtype: 'textareafield',
                                maxRows: 4,
                                name:'colors',
                                label:'颜色',
                                required:true,
                                readOnly:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },
                            {
                                xtype: 'button',
                                itemId: 'managerpic',
                                name:'managerpic',
                                text:'图片详情',
                                iconCls:'fa fa-picture-o',
                                label:'图片详情'
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
                        text:'预定',
                        ui:'confirm',
                        itemId:'ordergood'
                    },
                    {
                        xtype:'button',
                        text:'聊天',
                        ui:'decline',
                        itemId:'chat'
                    }
                ]
            }
        ]


    }
});