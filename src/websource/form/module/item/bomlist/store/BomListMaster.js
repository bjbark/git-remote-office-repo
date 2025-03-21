Ext.define('module.item.bomlist.store.BomListMaster', { extend:'Axt.data.Store',
	model: 'module.item.bomlist.model.BomListMaster',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/item/bomlist/get/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
