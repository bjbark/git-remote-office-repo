Ext.define('lookup.popup.store.ItemPopup3', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopup3',
	autoLoad: false,
	remoteSort: true,
//	pageSize: 16,
//	pageSize: 100,
	pageSize:  (_global.hqof_idcd.toUpperCase()=='N1000NBOLT'?9999999:100),
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/workshop/sale/order/estimast/get/sheetlookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});