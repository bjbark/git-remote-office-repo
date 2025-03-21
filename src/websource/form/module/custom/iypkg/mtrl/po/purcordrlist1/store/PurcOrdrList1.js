Ext.define('module.custom.iypkg.mtrl.po.purcordrlist1.store.PurcOrdrList1', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.mtrl.po.purcordrlist1.model.PurcOrdrList1',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/mtrl/po/purcordrlist1/get/search.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

