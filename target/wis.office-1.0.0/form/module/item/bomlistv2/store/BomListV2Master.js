Ext.define('module.item.bomlistv2.store.BomListV2Master', { extend:'Axt.data.Store',
	model: 'module.item.bomlistv2.model.BomListV2Master',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/item/bomlistv2/get/master.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
