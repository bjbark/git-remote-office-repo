Ext.define('module.basic.bzplmast.store.BzplMast', { extend:'Axt.data.Store',
	model: 'module.basic.bzplmast.model.BzplMast',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/basic/bzplmast/get/search.do"
			,update : _global.location.http() + "/basic/bzplmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});