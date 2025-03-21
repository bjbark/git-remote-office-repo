Ext.define('module.basic.hdcomast.store.HdcoMast', { extend:'Axt.data.Store',
	model : 'module.basic.hdcomast.model.HdcoMast',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/basic/hdcomast/get/search.do"
			,update : _global.location.http() + "/basic/hdcomast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});