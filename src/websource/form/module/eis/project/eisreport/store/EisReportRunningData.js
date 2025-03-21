Ext.define('module.eis.project.eisreport.store.EisReportRunningData', { extend:'Axt.data.Store',
	model: 'module.eis.project.eisreport.model.EisReportRunningData',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cvicmonitring/get/runningdata.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
