Ext.define('module.project.rndtool.store.RndToolView', { extend:'Axt.data.Store',
	model: 'module.project.rndtool.model.RndToolView',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/rndtool/get/view.do"
		   ,update : _global.api_http + "/project/rndtool/set/view.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});