Ext.define('lookup.popup.project.store.DeptInfoPopup', { extend:'Axt.data.Store',
	model :'lookup.popup.project.model.DeptInfoPopup',
	autoLoad: false,
	pageSize: 17,
	proxy:{
		api:{
			read   :  _global.location.http() + "/project/deptinfo/get/lookup.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});