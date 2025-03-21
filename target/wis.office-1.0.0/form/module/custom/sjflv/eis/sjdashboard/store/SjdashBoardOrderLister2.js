Ext.define('module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister2', { extend:'Axt.data.Store',
	model :'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardOrderLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/eis/sjdashboard/get/order_new.do",
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});