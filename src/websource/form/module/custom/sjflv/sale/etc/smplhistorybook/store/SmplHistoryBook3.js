Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.store.SmplHistoryBook3', { extend:'Axt.data.TreeStore',
	model : 'module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook3',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/sjflv/sale/etc/smplhistorybook/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});