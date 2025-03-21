Ext.define('lookup.popup.project.store.BonsaPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.BonsaPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/bonsainfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});