Ext.define('module.custom.komec.mtrl.po.purcwait.store.PurcWait', { extend:'Axt.data.Store',
	model : 'module.custom.komec.mtrl.po.purcwait.model.PurcWait',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/komec/mtrl/po/purcwait/get/search.do",
			update	: _global.location.http() + "/custom/komec/mtrl/po/purcwait/set/records.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});