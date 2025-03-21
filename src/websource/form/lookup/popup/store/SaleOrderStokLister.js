Ext.define('lookup.popup.store.SaleOrderStokLister', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.SaleOrderStokLister',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/stok.do",
//			update: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
