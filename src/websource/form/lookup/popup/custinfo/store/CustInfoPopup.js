Ext.define('lookup.popup.custinfo.store.CustInfoPopup', {extend:'Axt.data.Store',
	model:'lookup.popup.custinfo.model.CustInfoPopup',
	autoLoad: false,
//	pageSize: 20,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/custstore/get/dialog/memb.do",
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