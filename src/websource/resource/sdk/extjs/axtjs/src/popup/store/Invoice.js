/**
 * 명세서 설정 공통 Store (거래명세서, 세금계산서, 택배송장 공통)
 */
Ext.define('Axt.popup.store.Invoice', { extend:'Ext.data.Store',	
	model: 'Axt.popup.model.Invoice',
	autoLoad: false,
	pageSize: 20,
	storeId:'Invoice',
	proxy:{
		type : 'localstorage',
		id : 'Invoice'
	}
});