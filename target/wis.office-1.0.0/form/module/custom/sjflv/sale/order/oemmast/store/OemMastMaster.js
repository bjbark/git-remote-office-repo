Ext.define('module.custom.sjflv.sale.order.oemmast.store.OemMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/order/oemmast/get/search.do",
			//update: _global.api_host_info + "/system/custom/sjflv/sale/order/saleorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
