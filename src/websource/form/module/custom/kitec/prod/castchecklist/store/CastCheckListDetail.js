Ext.define('module.custom.kitec.prod.castchecklist.store.CastCheckListDetail', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.prod.castchecklist.model.CastCheckListDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/custom/kitec/prod/castchecklist/get/searchDetail.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});