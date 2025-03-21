Ext.define('module.workshop.print.basic.sheetmast.store.SheetMastDetail', { extend:'Axt.data.Store',
	model : 'module.workshop.print.basic.sheetmast.model.SheetMastDetail',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/print/basic/sheetmast/get/search2.do"
			,update : _global.location.http() + "/workshop/print/basic/sheetmast/set/record2.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});