Ext.define('lookup.popup.project.store.GridFieldPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.GridFieldPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() + '/project/rndtool/get/lookup.do'
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});