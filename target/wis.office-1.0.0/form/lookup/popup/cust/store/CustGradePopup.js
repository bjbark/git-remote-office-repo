Ext.define('lookup.popup.cust.store.CustGradePopup', {extend:'Axt.data.Store',
	model:'lookup.popup.cust.model.CustGradePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info+ "/system/cust/custgrade/get/lookup.do",
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