Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.model.PurcCstmList1', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 번호		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 보조순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 발주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'invc_date'			, type: 'string'	/* 입고일		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'istt_qntt'			, type: 'string'	/* 입고량		*/
		},{	name: 'mxm2_pric'			, type: 'string' 	/* 제곱미터단가	*/
		},{	name: 'istt_pric'			, type: 'string' 	/* 입고단가		*/
		},{	name: 'pqty_pric'			, type: 'string' 	/* 개당단가		*/
		},{	name: 'istt_amnt'			, type: 'string' 	/* 공급가액		*/
		},{	name: 'istt_vatx'			, type: 'string' 	/* 부가세액		*/
		},{	name: 'ttsm_amnt'			, type: 'string' 	/* 합계액		*/
		},{	name: 'txbl_ttsm'			, type: 'string' 	/* 지급금액		*/
		},{	name: 'unpay'				, type: 'string' 	/* 잔액		*/

		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'fdat_spec'			, type: 'string'	/* 재단규격		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'subt_qntt'			, type: 'float' 	/* 감량		*/
		},{	name: 'rnum'				, type: 'float'

		},{	name: 'asmt_idcd'			, type: 'string'	/* 부자재ID	*/
		},{	name: 'asmt_name'			, type: 'string'	/* 부자재명		*/
		},{	name: 'asmt_code'			, type: 'string'	/* 부자재코드	*/
		},{	name: 'asmt_dvcd'			, type: 'string'	/* 부자재구분	*/
		},{	name: 'asmt_spec'			, type: 'string'	/* 부자재규격	*/
		},{	name: 'unit_idcd'			, type: 'string'	/* 단위ID		*/
		},{	name: 'unit_name'			, type: 'string'	/* 단위명		*/

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	]
});