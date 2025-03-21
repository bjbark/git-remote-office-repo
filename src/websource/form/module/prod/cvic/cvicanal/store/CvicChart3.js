Ext.define('module.prod.cvic.cvicanal.store.CvicChart3', { extend:'Axt.data.Store',
	model : 'module.prod.cvic.cvicanal.model.CvicAnal2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/cvicanal/get/chart1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});