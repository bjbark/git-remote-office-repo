Ext.define('module.workshop.print.basic.sheetmast.store.SheetMast', { extend:'Axt.data.Store',
	model : 'module.workshop.print.basic.sheetmast.model.SheetMast',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/workshop/print/basic/sheetmast/get/search.do"
			,update : _global.location.http() + "/workshop/print/basic/sheetmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});