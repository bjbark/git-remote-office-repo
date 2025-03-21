Ext.define('module.basic.clssmast.store.ClssMastExcel', { extend:'module.basic.clssmast.store.ClssMast',
	model:'module.basic.clssmast.model.ClssMastExcel',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/basic/clssmast/get/search/excel.do"
		},
		extraParams:{ token : _global.token_id }
	}
});