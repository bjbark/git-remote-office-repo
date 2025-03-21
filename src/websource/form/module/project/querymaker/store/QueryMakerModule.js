Ext.define('module.project.querymaker.store.QueryMakerModule', { extend:'Axt.data.Store',
	model: 'module.project.querymaker.model.QueryMakerModule',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/querymaker/get/service.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});