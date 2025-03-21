Ext.define('lookup.popup.store.ItemPopupSjung', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopupSjung',
	autoLoad: false,
	remoteSort: true,
//	pageSize: 16,
	pageSize: 100,
//	pageSize:  (_global.hqof_idcd.toUpperCase()=='N1000NBOLT'?9999999:100),
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/item/bommast/get/search2.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});