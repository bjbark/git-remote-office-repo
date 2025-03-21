Ext.define('module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkRegiStore', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkRegiModel',
	pageSize: 200,
	proxy	: {
		api	: {
			read  : _global.location.http() + "/custom/sjflv/stock/etcisttwork/get/search2.do",
			//update: _global.location.http() + "/custom/sjflv/stock/etcisttwork/set/etcistt.do"
			update: _global.location.http() + "/custom/sjflv/stock/etcisttwork/set/etcistt2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});