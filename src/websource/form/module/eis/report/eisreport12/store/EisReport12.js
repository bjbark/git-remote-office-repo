Ext.define('module.eis.report.eisreport12.store.EisReport12', { extend:'Axt.data.Store',
	model: 'module.eis.report.eisreport12.model.EisReport12',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 2000,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/eis/report/eisreport1/get/search2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
