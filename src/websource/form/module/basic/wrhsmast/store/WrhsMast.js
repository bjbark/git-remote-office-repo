Ext.define('module.basic.wrhsmast.store.WrhsMast', { extend:'Axt.data.Store',
	model : 'module.basic.wrhsmast.model.WrhsMast',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/basic/wrhsmast/get/search.do"
			,update : _global.location.http() + "/basic/wrhsmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});