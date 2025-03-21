Ext.define('module.design.project.bomwork.store.BomWorkMaster', { extend:'Axt.data.Store',
	model : 'module.design.project.bomwork.model.BomWorkMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "design/bomwork/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});