Ext.define('module.project.rndtool.store.RndToolScript', { extend:'Axt.data.Store',
	model: 'module.project.rndtool.model.RndToolScript',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/rndtool/get/script.do"
		   ,update : _global.api_http + "/project/rndtool/set/script.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});