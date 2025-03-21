Ext.define('module.custom.hantop.item.itemmast.store.ItemMastDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemmast.model.ItemMastDetail2',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/detail2.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
