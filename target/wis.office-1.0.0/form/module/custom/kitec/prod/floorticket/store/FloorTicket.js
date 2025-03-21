Ext.define('module.custom.kitec.prod.floorticket.store.FloorTicket', { extend:'Axt.data.Store',
	model: 'module.custom.kitec.prod.floorticket.model.FloorTicket',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read	: _global.api_host_info + "/system/item/itemmast/get/search.do",
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});
