Ext.define('module.custom.sjflv.sale.sale.noteiomy.store.NoteIomyLister2', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.sale.sale.noteiomy.model.NoteIomy',
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/sjflv/sale/sale/noteiomy/get/search2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});