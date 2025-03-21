Ext.define('lookup.popup.item.store.UnitPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.item.model.UnitPopup',

	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemunit/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});