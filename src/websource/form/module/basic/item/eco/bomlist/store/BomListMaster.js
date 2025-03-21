Ext.define('module.basic.item.eco.bomlist.store.BomListMaster', { extend:'Axt.data.Store',
	model: 'module.basic.item.eco.bomlist.model.BomListMaster',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/basic/item/eco/bomlist/get/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
