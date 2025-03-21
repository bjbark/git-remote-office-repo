Ext.define('module.custom.hantop.item.itemmast.store.ItemMastDetail5', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemmast.model.ItemMastDetail5',
	pageSize: 200,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/detail5.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/detail5.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
