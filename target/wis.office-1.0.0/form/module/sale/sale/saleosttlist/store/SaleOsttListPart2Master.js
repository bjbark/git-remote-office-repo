Ext.define('module.sale.sale.saleosttlist.store.SaleOsttListPart2Master', { extend:'Axt.data.Store',
	model: 'module.sale.sale.saleosttlist.model.SaleOsttListMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/salelist/get/nodelivery.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});