Ext.define('SpinningFactory.store.office.GoodViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.office.GoodView',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"factory/getgoodsbyfid"
        }
    }
});
