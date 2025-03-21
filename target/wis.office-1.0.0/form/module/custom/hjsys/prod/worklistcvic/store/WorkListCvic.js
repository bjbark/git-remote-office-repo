Ext.define('module.custom.hjsys.prod.worklistcvic.store.WorkListCvic', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.prod.worklistcvic.model.WorkListCvic',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/prod/worklistcvic/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});