Ext.define('lookup.popup.store.WrhsWkctPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WrhsWkctPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/wrhsmast/get/wrhswkctlookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});