Ext.define('module.workshop.mtrl.purchase.pordermast.store.PorderMastMaster', { extend:'Axt.data.Store',
	model: 'module.workshop.mtrl.purchase.pordermast.model.PorderMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder/get/search.do",
			update: _global.api_host_info + "/system/sale/order/saleorder/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
