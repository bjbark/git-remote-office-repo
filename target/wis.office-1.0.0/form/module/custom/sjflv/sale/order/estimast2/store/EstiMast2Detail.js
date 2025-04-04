Ext.define('module.custom.sjflv.sale.order.estimast2.store.EstiMast2Detail', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.order.estimast2.model.EstiMast2Detail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/sjflv/sale/order/estimast2/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
