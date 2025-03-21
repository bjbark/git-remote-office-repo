Ext.define('lookup.popup.store.PrjtPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.PrjtPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/sale/project/prjtmast/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});