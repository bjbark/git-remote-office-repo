Ext.define('module.qc.insp.inspentry51.store.InspEntry51Detail', { extend:'Axt.data.Store',
	model : 'module.qc.insp.inspentry51.model.InspEntry51Detail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/insp/inspentry51/get/detail.do",
			update	: _global.location.http() + "/qc/insp/inspentry51/set/detail.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});