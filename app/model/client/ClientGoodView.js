Ext.define('SpinningFactory.model.client.ClientGoodView', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            '_id',
            'factoryid',
            'goodsname',
            'price',
            'colors',
            'imgs',
            'unit'
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
