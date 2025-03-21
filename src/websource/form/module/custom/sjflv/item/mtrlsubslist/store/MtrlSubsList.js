Ext.define('module.custom.sjflv.item.mtrlsubslist.store.MtrlSubsList', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.item.mtrlsubslist.model.MtrlSubsList',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/sjflv/item/mtrlsubslist/get/search.do"
			,update : _global.location.http() + "/custom/sjflv/item/mtrlsubslist/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});