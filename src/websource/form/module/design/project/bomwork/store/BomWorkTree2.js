Ext.define('module.design.project.bomwork.store.BomWorkTree2', { extend:'Axt.data.Store',
	model : 'module.design.project.bomwork.model.BomWorkTree2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/bomwork/get/search2.do",
			update	: _global.location.http() + "/design/bomwork/set/qntt.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});