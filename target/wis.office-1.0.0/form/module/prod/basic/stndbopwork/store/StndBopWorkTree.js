Ext.define('module.prod.basic.stndbopwork.store.StndBopWorkTree', { extend:'Axt.data.TreeStore',
	model : 'module.prod.basic.stndbopwork.model.StndBopWorkTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/stndbopwork/get/search.do",
			update	: _global.location.http() + "/prod/basic/stndbopwork/set/setTree.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});