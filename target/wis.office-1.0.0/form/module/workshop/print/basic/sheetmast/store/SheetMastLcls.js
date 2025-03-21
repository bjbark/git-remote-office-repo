Ext.define('module.workshop.print.basic.sheetmast.store.SheetMastLcls', { extend:'Axt.data.Store',
	model : 'module.workshop.print.basic.sheetmast.model.SheetMastClss',
	pageSize : 200,
	proxy : {
		api : {
			 read	: _global.location.http() + "/item/itemclss/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});