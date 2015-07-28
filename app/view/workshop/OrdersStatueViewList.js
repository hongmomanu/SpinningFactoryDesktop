Ext.define('SpinningFactory.view.workshop.OrdersStatueViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'ordersstatueviewlist',
    //cls: 'x-contacts',
    config: {
        //cls: 'x-contacts',
        emptyText:'暂无订单任务',
        variableHeights: true,
        title:'订单状态',
        scrollable: 'vertical',
        itemId:'ordersstatueviewlist',
        /*onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },*/
        //refreshHeightOnUpdate :false,
        scrollToTopOnRefresh :true,

        store: 'OrderStatueViews',

        listeners: {
            painted: function(){
                this.fireEvent('viewshow', this);
            }
        },
        /*items: [{
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
        }],*/
        itemTpl:new Ext.XTemplate(
            [
                '<table width="100%" height="100%"><tr>',

                '<td width="50%">',

                '<div style="text-align: center;">',
                '<img width="80px" height="80px"  src="'+Globle_Variable.serverurl+'{[this.shorterimg(values)]}">',
                '</div>',
                '<div class="headshot" style="text-align: center;">{goodinfo.goodsname}',
                '</div>',
                '</td>',

                '<td width="50%">',
                '<div style="text-align: center;color: #0946a2">',
                '<div style="text-align: left">数量:{num}/库存已有:{hasnum}<br></div>',
                '<div style="text-align: left"> 单位:{goodinfo.unit}<br></div>',
                '<div style="text-align: left">颜色:{colors}<br></div>',
                '<div style="text-align: left">客户:{clientinfo.realname}({[this.timeform(values)]})<br></div>',
                '<div style="text-align: left"><tpl if="status == 0">',
                '<p style="color: red;">状态:新订单</p>',
                '<tpl elseif="status == 1">',
                '<p style="color: dodgerblue;">状态:已提交工厂</p>',
                '<tpl elseif="status == 2">',
                '<p style="color: gray;">状态:开始生产</p>',
                '<tpl elseif="status == 3">',
                '<p style="color:darkgoldenrod;">状态:生产完成</p>',
                '<tpl elseif="status == 5">',
                '<p style="color:darkmagenta;">状态:订单退回</p>',
                '<tpl else>',
                '<p style="color: green;">状态:订单完成</p>',
                '</tpl></div>',
                '</div></td>',




                '</tr></table>'
            ].join(''),
            {
                shorterimg: function(values) {
                    return values.goodinfo.imgs.split(",")[0];
                },
                timeform:function(values){
                    return Ext.Date.format(new Date(values.time),'Y-m-d H:i');
                }
            }
        )
    }
});