Ext.define('module.custom.sjflv.sale.order.oemmast.store.OemMastPrice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.order.oemmast.model.OemMastPrice',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/get/price.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/set/price.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
