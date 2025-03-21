Ext.define('module.sale.sale.salelist4.model.SaleList4Lister2', { extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'	//Invoice번호
		},{	name: 'item_name'			, type: 'string'	/* 품목명		*/
		},{	name: 'item_code'			, type: 'string'	/* 품목코드		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'dvcd'				, type: 'string'	/* 구분		*/
		},{	name: '1_month'				, type: 'float' 	/* 1월		*/
		},{	name: '2_month'				, type: 'float' 	/* 2월		*/
		},{	name: '3_month'				, type: 'float' 	/* 3월		*/
		},{	name: '4_month'				, type: 'float' 	/* 4월		*/
		},{	name: '5_month'				, type: 'float' 	/* 5월		*/
		},{	name: '6_month'				, type: 'float' 	/* 6월		*/
		},{	name: '7_month'				, type: 'float' 	/* 7월		*/
		},{	name: '8_month'				, type: 'float' 	/* 8월		*/
		},{	name: '9_month'				, type: 'float' 	/* 9월		*/
		},{	name: '10_month'			, type: 'float' 	/* 10월		*/
		},{	name: '11_month'			, type: 'float' 	/* 11월		*/
		},{	name: '12_month'			, type: 'float' 	/* 12월		*/
		},{	name: '1_sum'				, type: 'float' 	/* 1분기		*/
		},{	name: '2_sum'				, type: 'float' 	/* 2분기		*/
		},{	name: '3_sum'				, type: 'float' 	/* 3분기		*/
		},{	name: '4_sum'				, type: 'float' 	/* 4분기		*/
		},{	name: 'ttsm_sum'			, type: 'float' 	/* 합계		*/

		},{	name : 'user_memo'			, type : 'string'		//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'		//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'		//부모ID
		},{	name : 'line_levl'			, type : 'float'  , defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'		//ROW순서
		},{	name : 'line_stat'			, type : 'string' , defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'		//ROW마감
		},{	name : 'find_name'			, type : 'string'		//찾기명
		},{	name : 'updt_user_name'		, type : 'string'		//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'		//수정IP
		},{	name : 'updt_dttm'			, type : 'string'		//수정일시
		},{	name : 'updt_idcd'			, type : 'string'		//수정ID
		},{	name : 'updt_urif'			, type : 'string'		//수정UI
		},{	name : 'crte_user_name'		, type : 'string'		//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'		//생성IP
		},{	name : 'crte_dttm'			, type : 'string'		//생성일시
		},{	name : 'crte_idcd'			, type : 'string'		//생성ID
		},{	name : 'crte_urif'			, type : 'string'		//생성UI
		}
	]
});
