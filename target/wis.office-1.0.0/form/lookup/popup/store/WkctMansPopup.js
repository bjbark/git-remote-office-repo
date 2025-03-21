Ext.define('lookup.popup.store.WkctMansPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.WkctMansPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/prod/basic/wkctusermast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});