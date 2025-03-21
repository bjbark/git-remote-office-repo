Ext.define('module.basic.funcwrhsmast.store.FuncWrhsMast', { extend:'Axt.data.Store',
	model : 'module.basic.funcwrhsmast.model.FuncWrhsMast',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/basic/funcwrhsmast/get/search.do",
			update : _global.location.http() + "/basic/funcwrhsmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});