Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork',
	pageSize	: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purcbillwork/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/mtrl/purc/purcbillwork/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
