Ext.define('module.custom.komec.item.bommast.store.BomMastLister3', { extend:'Axt.data.Store',

	model: 'module.custom.komec.item.bommast.model.BomMastLister3',
	autoLoad: false,
	remoteSort:true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/item/bommast/get/search3.do",
			update	: _global.api_host_info + "/system/custom/komec/item/bommast/set/recordBom.do"
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
