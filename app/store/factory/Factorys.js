Ext.define('SpinningFactory.store.factory.Factorys', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.factory.Factory',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"customer/getmyfactorysbyid"
        }
    }
});
