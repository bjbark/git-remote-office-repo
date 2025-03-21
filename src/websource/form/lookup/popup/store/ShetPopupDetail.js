Ext.define('lookup.popup.store.ShetPopupDetail', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ShetPopupDetail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/workshop/print/basic/sheetmast/get/search2.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});