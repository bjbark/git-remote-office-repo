Ext.define('module.eis.project.eisreport.store.EisReportRunnStopTime', { extend:'Axt.data.Store',
	model: 'module.eis.project.eisreport.model.EisReportRunnStopTime',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cvicmonitring/get/runnstoptime.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
