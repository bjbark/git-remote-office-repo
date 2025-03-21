Ext.define('lookup.popup.store.CardIdPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.CardIdPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/moa/moacardcreate/get/idlookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});