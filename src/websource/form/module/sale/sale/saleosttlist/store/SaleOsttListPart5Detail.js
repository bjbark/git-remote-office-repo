Ext.define('module.sale.sale.saleosttlist.store.SaleOsttListPart5Detail', { extend:'Axt.data.Store',
	model: 'module.sale.sale.saleosttlist.model.SaleOsttListDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/sale/salelist/get/custgroupitem.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});