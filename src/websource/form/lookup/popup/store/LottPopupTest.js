Ext.define('lookup.popup.store.LottPopupTest', { extend:'Axt.data.Store',
	model :'lookup.popup.model.LottPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/stock/lottwork/get/lookupTest.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});