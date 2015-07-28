Ext.define('SpinningFactory.model.factory.Message', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            '_id',
            'fromid',
            'factoryinfo',
            'userinfo',
            'factoryuser'
        ]
    }
});
