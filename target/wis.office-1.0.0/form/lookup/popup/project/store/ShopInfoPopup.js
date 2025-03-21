Ext.define('lookup.popup.project.store.ShopInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.project.model.ShopInfoPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/shopinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});