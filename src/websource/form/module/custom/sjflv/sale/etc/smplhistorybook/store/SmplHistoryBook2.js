Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook2', { extend:'Axt.data.Store',

	model: 'module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,

	proxy:{
		api:{
			read	: _global.api_host_info + "/system/custom/sjflv/sale/etc/smplhistorybook/get/search2.do",
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
