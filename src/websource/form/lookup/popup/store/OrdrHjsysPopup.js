Ext.define('lookup.popup.store.OrdrHjsysPopup', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.OrdrHjsysPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/get/lookup.do"
		},
		actionMethods: { read : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});
