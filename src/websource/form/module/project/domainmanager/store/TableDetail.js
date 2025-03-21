Ext.define('module.project.domainmanager.store.TableDetail', { extend:'Axt.data.Store',
	model: 'module.project.domainmanager.model.TableDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/domain/get/searchtable.do"
		   ,update : _global.api_http + "/project/domain/set/table.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});