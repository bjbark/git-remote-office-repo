Ext.define('module.custom.sjflv.item.bomlist.store.BomListCstmLister3', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.item.bomlist.model.BomListCstmLister3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/item/bomlist/get/cstmSearch3.do",
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
