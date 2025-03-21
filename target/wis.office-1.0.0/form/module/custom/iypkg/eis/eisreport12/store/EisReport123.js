Ext.define('module.custom.iypkg.eis.eisreport12.store.EisReport123', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport12.model.EisReport12',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/basic/bzplmast/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});