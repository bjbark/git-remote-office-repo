Ext.define('lookup.popup.store.ProdPopupWkct', {extend:'Axt.data.Store',
	model :'lookup.popup.model.ProdPopupWkct',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			update	: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/prodwkct.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});