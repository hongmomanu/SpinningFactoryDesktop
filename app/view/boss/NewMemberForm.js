Ext.define('SpinningFactory.view.boss.NewMemberForm', {

    extend: 'Ext.form.Panel',
    xtype: 'newmemberform',
    //alias: 'widget.RegisterPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        title:'新增用户',
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
                            labelWidth:'150px'
                        },
                        items:[
                            {
                                xtype:'textfield',
                                name:'username',
                                label:'用户名',
                                placeHolder:'请输入用户名',
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },{
                                xtype:'textfield',
                                name:'realname',
                                label:'姓名',
                                placeHolder:'请输入姓名',
                                required:true,
                                clearIcon:true,
                                labelAlign:'left'
                            },

                            {
                                xtype: 'selectfield',
                                name:'usertype',
                                label: '选择角色',
                                options: [
                                    {text: '办公人员',  value: '1'},
                                    {text: '生产工厂', value: '2'}
                                ]
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
                        text:'新增',
                        itemId:'add'
                    },
                    {
                        xtype:'button',
                        text:'取消',
                        itemId:'cancel'
                    }
                ]
            }
        ]


    }
});