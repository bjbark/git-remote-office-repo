Ext.define('module.custom.kitec.prod.castchecklist.store.CastCheckListMaster', { extend:'Axt.data.Store',
	model	: 'module.custom.kitec.prod.castchecklist.model.CastCheckListMaster',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/kitec/prod/castchecklist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});