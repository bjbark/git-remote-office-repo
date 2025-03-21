Ext.define('module.project.tablemanagerv2.store.TableManagerV2Master', { extend:'Axt.data.Store',
	model: 'module.project.tablemanagerv2.model.TableManagerV2Master',
	autoLoad: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanagerv2/get/master.do"
		   ,update : _global.api_http + "/project/tablemanagerv2/set/master.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});