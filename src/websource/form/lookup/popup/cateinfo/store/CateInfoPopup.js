Ext.define('lookup.popup.cateinfo.store.CateInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.cateinfo.model.CateInfoPopup',
	autoLoad: false,
//	pageSize: 20,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/shop/cateinfo/get/search.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});