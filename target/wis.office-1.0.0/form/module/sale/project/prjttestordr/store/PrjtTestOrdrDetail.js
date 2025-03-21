Ext.define('module.sale.project.prjttestordr.store.PrjtTestOrdrDetail', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjttestordr.model.PrjtTestOrdrDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjttestordr/get/detail.do",
			update	: _global.location.http() + "/sale/project/prjttestordr/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});