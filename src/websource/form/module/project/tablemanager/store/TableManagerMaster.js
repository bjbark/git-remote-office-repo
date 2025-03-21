Ext.define('module.project.tablemanager.store.TableManagerMaster', { extend:'Axt.data.Store',
	model: 'module.project.tablemanager.model.TableManagerMaster',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanager/get/master.do"
		   ,update : _global.api_http + "/project/tablemanager/set/master.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});