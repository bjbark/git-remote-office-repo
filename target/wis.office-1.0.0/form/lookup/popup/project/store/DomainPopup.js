Ext.define('lookup.popup.project.store.DomainPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.DomainPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() +  "/project/domain/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});