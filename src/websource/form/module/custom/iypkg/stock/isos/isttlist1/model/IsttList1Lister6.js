Ext.define('module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister6', { extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			, type: 'string'		//INVOICE번호
		},{	name: 'line_seqn'			, type: 'float' 		//INVOICE순번
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr ,		//발주일자
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'prod_code'			, type: 'string'		//상품코드
		},{	name: 'prod_name'			, type: 'string'		//상품명
		},{	name: 'prod_leng'			, type: 'string'		//상품길이
		},{	name: 'prod_widh'			, type: 'string'		//상품폭
		},{	name: 'prod_hght'			, type: 'string'		//상품높이
		},{	name: 'pcod_numb'			, type: 'string'		//PONO
		},{	name: 'offr_qntt'			, type: 'float' 		//발주수량
		},{	name: 'unistt'				, type: 'float' 		//미입고잔량
		},{	name: 'offr_pric'			, type: 'string' 		//발주단가
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr ,		//납기일자
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'acpt_cstm_name'		, type: 'string' 		//수주처명

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
