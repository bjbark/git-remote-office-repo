Ext.define('module.custom.komec.stock.isos.prodosttwork.store.ProdOsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.custom.komec.stock.isos.prodosttwork.model.ProdOsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/komec/stock/isos/prodosttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
