Ext.define('module.project.tablemanager.store.TableManager', { extend:'Axt.data.Store',
	model: 'module.project.tablemanager.model.TableManager',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanager/get/search.do"
		   ,update : _global.api_http + "/project/tablemanager/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});