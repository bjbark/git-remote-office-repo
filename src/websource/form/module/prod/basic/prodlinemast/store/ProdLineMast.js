Ext.define('module.prod.basic.prodlinemast.store.ProdLineMast', { extend:'Axt.data.Store',
	model: 'module.prod.basic.prodlinemast.model.ProdLineMast',
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/basic/prodlinemast/get/search.do",
			update : _global.location.http() + "/prod/basic/prodlinemast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});