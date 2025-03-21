Ext.define('module.custom.komec.item.bomlist.store.BomListSpecLister', { extend:'Axt.data.Store',

	model: 'module.custom.komec.item.bomlist.model.BomListSpecLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/komec/item/bomlist/get/specSearch.do",
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
