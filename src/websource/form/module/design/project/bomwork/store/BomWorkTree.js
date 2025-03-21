Ext.define('module.design.project.bomwork.store.BomWorkTree', { extend:'Axt.data.TreeStore',
	model : 'module.design.project.bomwork.model.BomWorkTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/design/bomwork/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});