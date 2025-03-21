Ext.define('module.project.rndtool.store.RndToolModule', { extend:'Axt.data.Store',
	model: 'module.project.rndtool.model.RndToolModule',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/rndtool/get/module.do"
		   ,update : _global.api_http + "/project/rndtool/set/module.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});