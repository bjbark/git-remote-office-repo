Ext.define('lookup.popup.store.DeptPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.DeptPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/deptmast/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});