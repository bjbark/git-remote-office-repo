Ext.define('lookup.popup.store.ZonePopup', { extend:'Axt.data.Store',
	
	model :'lookup.popup.model.ZonePopup',
	
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itempackzone/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});