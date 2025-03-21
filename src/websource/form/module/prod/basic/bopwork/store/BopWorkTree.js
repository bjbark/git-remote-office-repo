Ext.define('module.prod.basic.bopwork.store.BopWorkTree', { extend:'Axt.data.TreeStore',
	model : 'module.prod.basic.bopwork.model.BopWorkTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/bopwork/get/search.do",
			update	: _global.location.http() + "/prod/basic/bopwork/set/setTree.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});