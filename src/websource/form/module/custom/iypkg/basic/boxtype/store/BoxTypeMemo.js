Ext.define('module.custom.iypkg.basic.boxtype.store.BoxTypeMemo', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.basic.boxtype.model.BoxTypeMemo',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/iypkg/basic/boxtype/get/item_memo.do",
			update : _global.api_host_info + "/system/custom/iypkg/basic/boxtype/set/item_memo.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
