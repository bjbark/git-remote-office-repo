Ext.define('lookup.popup.store.CvicChckTypePopup', { extend:'Axt.data.Store',
	model :'lookup.popup.model.CvicChckTypePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/prod/cvic/cvicchecktype/get/lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});