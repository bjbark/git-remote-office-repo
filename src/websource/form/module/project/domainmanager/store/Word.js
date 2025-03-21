Ext.define('module.project.domainmanager.store.Word', { extend:'Axt.data.Store',
	model: 'module.project.domainmanager.model.Word',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/domain/get/searchword.do"
		   ,update : _global.api_http + "/project/domain/set/recordword.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});