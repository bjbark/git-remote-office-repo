Ext.define('module.sale.sale.saleosttlist.store.SaleOsttListPart3', { extend:'Axt.data.Store',
	model: 'module.sale.sale.saleosttlist.model.SaleOsttListDetail',
	autoLoad: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/sale/saleosttlist/get/itemlist.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});