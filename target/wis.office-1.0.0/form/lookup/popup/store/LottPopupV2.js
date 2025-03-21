Ext.define('lookup.popup.store.LottPopupV2', { extend:'Axt.data.Store',
	model :'lookup.popup.model.LottPopupV2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/stock/lottwork/get/lookupV2.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});