Ext.define('lookup.popup.store.ProrPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ProrPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/order/prodorder/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});