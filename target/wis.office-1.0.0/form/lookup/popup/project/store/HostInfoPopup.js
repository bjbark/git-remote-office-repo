Ext.define('lookup.popup.project.store.HostInfoPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.HostInfoPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/hostinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});