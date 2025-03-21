Ext.define('lookup.popup.store.ShetPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ShetPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/workshop/print/basic/sheetmast/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});