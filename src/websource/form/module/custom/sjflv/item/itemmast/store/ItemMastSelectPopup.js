Ext.define('module.custom.sjflv.item.itemmast.store.ItemMastSelectPopup', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.item.itemmast.model.ItemMast',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/item/itemmast/get/select.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
