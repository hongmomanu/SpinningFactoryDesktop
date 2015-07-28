Ext.define('SpinningFactory.model.boss.GoodsView', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            '_id',
            'goodsname',
            'price',
            'unit',
            'colors'
        ],
        validations: [
            {
                field: 'goodsname',
                type: 'presence',
                message: '请输入产品名称!'
            },
            {
                field: 'price',
                type: 'presence',
                message: '请输入价格!'
            },
            {
                field: 'unit',
                type: 'presence',
                message: '请输入单位!'
            },
            {
                field: 'colors',
                type: 'presence',
                message: '请输入颜色!'
            }
        ]
    }
});
