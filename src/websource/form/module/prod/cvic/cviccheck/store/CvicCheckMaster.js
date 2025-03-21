Ext.define('module.prod.cvic.cviccheck.store.CvicCheckMaster', { extend:'Axt.data.Store',
	model : 'module.prod.cvic.cviccheck.model.CvicCheckMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/cviccheck/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});