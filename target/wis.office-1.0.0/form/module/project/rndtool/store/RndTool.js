Ext.define('module.project.rndtool.store.RndTool', { extend:'Axt.data.Store',
	model: 'module.project.rndtool.model.RndTool',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/rndtool/get/search.do"
		   ,update : _global.api_http + "/project/rndtool/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});