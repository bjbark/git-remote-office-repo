Ext.define('lookup.popup.store.ProdPopupFabc', {extend:'Axt.data.Store',
	model :'lookup.popup.model.ProdPopupFabc',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			update	: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/prodfabc.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});