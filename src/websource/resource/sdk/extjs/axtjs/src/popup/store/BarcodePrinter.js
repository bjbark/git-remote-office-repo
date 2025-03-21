/**
 * 바코드 프린터 설정 저장
 */
Ext.define('Axt.popup.store.BarcodePrinter', { extend:'Ext.data.Store',	
	model: 'Axt.popup.model.BarcodePrinter',
	autoLoad: false,
	pageSize: 20,
	storeId:'BarcodePrinter',
	proxy:{
		type : 'localstorage',
		id : 'BarcodePrinter'
	}
});