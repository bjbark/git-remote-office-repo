Ext.define('module.prod.cvic.cviclist.store.CvicList', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cviclist.model.CvicList',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cviclist/get/search.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
