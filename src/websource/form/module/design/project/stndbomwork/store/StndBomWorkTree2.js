Ext.define('module.design.project.stndbomwork.store.StndBomWorkTree2', { extend:'Axt.data.Store',
	model : 'module.design.project.stndbomwork.model.StndBomWorkTree2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/stndbomwork/get/search2.do",
			update	: _global.location.http() + "/design/stndbomwork/set/qntt.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});