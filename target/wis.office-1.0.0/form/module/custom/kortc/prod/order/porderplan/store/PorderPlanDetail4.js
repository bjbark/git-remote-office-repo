Ext.define('module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail4', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.porderplan.model.PorderPlanDetail4',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info     + "/system/custom/kortc/sale/order/sordermast/get/detail4.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
