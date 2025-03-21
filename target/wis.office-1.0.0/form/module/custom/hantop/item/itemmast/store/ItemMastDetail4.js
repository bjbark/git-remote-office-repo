Ext.define('module.custom.hantop.item.itemmast.store.ItemMastDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.item.itemmast.model.ItemMastDetail4',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			 read	: _global.location.http() + "/custom/hantop/item/itemmast/get/detail4.do"
			,update : _global.location.http() + "/custom/hantop/item/itemmast/set/detail4.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
