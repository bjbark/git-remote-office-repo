Ext.define('lookup.popup.store.BoxTypePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BoxTypePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/iypkg/basic/boxtype/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});