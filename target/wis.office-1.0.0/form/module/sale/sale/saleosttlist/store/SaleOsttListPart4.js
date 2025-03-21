Ext.define('module.sale.sale.saleosttlist.store.SaleOsttListPart4', { extend:'Axt.data.Store',
	model: 'module.sale.sale.saleosttlist.model.SaleOsttListDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/salelist/get/itemgroup.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});