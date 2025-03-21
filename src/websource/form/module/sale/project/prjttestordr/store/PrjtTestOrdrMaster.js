Ext.define('module.sale.project.prjttestordr.store.PrjtTestOrdrMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjttestordr.model.PrjtTestOrdrMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjttestordr/get/master.do",
			update	: _global.location.http() + "/sale/project/prjttestordr/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});