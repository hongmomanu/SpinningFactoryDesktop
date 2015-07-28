Ext.define('SpinningFactory.store.workshop.OrderStatueViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.workshop.OrderStatueView',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"factory/getordersbyfid"
        }
    }
});
