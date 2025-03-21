Ext.define('module.prod.cvic.cvicmonitring.store.CvicMonitringRunningData', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicmonitring.model.CvicMonitringRunningData',
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
