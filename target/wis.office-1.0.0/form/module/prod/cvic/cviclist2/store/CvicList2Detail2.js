Ext.define('module.prod.cvic.cviclist2.store.CvicList2Detail2', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cviclist2.model.CvicList2Detail2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/prod/cvic/cviclist2/get/detail2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
