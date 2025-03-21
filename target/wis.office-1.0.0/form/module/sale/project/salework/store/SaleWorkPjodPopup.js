Ext.define('module.sale.project.salework.store.SaleWorkPjodPopup', { extend:'Axt.data.Store',
	model :'module.sale.project.salework.model.SaleWorkPjodPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/sale/project/prjtwork/get/sale_work_lookup.do"
		},
		actionMethods: { read: 'POST' , update: 'POST' },
		extraParams:{ token : _global.token_id }
	}
});