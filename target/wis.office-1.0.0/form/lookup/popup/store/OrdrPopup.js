Ext.define('lookup.popup.store.OrdrPopup', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.OrdrPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/saleorder2/get/lookup.do"
		},
		actionMethods: { read : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});
