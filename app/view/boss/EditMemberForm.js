Ext.define('SpinningFactory.view.boss.EditMemberForm', {

    extend: 'Ext.form.Panel',
    xtype: 'editmemberform',
    //alias: 'widget.RegisterPanel',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        title:'用户修改',
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
                                //placeHolder:'请输入用户名',
                                //required:true,
                                readOnly:true,
                                //clearIcon:true,
                                labelAlign:'left'
                            },{
                                xtype:'textfield',
                                name:'realname',
                                label:'姓名',
                                placeHolder:'请输入姓名',
                                /*required:true,
                                clearIcon:true,*/
                                labelAlign:'left'
                            },{
                                xtype:'textfield',
                                name:'password',
                                label:'密码',
                                //placeHolder:'请输入姓名',
                                /*required:true,
                                clearIcon:true,*/
                                labelAlign:'left'
                            },{
                                xtype:'textfield',
                                name:'usertype',
                                hidden:true,
                                label:'usertype'

                            },{
                                xtype:'textfield',
                                name:'_id',
                                hidden:true,
                                label:'id'

                            }/*,

                            {
                                xtype: 'selectfield',
                                name:'usertype',
                                label: '选择角色',
                                options: [
                                    {text: '办公人员',  value: '1'},
                                    {text: '生产工厂', value: '2'}
                                ]
                            }*/
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
                        text:'修改',
                        ui:'confirm',
                        itemId:'alter'
                    },
                    {
                        xtype:'button',
                        text:'删除',
                        ui:'decline',
                        itemId:'del'
                    }
                ]
            }
        ]


    }
});