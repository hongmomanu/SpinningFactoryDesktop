Ext.define('SpinningFactory.view.boss.MembersViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'membersviewlist',
    //cls: 'x-contacts',
    config: {
        title: '成员管理',
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        itemId:'membersviewlist',
        onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {
                //alert('点击小按钮触发的事件');
                //console.log(record)
                this.select(index);
            }
        },
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,
        //grouped:true,
        //indexBar:true,
        store: 'MemberViews',

        listeners: {
            painted: function(){
                this.fireEvent('viewshow', this);
            }
        },
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            align:'right',
            items: [

                {
                    text:'新增',
                    iconCls:'fa fa-plus-circle',
                    itemId:'newuser'
                }


            ]
        }],
        itemTpl: [
            '<div class="headshot">',
            '<div>{realname}</div>',
            '<div>',
            '<tpl if="usertype == 0">',
            '<p style="color: dodgerblue;">角色:工厂主(管理员)</p>',
            '<tpl elseif="usertype == 1">',
            '<p style="color: gray;">角色:办公人员</p>',
            '<tpl else>',
            '<p style="color: green;">角色:生产车间</p>',
            '</tpl>',
            '</div>',
            '</div>'
        ].join('')
    }
});