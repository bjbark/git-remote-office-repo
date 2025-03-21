Ext.define('module.custom.komec.item.bommast.store.BomMastLister1', { extend:'Axt.data.Store',

	model: 'module.custom.komec.item.bommast.model.BomMastLister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/item/bommast/get/search.do",
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
