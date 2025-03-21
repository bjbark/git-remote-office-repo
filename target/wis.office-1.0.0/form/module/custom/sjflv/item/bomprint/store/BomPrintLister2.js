Ext.define('module.custom.sjflv.item.bomprint.store.BomPrintLister2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.item.bomprint.model.BomPrintLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/item/bomprint/get/search2.do",
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
