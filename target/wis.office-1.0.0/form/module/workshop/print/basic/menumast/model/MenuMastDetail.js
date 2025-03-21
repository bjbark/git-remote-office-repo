Ext.define('module.workshop.print.basic.menumast.model.MenuMastDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'line_seqn'			, type: 'float ' 	/* 순번			*/
		},{	name: 'type_bacd'			, type: 'string' 	/* 타입분류코드	*/
		},{	name: 'lkup_kind_dvcd'		, type: 'string' 	/* 룩업종류구분코드	*/
		},{	name: 'item_name'			, type: 'string' 	/* 품목명		*/
		},{	name: 'pric_dvcd'			, type: 'string' 	/* 단가구분			*/
		},{	name: 'esti_pric'			, type: 'float ' , defaultValue: 0 	/* 단가			*/
		},{	name: 'dspl_rank'			, type: 'float ' 	/* 전시순위		*/
		},{	name: 'exmp_strg'			, type: 'string' 	/* 예시문구		*/
		},{	name: 'chid_item_idcd'		, type: 'string' 	/* 자식품목ID	*/
		},{	name: 'chid_item_name'		, type: 'string' 	/* 자식품목명	*/
		},{	name: 'clss_desc'			, type: 'string' 	/* 분류명		*/
		},{	name: 'tool_tipp'			, type: 'string' 	/* 툴팁			*/
		},{	name: 'feld_idcd'			, type: 'string' 	/* 필드네임			*/
		},{	name: 'feld_name'			, type: 'string' 	/* 필드네임			*/
		},{	name: 'lcls_idcd'			, type: 'string' 	/* 대분류ID			*/
		},{	name: 'mcls_idcd'			, type: 'string' 	/* 중분류ID			*/
		},{	name: 'scls_idcd'			, type: 'string' 	/* 소분류ID			*/



		},{	name: 'user_memo'			, type: 'string'			//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'line_levl'			, type: 'float', defaultValue: '0'
		},{	name: 'prnt_idcd'			, type: 'string'
		},{	name: 'line_ordr'			, type: 'float', defaultValue: '0'
		},{	name: 'line_stat'			, type: 'float', defaultValue: '0'
		},{	name: 'line_clos'			, type: 'float', defaultValue: '0'
		},{	name: 'find_name'			, type: 'string'
		},{	name: 'updt_user_name'		, type: 'string'
		},{	name: 'updt_ipad'			, type: 'string'
		},{	name: 'updt_dttm'			, type: 'string'
		},{	name: 'updt_idcd'			, type: 'string'
		},{	name: 'updt_urif'			, type: 'string'
		},{	name: 'crte_user_name'		, type: 'string'
		},{	name: 'crte_ipad'			, type: 'string'
		},{	name: 'crte_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'crte_idcd'			, type: 'string'
		},{	name: 'crte_urif'			, type: 'string'
		},
	]
});