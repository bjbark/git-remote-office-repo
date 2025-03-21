Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkListerMaster', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerMaster',
	pageSize : 100,
	autoLoad : false,
	remoteSort	: false,
	sorters:[{property :'invc_date',direction:'DESC'},{property :'invc_numb',direction:'DESC'}], // API값을 sqlresult에 담으면 sort가 안되므로 stor에서 sort처리한다.
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/search.do",
			update : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/set/deleteMaster.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

