Ext.define('module.stock.isos.etcosttwork.store.EtcOsttWorkMaster', { extend:'Axt.data.Store',
	model: 'module.stock.isos.etcosttwork.model.EtcOsttWorkMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/stock/etcosttwork/get/search.do",
			update: _global.api_host_info + "/system/stock/etcosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
