Ext.define('module.custom.kortc.item.itemmast.store.ItemMast', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.item.itemmast.model.ItemMast',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
//	pageSize:  (_global.hqof_idcd.toUpperCase()=='N1000NBOLT'?500:Const.SELECT.rows), //TODO : 향후 page를 사용하지 않는 업체를 옵션값으로 정해서 처리해야함
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/kortc/item/itemmast/get/search.do",
			update : _global.api_host_info + "/system/custom/kortc/item/itemmast/set/record.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
