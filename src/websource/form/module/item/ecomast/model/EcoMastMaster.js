Ext.define('module.item.ecomast.model.EcoMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'ecod_idcd'			, type: 'string'										// ecoId
		},{ name: 'ecod_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'dept_idcd'			, type: 'string' ,	// 부서id
		},{	name: 'drtr_idcd'			, type: 'string' , 	// 담당자id
		},{	name: 'chge_resn_dvcd'		, type: 'string' , defaultValue : '0000'	// 변경사유코드
		},{	name: 'strt_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'endd_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'chge_resn'			, type: 'string' ,	// 변경사유
		},{	name: 'cofm_degr'			, type: 'float' ,
		},{	name: 'cofm_yorn'			, type: 'string' , defaultValue: '0'		// 확정여부
		},{	name: 'mngt_docm_numb'		, type: 'string' ,	// 관리문서번호
		},{	name: 'prnt_item_idcd'		, type: 'string' ,	// 부모품목ID
		},{	name: 'item_name'			, type: 'string' ,	// 품명
		},{	name: 'item_spec'			, type: 'string' ,	// 규격
		},{	name: 'item_code'			, type: 'string' ,	// 품목코드
		},{	name: 'user_name'			, type: 'string' ,
		},{	name: 'dept_name'			, type: 'string' ,
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float' , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string', defaultValue: '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});