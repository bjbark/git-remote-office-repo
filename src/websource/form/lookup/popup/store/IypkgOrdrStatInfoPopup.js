Ext.define('lookup.popup.store.IypkgOrdrStatInfoPopup', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.IypkgOrdrStatInfoPopup',
	autoLoad: false,
	remoteSort: true,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/searchPopup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});
