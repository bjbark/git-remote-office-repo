Ext.define('lookup.popup.project.store.DistrPopup', { extend:'Axt.data.Store',
	
	model:'lookup.popup.project.model.DistrPopup',
	autoLoad: false,
	pageSize: 17, 
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/distrinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});