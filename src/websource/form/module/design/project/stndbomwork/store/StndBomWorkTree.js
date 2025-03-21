Ext.define('module.design.project.stndbomwork.store.StndBomWorkTree', { extend:'Axt.data.TreeStore',
	model : 'module.design.project.stndbomwork.model.StndBomWorkTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/design/stndbomwork/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});