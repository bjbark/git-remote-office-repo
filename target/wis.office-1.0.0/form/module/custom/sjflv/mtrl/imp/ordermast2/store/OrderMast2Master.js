Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Master', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Master',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/mtrl/imp/ordermast2/set/deleteMaster.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
