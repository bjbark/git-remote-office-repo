Ext.define('module.basic.systemoption.store.SystemOption', { extend:'Axt.data.Store',
	model: 'module.basic.systemoption.model.SystemOption',
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/basic/systemoption/get/search.do",
			update : _global.location.http() + "/basic/systemoption/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});