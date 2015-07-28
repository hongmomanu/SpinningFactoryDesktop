Ext.define('SpinningFactory.model.factory.FactoryMessage', {
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
            'imgid',
            'issend',
            'msgtime',
            'message',
            'messagetype'
        ]
    }
});
