Ext.define('module.custom.komec.stock.isos.prodnotwork.model.ProdNotWork',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'invc_numb'		, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'line_seqn'		, type: 'int'		/* INVOICE순번	*/, defaultValue : 1
		},{	name: 'uper_seqn'		, type: 'int'		/* 상위 상세 번호	*/, defaultValue : 1
		},{	name: 'disp_seqn'		, type: 'int'		/* 화면출력번호	*/, defaultValue : 1
		},{	name: 'istt_wrhs_idcd'	, type: 'string' 	/* 입고창고ID		*/
		},{	name: 'invc_date'		, type: 'string' 	/* INVOICE일자	*/ , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_wrhs_name'	, type: 'string' 	/* 품목ID		*/
		},{	name: 'item_idcd'		, type: 'string' 	/* 				*/
		},{	name: 'pdod_date'		, type: 'string' 	/* 				*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr,	//지시일자
		},{	name: 'item_code'		, type: 'string' 	/* 품목ID		*/
		},{	name: 'item_name'		, type: 'string' 	/* 품명			*/
		},{	name: 'istt_dvcd'		, type: 'string' 	/* 입고구분			*/
		},{	name: 'item_spec'		, type: 'string' 	/* 규격			*/
		},{	name: 'unit_idcd'		, type: 'string' 	/* 단위ID		*/
		},{	name: 'unit_name'		, type: 'string' 	/* 단위ID		*/
		},{	name: 'istt_qntt'		, type: 'float' 	/* 입고수량		*/ , defaultValue : 0
		},{	name: 'stnd_pric'		, type: 'float' 	/* 표준단가		*/ , defaultValue : 0
		},{	name: 'vatx_incl_yorn'	, type: 'string' 	/* 부가세포함여부	*/
		},{	name: 'vatx_rate'		, type: 'float' 	/* 부가세율		*/, defaultValue : 10
		},{	name: 'poor_qntt'		, type: 'float' 	/* 불량수량		*/, defaultValue : 0
		},{	name: 'amnt'			, type: 'float' 	/* 금액			*/, defaultValue : 0
		},{	name: 'qntt'			, type: 'float' 	/* 금액			*/, defaultValue : 0
		},{	name: 'vatx_amnt'		, type: 'float' 	/* 부가세액		*/, defaultValue : 0
		},{	name: 'indn'			, type: 'float' 	/* 합계금액		*/, defaultValue : 0
		},{	name: 'prod'			, type: 'float' 	/* 합계금액		*/, defaultValue : 0
		},{	name: 'poor'			, type: 'float' 	/* 입고사유분류코드	*/
		},{	name: 'stnd_unit'		, type: 'string' 	/* 기준단위		*/
		},{	name: 'stnd_unit_qntt'	, type: 'float' 	/* 기준단위수량	*/, defaultValue : 0
		},{	name: 'remk_text'		, type: 'string' 	/* 비고			*/
		},{	name: 'lott_numb'		, type: 'string' 	/* 롯트번호		*/
		},{	name: 'orig_invc_numb'	, type: 'string' 	/* 원invoice번호	*/
		},{	name: 'orig_seqn'		, type: 'string' 	/* 원순번			*/
		},{	name: 'user_memo'		, type: 'string' 	/* 사용자메모		*/
		},{	name: 'sysm_memo'		, type: 'string' 	/* 시스템메모		*/
		},{	name: 'prnt_idcd'		, type: 'string' 	/* 부모ID		*/
		},{	name: 'line_levl'		, type: 'float' 	/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'		, type: 'float' 	/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'		, type: 'string' 	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'		, type: 'string' 	/* ROW마감		*/ , defaultValue: '0'
		},{	name: 'find_name'		, type: 'string' 	/* 찾기명			*/
		},{	name: 'updt_user_name'	, type: 'string' 	/* 수정사용자명	*/
		},{	name: 'updt_ipad'		, type: 'string' 	/* 수정IP		*/
		},{	name: 'updt_dttm'		, type: 'string' 	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'		, type: 'string' 	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'		, type: 'string' 	/* 수정UI		*/
		},{	name: 'crte_user_name'	, type: 'string' 	/* 생성사용자명	*/
		},{	name: 'crte_ipad'		, type: 'string' 	/* 생성IP		*/
		},{	name: 'crte_dttm'		, type: 'string' 	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'		, type: 'string' 	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'		, type: 'string' 	/* 생성UI		*/
		}
	]
});
