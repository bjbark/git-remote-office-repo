Ext.define('module.prod.project.prjtprodplan2.store.PrjtWorkMansPopup', { extend:'Axt.data.Store',
	model :'module.prod.project.prjtprodplan2.model.PrjtWorkMansPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctusermast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});