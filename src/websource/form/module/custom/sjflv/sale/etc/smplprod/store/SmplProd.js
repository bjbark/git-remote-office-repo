Ext.define('module.custom.sjflv.sale.etc.smplprod.store.SmplProd', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.sale.etc.smplprod.model.SmplProd',
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