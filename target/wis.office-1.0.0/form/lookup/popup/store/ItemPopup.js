Ext.define('lookup.popup.store.ItemPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopup',
	autoLoad: false,
	remoteSort: false,
//	pageSize: 16,
//	pageSize: 100,
	pageSize:  (_global.hqof_idcd.toUpperCase()=='N1000NBOLT'?9999999:100),
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});