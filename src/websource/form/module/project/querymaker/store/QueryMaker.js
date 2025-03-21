Ext.define('module.project.querymaker.store.QueryMaker', { extend:'Axt.data.Store',
	model: 'module.project.querymaker.model.QueryMaker',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/querymaker/get/search.do"
		   ,update : _global.api_http + "/project/querymaker/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});