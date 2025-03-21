Ext.define('lookup.popup.project.store.PhonePopup', { extend:'Axt.data.Store',
	
	model:'lookup.popup.project.model.PhonePopup',
	autoLoad: false,
	pageSize: 17, 
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/phoneinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});