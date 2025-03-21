Ext.define('module.custom.hantop.item.cstmitemmap.store.CstmItemMapItem1', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.cstmitemmap.model.CstmItemMapItem1',
	pageSize : 300,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hntop/item/cstmitemmap/get/search2.do",
			 update : _global.location.http() + "/custom/hntop/item/cstmitemmap/set/item1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams :{ token : _global.token_id }
	}
});