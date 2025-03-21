Ext.define('module.eis.report.eisreport11.store.EisReport11', { extend:'Axt.data.Store',
	model: 'module.eis.report.eisreport11.model.EisReport11',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 2000,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/eis/report/eisreport1/get/search1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
