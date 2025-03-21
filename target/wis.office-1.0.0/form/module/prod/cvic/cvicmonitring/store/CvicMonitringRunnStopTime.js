Ext.define('module.prod.cvic.cvicmonitring.store.CvicMonitringRunnStopTime', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicmonitring.model.CvicMonitringRunnStopTime',
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
