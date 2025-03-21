Ext.define('module.prod.project.prjtworkentry.store.PrjtWorkCvicPopup', { extend:'Axt.data.Store',

	model :'module.prod.project.prjtworkentry.model.PrjtWorkCvicPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctcvicmast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});