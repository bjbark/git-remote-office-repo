Ext.define('module.prod.cvic.cvicchecktype.store.CvicCheckType', { extend:'Axt.data.Store',
	 model: 'module.prod.cvic.cvicchecktype.model.CvicCheckType',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/prod/cvic/cvicchecktype/get/search.do"
			,update : _global.location.http() + "/prod/cvic/cvicchecktype/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});