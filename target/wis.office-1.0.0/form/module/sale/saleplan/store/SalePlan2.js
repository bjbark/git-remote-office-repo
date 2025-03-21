Ext.define('module.sale.saleplan.store.SalePlan2', { extend:'Axt.data.Store',
	model: 'module.sale.saleplan.model.SalePlan',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/sale/saleplan/get/plan.do",
			 update : _global.api_host_info + "/system/sale/saleplan/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
