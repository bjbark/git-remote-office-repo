Ext.define('lookup.popup.store.ItemPopupV3_3', { extend:'Axt.data.Store',
	model :'lookup.popup.model.ItemPopupV3_3',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/item/itemmast/get/osttrett.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});