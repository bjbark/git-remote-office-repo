Ext.define('module.basic.carmast.store.CarMast', { extend:'Axt.data.Store',
	model		: 'module.basic.carmast.model.CarMast',
	pageSize	: 100,
	proxy		: {
		api	: {
			read   : _global.api_host_info + "/system/basic/carmast/get/search.do",
			update : _global.api_host_info + "/system/basic/carmast/set/record.do"
		},
		actionMethods: {
			read	: 'POST', update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

