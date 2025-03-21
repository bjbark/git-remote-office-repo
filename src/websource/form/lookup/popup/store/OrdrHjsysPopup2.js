Ext.define('lookup.popup.store.OrdrHjsysPopup2', { extend:'Axt.data.Store',
	model: 'lookup.popup.model.OrdrHjsysPopup2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/sale/order/saleorder/get/lookup2.do"
		},
		actionMethods: { read : 'POST'},
		extraParams:{
			token : _global.token_id
		}
	}
});
