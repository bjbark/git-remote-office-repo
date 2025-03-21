Ext.define('module.basic.unitmast.store.UnitMast', { extend:'Axt.data.Store',
	model : 'module.basic.unitmast.model.UnitMast',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/basic/unitmast/get/search.do"
			,update : _global.location.http() + "/basic/unitmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});