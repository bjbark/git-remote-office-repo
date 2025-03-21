Ext.define('lookup.popup.project.store.WordPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.WordPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() + '/project/tablemanager/get/wordlookup.do'
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});