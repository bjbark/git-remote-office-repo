Ext.define('module.custom.aone.sale.order.sorderostt.model.SorderOsttPopupMtrl', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//invoice번호
		},{	name: 'line_seqn'			, type: 'float' , defaultValue : 0		// 순번
		},{	name: 'qntt'				, type: 'float'			// 수량
		},{	name: 'pric'				, type: 'float'			// 재고수량
		},{	name: 'amnt'				, type: 'float'			//
		},{	name: 'stok_qntt'			, type: 'float'			//
		},{	name: 'work_invc_numb'		, type: 'string'		//
		},{	name: 'item_idcd'			, type: 'string'		//
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,		//
		},{	name: 'drtr_idcd'			, type: 'string'		//
		},{	name: 'wker_idcd'			, type: 'string'		//
		},{	name: 'repa_stat_dvcd'		, type: 'string'		//
		},{	name: 'item_code'			, type: 'string'		//
		},{	name: 'item_name'			, type: 'string'		//
		},{	name: 'item_spec'			, type: 'string'		//
		},{	name: 'wker_name'			, type: 'string'		//
		},{	name: 'user_memo'			, type: 'string'		//
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'		//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue :  0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue :  0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue : '0'		// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : '0'		// ROW마감
		},{	name: 'find_name'			, type: 'string'		//찾기명
		},{	name: 'updt_user_name'		, type: 'string'		//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'		//수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'		//수정UI
		},{	name: 'crte_user_name'		, type: 'string'		//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'		//생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk				// 생성ID
		},{	name: 'crte_urif'			, type: 'string'		//생성UI
		}
	]
});