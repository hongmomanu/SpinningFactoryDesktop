/**
 * Created by jack on 15-03-27.
 * main Controller used by Terminal app
 */
Ext.define('SpinningFactory.controller.ClientRegister', {
    extend: 'Ext.app.Controller',
    config: {
        views: [
            'register.ClientRegister'
        ],
        models: [
            'register.ClientRegister'

        ],
        stores: [

            //'customers.customers',

            //'Contacts'
        ],
        control: {

            customerregisterbtn:{

                tap:'docustomerRegister'
            }

        },
        refs: {
            customerregisterbtn: 'clientregisterform #customerregister'
        }
    },

    docustomerRegister:function(btn){

        formpanel=btn.up('panel');
        CommonUtil.addMessage();
        var valid = CommonUtil.valid('SpinningFactory.model.register.ClientRegister', formpanel);
        var me =this;
        if(valid){

            var successFunc = function (response, action) {
                var res=JSON.parse(response.responseText);
                if(res.success){

                    console.log(res);

                    Ext.Msg.alert('注册成功', '注册成功', function(){
                        //window.location.reload();
                        localStorage.user=JSON.stringify(res.message);
                        window.location.reload();
                    });
                    /*Ext.Viewport.removeAt(0);
                    Ext.Viewport.add(Ext.create('SpinningFactory.view.Main'));

                    localStorage.user=JSON.stringify(res.message);
                    Globle_Variable.user=res.message;
                    var customerCotroller=me.getApplication().getController('customer');
                    var factoryCotroller=me.getApplication().getController('factory');
                    var settingCotroller=me.getApplication().getController('Settings');
                    customerCotroller.initcustomerList();
                    factoryCotroller.initfactoryList();
                    settingCotroller.initSetting();
*/

                }else{
                    Ext.Msg.alert('注册失败',res.message, Ext.emptyFn);
                }

            };
            var failFunc=function(response, action){
                Ext.Msg.alert('登录失败', '服务器连接异常，请稍后再试', Ext.emptyFn);
            };

            var url="customer/newcustomer";

            var params=formpanel.getValues();

            CommonUtil.ajaxSend(params,url,successFunc,failFunc,'POST');



        }

    }
});