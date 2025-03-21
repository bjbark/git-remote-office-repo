Ext.define('lookup.popup.project.store.UserInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.project.model.UserInfoPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/cuserinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});