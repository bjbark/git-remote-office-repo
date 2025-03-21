Ext.define('module.eis.report.eisreport15.store.EisReport15', { extend:'Axt.data.Store',
	model: 'module.eis.report.eisreport15.model.EisReport15',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 2000,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/eis/report/eisreport1/get/search4.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
