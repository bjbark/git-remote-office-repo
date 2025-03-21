Ext.define('module.custom.dehansol.stock.isos.saleostt.store.SaleOsttMaster', { extend:'Axt.data.Store',
	model: 'module.custom.dehansol.stock.isos.saleostt.model.SaleOsttMaster',
	autoLoad: false,
	pageSize: 500,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/dehansol/stock/isos/saleostt/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
