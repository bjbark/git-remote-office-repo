Ext.define('module.stock.isos.etcosttwork.store.EtcOsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.stock.isos.etcosttwork.model.EtcOsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/stock/etcosttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
