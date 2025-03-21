Ext.define('module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Master', { extend: 'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'
		},{	name: 'invc_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'plan_date'			, type: 'string'
		},{	name: 'otmz_yorn'			, type: 'string'
		},{	name: 'otmz_dttm'			, type: 'string', convert : Ext.util.Format.strToDateTime
		},{	name: 'cofm_yorn'			, type: 'string'
		},{	name: 'lott_numb'			, type: 'string'
		},{	name: 'cofm_dttm'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	//지시일자

		},{	name: 'wdbf_itid'			, type: 'string'		//BF품목ID
		},{	name: 'wdbf_item_qntt'		, type: 'float'			//BF품목수
		},{	name: 'wdbf_cutt_qntt'		, type: 'float'			//BF절단수
		},{	name: 'wdbf_ndqt_ttsm'		, type: 'float'			//BF소요량합계
		},{	name: 'wdbf_bsmt_leng'		, type: 'float'			//BF원자재길이
		},{	name: 'wdbf_bsmt_ndqt'		, type: 'float'			//BF원자재소요량
		},{	name: 'wdbf_efcn'			, type: 'float'			//BF효율
		},{	name: 'wdsf_itid'			, type: 'string'		//SF품목ID
		},{	name: 'wdsf_item_qntt'		, type: 'float'			//SF품목수
		},{	name: 'wdsf_cutt_qntt'		, type: 'float'			//SF절단수
		},{	name: 'wdsf_ndqt_ttsm'		, type: 'float'			//SF소요량합계
		},{	name: 'wdsf_bsmt_leng'		, type: 'float'			//SF원자재길이
		},{	name: 'wdsf_bsmt_ndqt'		, type: 'float'			//SF원자재소요량
		},{	name: 'wdsf_efcn'			, type: 'float'			//SF효율

		},{	name: 'remk_text'			, type: 'string'	//비고
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float'  , defaultValue : 0		// ROW레벨
		},{	name: 'line_ordr'			, type: 'float'  , defaultValue : 0		// ROW순서
		},{	name: 'line_stat'			, type: 'string' , defaultValue: '0'	// ROW상태
		},{	name: 'line_clos'			, type: 'string' , defaultValue : 0		// ROW마감
		},{	name: 'find_name'			, type: 'string'	// 찾기명
		},{	name: 'updt_user_name'		, type: 'string'	// 수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	// 수정IP
		},{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 수정일시
		},{	name: 'updt_idcd'			, type: 'string' , defaultValue: _global.login_pk				// 수정ID
		},{	name: 'updt_urif'			, type: 'string'	// 수정UI
		},{	name: 'crte_user_name'		, type: 'string'	// 생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	// 생성IP
		},{	name: 'crte_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime		// 생성일시
		},{	name: 'crte_idcd'			, type: 'string' , defaultValue: _global.login_pk				//생성ID
		},{	name: 'crte_urif'			, type: 'string'	// 생성UI
		}
	]
});