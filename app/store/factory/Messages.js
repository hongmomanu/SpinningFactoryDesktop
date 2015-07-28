Ext.define('SpinningFactory.store.factory.Messages', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.factory.Message'
        //autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        /*proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"customer/getmyfactorysbyid"
        }*/
    }
});
