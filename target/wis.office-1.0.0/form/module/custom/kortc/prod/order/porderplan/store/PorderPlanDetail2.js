Ext.define('module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderplan.model.PorderPlanDetail2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/get/detail2.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
