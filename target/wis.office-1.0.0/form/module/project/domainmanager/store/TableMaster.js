Ext.define('module.project.domainmanager.store.TableMaster', { extend:'Axt.data.Store',
	model: 'module.project.domainmanager.model.TableMaster',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/domain/get/table.do"
		   ,update : _global.api_http + "/project/domain/set/tablelist.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});