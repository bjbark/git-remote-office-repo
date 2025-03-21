Ext.define('module.project.codeinfo.store.CodeInfo', { extend:'Axt.data.Store',
	model: 'module.project.codeinfo.model.CodeInfo',
	pageSize: 20,
	proxy:{
		api:{
			read   : _global.location.http() + "/project/codeinfo/get/search.do"
		   ,update : _global.location.http() + "/project/codeinfo/set/master.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});