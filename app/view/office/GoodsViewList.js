Ext.define('SpinningFactory.view.office.GoodsViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'goodsviewlist',
    //cls: 'x-contacts',
    config: {
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        variableHeights: true,
        scrollable: 'vertical',
        itemId:'goodsviewlist',
        /*onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },*/
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        store: 'GoodViews',

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
                    itemId:'newgoods'
                }


            ]
        }],
        itemTpl: new Ext.XTemplate(
            [
                '<table width="100%" height="100%"><tr>',

                '<td width="50%">',

                '<div  style="text-align: center;">',
                '<img  width="80px" height="80px"  src="'+Globle_Variable.serverurl+'{[this.shorterimg(values)]}">',
                '</div>',
                '<div class="headshot" style="text-align: center;">{goodsname}',
                '</div>',
                '</td>',

                '<td width="50%">',
                '<div style="text-align: center;color: #0946a2">',
                '<div style="text-align: left">价格:{price}<br></div>',
                '<div style="text-align: left"> 单位:{unit}<br></div>',
                '<div style="text-align: left">颜色:{colors}<br></div>',
                /*'<tpl if="zblb == 1">',
                 '<p>上午</p>',
                 '<tpl else>',
                 '<p>下午</p>',
                 '</tpl>',*/
                '</div></td>',




                '</tr></table>'
            ].join('')
            ,
            {
                shorterimg: function(values) {
                    return values.imgs.split(",")[0];
                }
            }
        )
    }
});