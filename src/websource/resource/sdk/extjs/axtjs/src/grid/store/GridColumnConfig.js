/**
 * 그리드 header의 상태를 저장 관리하는 스토어
 */
Ext.define('Axt.grid.store.GridColumnConfig', { extend:'Ext.data.Store',	
	model: 'Axt.grid.model.GridColumnConfig',
	autoLoad: false,
	pageSize: 20,
	storeId:'GridColumnConfig',
	
	proxy:{
		type : 'localstorage',
		id : 'GridColumnConfig'
	}
});