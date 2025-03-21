Ext.define('module.design.project.dsigfile.store.DsigFileTree', { extend:'Axt.data.TreeStore',
	model : 'module.design.project.dsigfile.model.DsigFileTree',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigfile/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});