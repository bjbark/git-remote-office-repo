Ext.define('module.project.tablemanager.store.TableManagerDomain', { extend:'Axt.data.Store',
	model: 'module.project.tablemanager.model.TableManagerDomain',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanager/get/searchdomain.do"
		   ,update : _global.api_http + "/project/tablemanager/set/recorddomain.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});