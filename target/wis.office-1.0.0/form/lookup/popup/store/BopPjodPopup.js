Ext.define('lookup.popup.store.BopPjodPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.BopPjodPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/basic/bopwork/get/getlookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});