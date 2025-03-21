Ext.define('lookup.popup.store.WrhsZonePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WrhsZonePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/basic/wrhszone/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});