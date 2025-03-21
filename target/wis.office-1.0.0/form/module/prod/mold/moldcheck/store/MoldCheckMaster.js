Ext.define('module.prod.mold.moldcheck.store.MoldCheckMaster', { extend:'Axt.data.Store',
	model : 'module.prod.mold.moldcheck.model.MoldCheckMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/mold/moldcheck/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});