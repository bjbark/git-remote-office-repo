Ext.define('lookup.popup.store.BoltNumbPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BoltNumbPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/boltnumb/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});