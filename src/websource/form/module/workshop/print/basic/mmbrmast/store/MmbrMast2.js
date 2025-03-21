Ext.define('module.workshop.print.basic.mmbrmast.store.MmbrMast2', { extend:'Axt.data.Store',
	model	: 'module.workshop.print.basic.mmbrmast.model.MmbrMast2',
	pageSize: 200,
	proxy	: {
		api	: {
			read	: _global.location.http() + "/workshop/print/basic/mmbrmast/get/search2.do",
			update	: _global.location.http() + "/workshop/print/basic/mmbrmast/set/address.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});