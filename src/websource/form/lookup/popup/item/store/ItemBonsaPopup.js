Ext.define('lookup.popup.item.store.ItemBonsaPopup', { extend:'Axt.data.Store',
	model: 'lookup.popup.item.model.ItemBonsaPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			 read   : _global.api_host_info+ "/system/item/itemstore/get/dialoghq.do",
			 update : _global.api_host_info+ '/system/item/itemrecv/set/itemhq.do'
		},
		actionMethods: {
		     read  : 'POST' ,
		     update : 'POST'
		},
		 extraParams:{
			  token : _global.token_id
		}
	}
});
