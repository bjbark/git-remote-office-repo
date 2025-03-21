Ext.define('lookup.popup.store.PurcOrdrPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.PurcOrdrPopup',
	autoLoad: false,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/mtrl/po/purcordr/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});