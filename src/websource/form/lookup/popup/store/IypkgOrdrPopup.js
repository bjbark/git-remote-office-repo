Ext.define('lookup.popup.store.IypkgOrdrPopup', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.IypkgOrdrPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});
