Ext.define('SpinningFactory.store.client.ClientGoodViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.client.ClientGoodView',
        autoLoad: false,
        pageSize: 10,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"factory/getgoodsbykeyword"
        }
    }
});
