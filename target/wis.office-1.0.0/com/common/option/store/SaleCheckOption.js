Ext.define('com.common.option.store.SaleCheckOption', { extend:'Ext.data.Store',
	model: 'com.common.option.model.SaleCheckOption',
	autoLoad: false,
	pageSize: 20,
//	storeId:'SaleCheckOption', // TaekbaePrint
	proxy:{
		type : 'localstorage',
		id : 'SaleCheckOption' // TaekbaePrint
	}
});
