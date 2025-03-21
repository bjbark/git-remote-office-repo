Ext.define('module.design.project.bomwork.store.BomWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.design.project.bomwork.model.BomWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/bomwork/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});