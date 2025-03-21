Ext.define('module.custom.komec.item.bomlist.store.BomListCstmLister2', { extend:'Axt.data.Store',

	model: 'module.custom.komec.item.bomlist.model.BomListCstmLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/item/bomlist/get/cstmSearch2.do",
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
