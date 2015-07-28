Ext.define('SpinningFactory.view.factory.MessageList', {
    extend: 'Ext.List',
    xtype: 'messagelist',
    alias: 'widget.MessageList',
    config: {
        title: '我的消息',
        //cls: 'x-contacts',
        variableHeights: true,
        itemId:'messagelist',
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        //grouped:true,
        //indexBar:true,
        store: 'Messages',

        listeners: {
            painted: function(){

                //this.fireEvent('viewshow', this);
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