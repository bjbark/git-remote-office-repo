Ext.define('lookup.popup.store.MembPopup', {extend:'Axt.data.Store',
	model :'lookup.popup.model.MembPopup',
	autoLoad: false,
//	pageSize: 20,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/custstore/get/lookup/memb.do",
			search : "",
			master : ""
		},
		apiurl : {
			search : "",
			master : ""
		},
		
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});