Ext.define('system.popup.itembonsa.store.ItemBonsaPopup', { extend:'Axt.data.Store',	
	model: 'system.popup.itembonsa.model.ItemBonsaPopup',
	autoLoad: false,
//	pageSize: 17,
	pageSize: 100,
	proxy:{
		api:{
			 read   : _global.api_host_info + "/system/item/itemstore/get/dialogbonsa.do",
			 update : _global.api_host_info + '/system/item/itemrecv/set/itembonsa.do'
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
