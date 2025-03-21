Ext.define('lookup.popup.store.DelyLcalPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.model.DelyLcalPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/basic/delylcalmast/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});