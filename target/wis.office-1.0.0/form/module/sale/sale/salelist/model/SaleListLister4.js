Ext.define('module.sale.sale.salelist.model.SaleListLister4', { extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'	//Invoice번호
		},{	name: 'line_seqn'			, type: 'string'	/* 보조순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 계산서일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'invc_date2'			, type: 'string'	/* 계산서일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'item_code'			, type: 'string'	/* 품목코드	*/
		},{	name: 'item_name'			, type: 'string'	/* 품목명		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'sale_qntt'			, type: 'float' 	/* 총수량	*/
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액	*/
		},{	name: 'ranking'				,type: 'float' ,	//순위
		},{	name: 'rate'				, type: 'String' ,	// 점유율

		},{	name : 'user_memo'			, type : 'string'	//사용자메모
		},{	name : 'sysm_memo'			, type : 'string'	//시스템메모
		},{	name : 'prnt_idcd'			, type : 'string'	//부모ID
		},{	name : 'line_levl'			, type : 'float'  , defaultValue: '0'		//ROW레벨
		},{	name : 'line_ordr'			, type : 'string'	//ROW순서
		},{	name : 'line_stat'			, type : 'string' , defaultValue: '0'		//ROW상태
		},{	name : 'line_clos'			, type : 'string'	//ROW마감
		},{	name : 'find_name'			, type : 'string'	//찾기명
		},{	name : 'updt_user_name'		, type : 'string'	//수정사용자명
		},{	name : 'updt_ipad'			, type : 'string'	//수정IP
		},{	name : 'updt_dttm'			, type : 'string'	//수정일시
		},{	name : 'updt_idcd'			, type : 'string'	//수정ID
		},{	name : 'updt_urif'			, type : 'string'	//수정UI
		},{	name : 'crte_user_name'		, type : 'string'	//생성사용자명
		},{	name : 'crte_ipad'			, type : 'string'	//생성IP
		},{	name : 'crte_dttm'			, type : 'string'	//생성일시
		},{	name : 'crte_idcd'			, type : 'string'	//생성ID
		},{	name : 'crte_urif'			, type : 'string'	//생성UI
		}
	]
});
