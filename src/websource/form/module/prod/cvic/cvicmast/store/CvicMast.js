Ext.define('module.prod.cvic.cvicmast.store.CvicMast', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicmast.model.CvicMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cvicmast/get/search.do",
			 update : _global.api_host_info + "/system/prod/cvic/cvicmast/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
