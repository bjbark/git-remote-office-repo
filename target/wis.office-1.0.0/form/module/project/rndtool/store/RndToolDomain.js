Ext.define('module.project.rndtool.store.RndToolDomain', { extend:'Axt.data.Store',
	model: 'module.project.rndtool.model.RndToolDomain',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/rndtool/get/searchdomain.do"
		   ,update : _global.api_http + "/project/rndtool/set/recorddomain.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});