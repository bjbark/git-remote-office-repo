Ext.define('module.sale.sale.saleosttlist.store.SaleOsttListMaster', { extend:'Axt.data.Store',
	model: 'module.sale.sale.saleosttlist.model.SaleOsttListMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/salelist/get/search.do",
			update  : _global.api_host_info + "/system/sale/salelist/set/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST'  },
		extraParams:{
			token : _global.token_id
		}
	}
});