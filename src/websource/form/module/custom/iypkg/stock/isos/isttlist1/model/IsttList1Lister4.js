Ext.define('module.custom.iypkg.stock.isos.isttlist1.model.IsttList1Lister4', { extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'			,type: 'string',		//INVOICE번호
		},{	name: 'line_seqn'			,type: 'string',		//순번
		},{	name: 'new_invc_numb'		,type: 'string',		//새로운INVOICE번호
		},{	name: 'new_line_seqn'		,type: 'float' ,		//순번
		},{	name: 'bzpl_idcd'			,type: 'string', defaultValue: _global.stor_id,		//사업장ID
		},{	name: 'drtr_idcd'			,type: 'string',		//담당자ID
		},{	name: 'drtr_name'			,type: 'string',		//담당자명
		},{	name: 'cstm_idcd'			,type: 'string',		//거래처ID
		},{	name: 'acpt_cstm_name'		,type: 'string',		//거래처명
		},{	name: 'pcod_numb'			,type: 'string',		//PONO
		},{	name: 'ostt_yorn'			,type: 'string',		//출고여부
		},{	name: 'asmt_idcd'			,type: 'string',		//부자재ID
		},{	name: 'asmt_code'			,type: 'string',		//부자재코드
		},{	name: 'asmt_name'			,type: 'string',		//부자재명
		},{	name: 'asmt_spec'			,type: 'string',		//규격
		},{	name: 'unit_name'			,type: 'string',		//단위
		},{	name: 'acct_dvcd'			,type: 'string',		//계정구분코드
		},{	name: 'asmt_dvcd'			,type: 'string',		//부자재구분코드
		},{	name: 'offr_qntt'			,type: 'float' ,		//발주수량
		},{	name: 'offr_pric'			,type: 'string' ,		//발주단가
		},{	name: 'istt_qntt'			,type: 'float' ,		//입고수량
		},{	name: 'sum_istt_qntt'		,type: 'float' ,		//입고합계
		},{	name: 'istt_qntt'			,type: 'float' ,		//입고합계
		},{	name: 'unistt'				,type: 'float' ,		//미입고잔량
		},{	name: 'invc_date'			,type: 'string',		//입고일자
		},{	name: 'istt_amnt'			,type: 'float',			//공급가액
		},{	name: 'istt_vatx'			,type: 'float',			//부가세
		},{	name: 'ttsm_amnt'			,type: 'float',			//합계금액
		},{	name: 'vatx_incl_yorn'		,type: 'string',		//부가세포함여부

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
