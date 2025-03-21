Ext.define('module.prod.cvic.cvicmonitring.store.CvicMonitringChart2', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicmonitring.model.CvicMonitringChart2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cvicmonitring/get/timeline.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
