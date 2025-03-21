Ext.define('module.custom.iypkg.item.productmast.store.ProductMastCalcPopup', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.item.productmast.model.ProductMastCalcPopup',
	pageSize : _global.hqof_idcd.toUpperCase()=="N1000LIEBE"?99999:100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/item/productmast/get/CalcSearch.do",
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

