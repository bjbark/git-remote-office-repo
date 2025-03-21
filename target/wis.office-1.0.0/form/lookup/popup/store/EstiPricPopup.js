Ext.define('lookup.popup.store.EstiPricPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.EstiPricPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/workshop/sale/order/estimast/get/esti_pric_lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});