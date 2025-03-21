Ext.define('lookup.popup.itemzone.store.ItemZonePopup', {
	extend:'Axt.data.Store',
	model:'lookup.popup.itemzone.model.ItemZonePopup',
	autoLoad: false,
//	pageSize: 20,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itempackzone/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});