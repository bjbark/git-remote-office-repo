Ext.define('module.mtrl.po.purcordrlist.store.PurcOrdrList', { extend:'Axt.data.Store',
	model : 'module.mtrl.po.purcordrlist.model.PurcOrdrList',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/mtrl/po/purcordrlist/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});