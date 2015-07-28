Ext.define('SpinningFactory.model.customer.CustomerMessage', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'local',
                type: 'boolean'
            },
            'userinfo',
            'username',
            'realname',
            'content',
            'msgtime',
            'imgid',
            'issend',
            'message',
            'messagetype'
        ]
    }
});
