Ext.define('lookup.popup.project.store.RndWordPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.RndWordPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() + '/project/rndword/get/lookup.do'
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});