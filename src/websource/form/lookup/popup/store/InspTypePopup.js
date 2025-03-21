Ext.define('lookup.popup.store.InspTypePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.InspTypePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/qc/basic/insptype/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});