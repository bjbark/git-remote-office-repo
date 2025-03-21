Ext.define('lookup.popup.membership.store.PntMemberPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.membership.model.PntMemberPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/membership/mmbmst/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});