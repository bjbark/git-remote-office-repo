Ext.define('module.project.projword.store.ProjWord', { extend:'Axt.data.Store',
	model: 'module.project.projword.model.ProjWord',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read   : _global.api_http + "/project/projword/get/search.do"
		   ,update : _global.api_http + "/project/projword/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});

