Ext.define('module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister1', { extend:'Axt.data.Store',
	model :'module.custom.sjflv.eis.sjdashboard.model.SjdashBoardMtrlLister1',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/sjflv/eis/sjdashboard/get/mtrl1.do",
//			update : _global.api_host_info + "/system/custom/sjflv/eis/sjdashboard/set/record.do"
		},
		actionMethods: { read: 'POST' ,update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});