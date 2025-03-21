Ext.define('module.sale.saleplan.store.SalePlan', { extend:'Axt.data.Store',
	model: 'module.sale.saleplan.model.SalePlan',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/sale/saleplan/get/search.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
