Ext.define('module.basic.deptmast.store.DeptMast', { extend:'Axt.data.Store',
	model: 'module.basic.deptmast.model.DeptMast',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/basic/deptmast/get/search.do"
			,update : _global.location.http() + "/basic/deptmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});