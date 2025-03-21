Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2File',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/upload/get/filesearch.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
