Ext.define('module.custom.sjflv.item.bomlist.store.BomListMtrlLister1', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.item.bomlist.model.BomListMtrlLister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/item/bomlist/get/mtrlSearch1.do",
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
