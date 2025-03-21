Ext.define('module.prod.project.prjtprodplan2.store.PrjtProdBomPopup', { extend:'Axt.data.Store',
	model :'module.prod.project.prjtprodplan2.model.PrjtProdBomPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/project/prjtprodplan2/get/bom.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});