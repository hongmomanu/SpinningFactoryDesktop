Ext.define('SpinningFactory.store.customer.Customers', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.customer.Customer',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"customer/getmycustomersbyid"
        }
    }
});
