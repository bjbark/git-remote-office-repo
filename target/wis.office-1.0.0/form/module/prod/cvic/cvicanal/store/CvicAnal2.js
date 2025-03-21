Ext.define('module.prod.cvic.cvicanal.store.CvicAnal2', { extend:'Axt.data.Store',
	model : 'module.prod.cvic.cvicanal.model.CvicAnal',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/cvicanal/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});