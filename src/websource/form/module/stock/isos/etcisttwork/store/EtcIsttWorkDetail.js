Ext.define('module.stock.isos.etcisttwork.store.EtcIsttWorkDetail', { extend:'Axt.data.Store',
	model: 'module.stock.isos.etcisttwork.model.EtcIsttWorkDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/stock/etcisttwork/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
