Ext.define('module.mtrl.po.purcordrlist.store.PurcOrdrList2', { extend:'Axt.data.Store',
	model : 'module.mtrl.po.purcordrlist.model.PurcOrdrList',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/mtrl/po/purcordrlist/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});