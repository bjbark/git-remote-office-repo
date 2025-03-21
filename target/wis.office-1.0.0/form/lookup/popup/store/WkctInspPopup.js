Ext.define('lookup.popup.store.WkctInspPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WkctInspPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctmast/get/insplookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});