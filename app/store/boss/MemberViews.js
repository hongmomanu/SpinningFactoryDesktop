Ext.define('SpinningFactory.store.boss.MemberViews', {
    extend: 'Ext.data.Store',
    config: {
        model: 'SpinningFactory.model.boss.MemberView',
        autoLoad: false,
        //sorters: '_id',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/
        proxy: {
            type: 'ajax',
            url: Globle_Variable.serverurl+"user/getmenbers"
        }
    }
});
