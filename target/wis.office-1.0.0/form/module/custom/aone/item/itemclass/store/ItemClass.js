Ext.define('module.custom.aone.item.itemclass.store.ItemClass', { extend:'Axt.data.Store',

	model: 'module.custom.aone.item.itemclass.model.ItemClass',
	autoLoad: false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/aone/item/itemclss/get/search.do",
			update	: _global.api_host_info + "/system/custom/aone/item/itemclss/set/record.do"
		},
		actionMethods: {
			read	: 'POST' ,
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
