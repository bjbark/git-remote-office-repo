Ext.define('module.custom.sjflv.oms.omsmast.store.OmsMastSmpl', { extend:'Axt.data.Store',
	 model: 'module.custom.sjflv.oms.omsmast.model.OmsMastSmpl',
	pageSize: 36,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/sjflv/oms/omsmast/get/smplItem.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});