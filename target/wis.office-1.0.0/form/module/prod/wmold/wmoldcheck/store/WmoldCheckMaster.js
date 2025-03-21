Ext.define('module.prod.wmold.wmoldcheck.store.WmoldCheckMaster', { extend:'Axt.data.Store',
	model : 'module.prod.wmold.wmoldcheck.model.WmoldCheckMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/wmold/wmoldcheck/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});