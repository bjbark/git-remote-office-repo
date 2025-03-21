Ext.define('module.stock.isos.prodosttwork.store.ProdOsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.stock.isos.prodosttwork.model.ProdOsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/stock/prodosttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
