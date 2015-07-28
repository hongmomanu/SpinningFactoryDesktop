Ext.define('SpinningFactory.view.customer.Customers', {
    extend: 'Ext.List',
    xtype: 'customers',
    alias: 'widget.Customers',
    config: {

        //variableHeights: true,
        itemId:'customerlist',

        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {
                //alert('点击小按钮触发的事件');
                //console.log(record)
                this.select(index);
            }
        },

        //refreshHeightOnUpdate :false,
        //scrollToTopOnRefresh :true,
        variableHeights: true,
        //grouped:true,
        //indexBar:true,
        title:'我的客户',
        store: 'Customers',

        listeners: {
            painted: function(){

                this.fireEvent('viewshow', this);
            }
        },

        items: [],
        itemTpl: [
            '<div class="headshot">',
            '{customerinfo.realname}',
            '</div>'
        ].join('')
    }
});