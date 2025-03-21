Ext.define('module.custom.dehansol.sale.saleorder.store.SaleOrderMaster', { extend:'Axt.data.Store',
	model: 'module.custom.dehansol.sale.saleorder.model.SaleOrderMaster',
	autoLoad: false,
	pageSize: 500,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/dahansol/sale/saleorder/get/search.do",
			update: _global.api_host_info + "/system/custom/dahansol/sale/saleorder/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
