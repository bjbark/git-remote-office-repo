Ext.define('lookup.popup.project.store.AgentPopup', { extend:'Axt.data.Store',

	model:'lookup.popup.project.model.AgentPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   : _global.location.http() + '/project/cagentinfo/get/lookup.do'
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});