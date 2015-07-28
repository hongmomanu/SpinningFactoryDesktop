Ext.define('SpinningFactory.view.office.NewGoodsForm', {

    extend: 'Ext.form.Panel',
    xtype: 'newgoodsform',
    //alias: 'widget.NewGoodsFormPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {

        title:'新商品',

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
                            placeHolder:'请输入商品名称',
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
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },
                            {
                                xtype:'textfield',
                                name:'unit',
                                flex:'1',
                                label:'单位',
                                placeHolder:'请输入单位',
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },


                            {
                                xtype: 'textareafield',
                                maxRows: 4,
                                name:'colors',
                                label:'颜色',
                                placeHolder:'请输入用户名',
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },
                            {
                                xtype: 'button',
                                itemId: 'managerpic',
                                name:'managerpic',
                                text:'图片管理',
                                iconCls:'fa fa-picture-o',
                                label:'图片管理'
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
                        text:'保存',
                        itemId:'savegoodinfo'
                    }
                ]
            }
        ]


    }
});