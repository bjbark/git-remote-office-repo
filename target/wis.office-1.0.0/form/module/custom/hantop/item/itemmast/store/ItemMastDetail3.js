Ext.define('module.custom.hantop.item.itemmast.store.ItemMastDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemmast.model.ItemMastDetail3',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/detail3.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/detail3.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
