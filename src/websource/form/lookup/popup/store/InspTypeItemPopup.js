Ext.define('lookup.popup.store.InspTypeItemPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.InspTypeItemPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/basic/insptypeitem/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});