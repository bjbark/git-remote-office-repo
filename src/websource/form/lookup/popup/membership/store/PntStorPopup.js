Ext.define('lookup.popup.membership.store.PntStorPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.membership.model.PntStorPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/pntstor/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});