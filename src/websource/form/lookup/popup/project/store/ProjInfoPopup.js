Ext.define('lookup.popup.project.store.ProjInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.project.model.ProjInfoPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/projinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});