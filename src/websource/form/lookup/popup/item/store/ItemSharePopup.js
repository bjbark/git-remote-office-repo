Ext.define('lookup.popup.item.store.ItemSharePopup', { extend:'Axt.data.Store',	
	model: 'lookup.popup.item.model.ItemSharePopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			 read   : _global.api_host_info+ '/system/item/itemshare/get/search.do',
			 update : _global.api_host_info+ '/system/item/itemshare/set/itemhq.do'
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
