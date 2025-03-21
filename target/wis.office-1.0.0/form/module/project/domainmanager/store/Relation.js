Ext.define('module.project.domainmanager.store.Relation', { extend:'Axt.data.Store',
	model: 'module.project.domainmanager.model.Relation',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/domain/get/relation.do"
		   ,update : _global.api_http + "/project/domain/set/relation.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});