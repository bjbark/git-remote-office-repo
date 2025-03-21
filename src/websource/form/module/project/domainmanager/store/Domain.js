Ext.define('module.project.domainmanager.store.Domain', { extend:'Axt.data.Store',
	model: 'module.project.domainmanager.model.Domain',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/domain/get/search.do"
		   ,update : _global.api_http + "/project/domain/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});