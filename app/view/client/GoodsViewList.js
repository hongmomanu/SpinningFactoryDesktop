Ext.define('SpinningFactory.view.client.GoodsViewList', {
    extend: 'Ext.List',
    //alias: 'widget.doctors',
    xtype:'clientgoodsviewlist',
    //cls: 'x-contacts',
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh'
    ],
    config: {
        //cls: 'x-contacts',
        emptyText:'无相关内容',
        useSimpleItems: false,
        variableHeights: true,
        infinite: true,
        disableSelection: true,
        allowDeselect: false,
        scrollToTopOnRefresh: false,
        //store: Ext.create('TweetStore'),

        plugins: [
            { xclass: 'Ext.plugin.ListPaging' },
            {
                //xclass: 'Ext.plugin.PullRefresh' ,
                xtype: 'refreshFn' ,
                pullText: '下拉可以更新',
                releaseText: '松开开始更新',
                loadingText: '正在刷新……',
                refreshFn: function (loaded, arguments) {
                  //Ext.Msg.alert('别他妈拉我了! 艹');
                    loaded.getList().getStore().getProxy().setExtraParam('q', '参数'); //设置proxy参数
                    //loaded.getList().getStore().getProxy().setExtraParam('page', 1);
                    var seachinput=loaded.getList().down('#seachinput');
                    loaded.getList().getStore().load({
                        //define the parameters of the store:
                        params:{
                            page:1,
                            keyword:seachinput.getValue()
                        },

                        scope: this,
                        callback : function(records, operation, success) {
                        }});
                    /*loaded.getList().getStore().loadPage(0, {
                        callback: function (record, operation, success) { Ext.Viewport.unmask(); }, scope: this });*/
                    //Ext.getStore(userStore).loadPage(1,'what',1);
                }
                /*refreshFn: function (loaded, arguments) {
                    loaded.getList().getStore().getProxy().setExtraParam('q', '参数'); //设置proxy参数
                    loaded.getList().getStore().loadPage(1, {
                        callback: function (record, operation, success) { Ext.Viewport.unmask(); }, scope: this });
                }*/

            }
        ],
        scrollable: 'vertical',
        itemId:'clientgoodsviewlist',
        /*onItemDisclosure : {//若配置该项，list每一项的右侧都会出现一个小图标。其他功能请查看api
            handler : function(record, btn, index) {

                this.select(index);
            }
        },*/
        //refreshHeightOnUpdate :false,
        //scrollToTopOnRefresh :true,

        store: 'ClientGoodViews',

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
                    xtype: 'searchfield',
                    //label: '查找',
                    itemId:'seachinput',
                    placeHolder: '查找产品...',
                    name: 'key'
                },
                {
                    xtype:'button',
                    text:'查找',
                    ui:'confirm',
                    itemId:'search'

                }


            ]
        }],
        itemTpl: new Ext.XTemplate(
            [
                '<table width="100%" height="100%"><tr>',

                '<td width="50%">',

                '<div class="transp-block" style="text-align: center;">',

                '<img class="transparent" width="80px" height="80px"  src="'+Globle_Variable.serverurl+'{[this.shorterimg(values)]}">',
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