Ext.define('module.project.tablemanagerv2.store.TableManagerV2', { extend:'Axt.data.Store',
	model: 'module.project.tablemanagerv2.model.TableManagerV2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_http + "/project/tablemanagerv2/get/search.do"
		   ,update : _global.api_http + "/project/tablemanagerv2/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});