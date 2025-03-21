Ext.define('module.custom.sjflv.prod.order.workbook.store.WorkBookMtrlPopup', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.order.workbook.model.WorkBookMtrlPopup',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/custom/sjflv/prod/workbook/get/mtrlivst.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});