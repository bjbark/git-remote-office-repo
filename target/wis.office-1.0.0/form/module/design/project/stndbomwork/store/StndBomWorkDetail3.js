Ext.define('module.design.project.stndbomwork.store.StndBomWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.design.project.stndbomwork.model.StndBomWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/stndbomwork/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});