Ext.define('module.custom.komec.stock.isos.prodosttwork.store.ProdOsttWorkMaster', { extend:'Axt.data.Store',
	model: 'module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/komec/stock/isos/prodosttwork/get/search.do",
			update: _global.api_host_info + "/system/custom/komec/stock/isos/prodosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
