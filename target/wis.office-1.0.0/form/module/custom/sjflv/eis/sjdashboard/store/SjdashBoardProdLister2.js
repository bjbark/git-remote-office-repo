Ext.define('module.custom.sjflv.eis.sjdashboard.store.SjdashBoardProdLister2', { extend:'Axt.data.Store',
	model :'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardProdLister2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/eis/sjdashboard/get/prod2.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});