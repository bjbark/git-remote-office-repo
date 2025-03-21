Ext.define('module.design.project.stndbomwork.store.StndBomWorkMaster', { extend:'Axt.data.Store',
	model : 'module.design.project.stndbomwork.model.StndBomWorkMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/stndbomwork/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});