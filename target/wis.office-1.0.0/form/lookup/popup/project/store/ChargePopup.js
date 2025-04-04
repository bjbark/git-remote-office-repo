Ext.define('lookup.popup.project.store.ChargePopup', { extend:'Axt.data.Store',
	
	model:'lookup.popup.project.model.ChargePopup',
	autoLoad: false,
	pageSize: 17, 
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/chargeinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});