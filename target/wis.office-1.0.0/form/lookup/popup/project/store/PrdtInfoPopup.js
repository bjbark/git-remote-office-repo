Ext.define('lookup.popup.project.store.PrdtInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.project.model.PrdtInfoPopup',
	autoLoad: false,
	pageSize: 17, 
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/prdtinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});