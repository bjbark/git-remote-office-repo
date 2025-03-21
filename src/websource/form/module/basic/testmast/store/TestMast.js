Ext.define('module.basic.testmast.store.TestMast', { extend:'Axt.data.Store',
	model: 'module.basic.testmast.model.TestMast',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/basic/testmast/get/search.do"
			,update : _global.location.http() + "/basic/testmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});