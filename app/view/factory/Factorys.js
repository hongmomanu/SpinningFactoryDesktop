Ext.define('SpinningFactory.view.factory.Factorys', {
    extend: 'Ext.List',
    xtype: 'factorys',
    alias: 'widget.factorylist',
    config: {
        title: '我的工厂',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'factorylist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        //grouped:true,
        //indexBar:true,
        store: 'Factorys',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '<div style="font-size: larger;color: #0398ff">{factoryinfo.factoryname}</div> ',
            '<div style="color: #3889b7">{factoryuser.realname}</div>',
            '</div>'
        ].join('')
    }
});