Ext.define('module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemDetail', { extend:'Axt.data.Store',
	model: 'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/prod/cvic/cvicchecktypeitem/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
