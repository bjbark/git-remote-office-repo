Ext.define('module.mtrl.po.poplan.store.PoPlanMaster2', { extend:'Axt.data.Store',
	model : 'module.mtrl.po.poplan.model.PoPlanMaster2',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/mtrl/po/poplan/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});