Ext.define('module.qc.basic.insptype.store.InspType', { extend:'Axt.data.Store',
	 model: 'module.qc.basic.insptype.model.InspType',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/qc/basic/insptype/get/search.do",
			update : _global.location.http() + "/qc/basic/insptype/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});