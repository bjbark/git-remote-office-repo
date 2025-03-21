Ext.define('module.custom.hantop.item.cstmitemmap.store.CstmItemMapItem2', { extend:'Axt.data.Store',
	model : 'module.custom.hantop.item.cstmitemmap.model.CstmItemMapItem2',
	pageSize : 300,
	proxy : {
		api : {
			 read	: _global.location.http() + "/custom/hntop/item/cstmitemmap/get/search3.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});