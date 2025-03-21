Ext.define('module.eis.report.eisreport13.store.EisReport13', { extend:'Axt.data.Store',
	model: 'module.eis.report.eisreport13.model.EisReport13',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 2000,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/eis/report/eisreport1/get/search3.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
