Ext.define('module.custom.sjflv.oms.omsmast.store.OmsMast', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.oms.omsmast.model.OmsMast',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/sjflv/oms/omsmast/get/search.do",
			update : _global.location.http() + "/custom/sjflv/oms/omsmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});