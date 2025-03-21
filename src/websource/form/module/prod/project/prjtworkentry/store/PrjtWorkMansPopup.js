Ext.define('module.prod.project.prjtworkentry.store.PrjtWorkMansPopup', { extend:'Axt.data.Store',
	model :'module.prod.project.prjtworkentry.model.PrjtWorkMansPopup',
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