Ext.define('lookup.popup.store.PjodPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.PjodPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/sale/project/prjtwork/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});