Ext.define('SpinningFactory.model.register.Register', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [

            {
                name: 'password',
                type: 'string'
            },

            {
                name: 'realname',
                type: 'string'
            },

            {
                name: 'username',
                type: 'string'
            },

            {
                name: 'passwordagain',
                type: 'string'
            },

            {
                name: 'factoryname',
                type: 'string'
            },

            {
                name: 'factoryinfo',
                type: 'string'
            },

            {
                name: 'factoryaddress',
                type: 'string'
            }],
        validations: [{
            field: 'factoryname',
            type: 'presence',
            message: '请输入工厂名称!'
        },{
            field: 'factoryaddress',
            type: 'presence',
            message: '请输入工厂地址!'
        },{
            field: 'factoryinfo',
            type: 'presence',
            message: '请输入主营项目!'
        },{
            field: 'username',
            type: 'presence',
            message: '请输入姓名!'
        },{
            field: 'realname',
            type: 'presence',
            message: '请输入姓名!'
        },
            {
                field: 'password',
                type: 'presence',
                message: '请输入密码!'
            },{
                field: 'passwordagain',
                type: 'presence',
                message: '请输入密码!'
            }
            ]
    },
    //添加自定义验证
    validate: function (options) {
        var me = this,
            errors = me.callParent(arguments),

            password = this.get('password'),
            passwordConfirm = this.get('passwordagain');
        if (password != passwordConfirm) {
            errors.add({
                field: 'passwordagain',
                message: '两次密码输入不一致!'
            })
        }
        /*if (tService == 'O') {
            if (this.get('address') == '') {
                errors.add({
                    field: 'address',
                    message: '请输入地址!'
                })
            }
        }*/
        return errors;
    }
});