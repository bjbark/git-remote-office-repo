Ext.define('module.prod.mold.moldshot.store.MoldShotMaster', { extend:'Axt.data.Store',
	model : 'module.prod.mold.moldshot.model.MoldShotMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/mold/moldshot/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});