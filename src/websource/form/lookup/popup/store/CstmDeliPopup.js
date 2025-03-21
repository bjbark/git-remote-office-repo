Ext.define('lookup.popup.store.CstmDeliPopup', { extend:'Axt.data.Store',

	model :'lookup.popup.model.CstmDeliPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 999,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/cust/cstmmast/get/cstmdeli.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});