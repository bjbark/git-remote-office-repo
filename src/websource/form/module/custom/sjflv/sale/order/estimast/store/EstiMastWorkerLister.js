Ext.define('module.custom.sjflv.sale.order.estimast.store.EstiMastWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.order.estimast.model.EstiMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
//			read  : _global.api_host_info + "/system/custom/sjflv/sale/order/estimast/get/lister3.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/order/estimast/set/mtrl.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
