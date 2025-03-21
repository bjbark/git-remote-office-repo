/**
 * 우편번호 팝업(Axt.popup.view.ZipcodeSearch)에서 사용되는 store
 */
Ext.define('Axt.popup.store.ZipcodeSearch', { extend:'Axt.data.Store',	
	model: 'Axt.popup.model.ZipcodeSearch',
	autoLoad: false,
	pageSize: 17, 
	proxy:{
		api:{
//			read   : _global.api_host_info + "/" + _global.app_site +"/services/ziphosting/get/dialog.do" 
			read   : _global.api_host_info + "/" + _global.api_path +"/services/ziphosting/get/lookup.do" 
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});
