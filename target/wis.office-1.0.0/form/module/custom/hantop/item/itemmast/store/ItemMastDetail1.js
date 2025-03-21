Ext.define('module.custom.hantop.item.itemmast.store.ItemMastDetail1', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemmast.model.ItemMastDetail1',
	pageSize: 200,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/detail1.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/detail1.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
