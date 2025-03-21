Ext.define('module.custom.sjflv.sale.export.ordermast.store.OrderMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.export.ordermast.model.OrderMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/export/ordermast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
