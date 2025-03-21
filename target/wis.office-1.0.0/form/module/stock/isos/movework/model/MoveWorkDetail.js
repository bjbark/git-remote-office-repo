Ext.define('module.stock.isos.movework.model.MoveWorkDetail', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 순번		*/ , defaultValue : 0
		},{	name: 'item_idcd'			, type: 'string' 	/* 품목ID		*/
		},{	name: 'unit_idcd'			, type: 'string' 	/* 단위ID		*/
		},{	name: 'move_qntt'			, type: 'float' 	/* 이동수량		*/ , defaultValue : 0
		},{	name: 'stnd_pric'			, type: 'float' 	/* 표준단가		*/ , defaultValue : 0
		},{	name: 'vatx_incl_yorn'		, type: 'string' 	/* 부가세포함여부	*/
		},{	name: 'vatx_rate'			, type: 'float' 	/* 부가세율		*/ , defaultValue : 0
		},{	name: 'amnt'				, type: 'float' 	/* 금액		*/ , defaultValue : 0
		},{	name: 'vatx_amnt'			, type: 'float' 	/* 부가세금액	*/ , defaultValue : 0
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액		*/ , defaultValue : 0
		},{	name: 'move_dvcd'			, type: 'string' 	/* 이동구분코드	*/
		},{	name: 'stnd_unit'			, type: 'string' 	/* 기준단위		*/
		},{	name: 'stnd_unit_qntt'		, type: 'float' 	/* 기준단위수량	*/ , defaultValue : 0
		},{	name: 'remk_text'			, type: 'string' 	/* 비고		*/
		},{	name: 'lott_numb'			, type: 'string' 	/* LOT번호	*/
		},{	name: 'orig_invc_numb'		, type: 'string' 	/* 원INVOICE번호	*/
		},{	name: 'orig_line_seqn'		, type: 'float' 	/* 원INVOICE순번	*/ , defaultValue : 0
		},{	name: 'orig_invc_seqn'		, type: 'float' 	/* 원INVOICE순번	*/ , defaultValue : 0
		},{	name: 'uper_seqn'			, type: 'float' 	/* 상위순번		*/ , defaultValue : 0
		},{	name: 'disp_seqn'			, type: 'float' 	/* 표시순번		*/ , defaultValue : 0
		},{	name: 'item_name'			, type: 'string' 	/* 품명		*/
		},{	name: 'item_spec'			, type: 'string' 	/* 품목규격		*/
		},{	name: 'item_code'			, type: 'string' 	/* 품목코드		*/
		},{	name: 'unit_name'			, type: 'string' 	/* 단위명		*/
		},{	name: 'user_memo'			, type: 'string' 	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string' 	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string' 	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float' 	/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float' 	/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string' 	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string' 	/* ROW마감	*/
		},{	name: 'find_name'			, type: 'string' 	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string' 	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string' 	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string' 	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string' 	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string' 	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string' 	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string' 	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string' 	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string' 	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string' 	/* 생성UI		*/
		}
	],
	recalculation: function(inv) {
		var row = this,
			baseamt = row.get('move_qntt') * row.get('stnd_pric')
		;
		row.set('amnt'		, row.get('move_qntt') * row.get('stnd_pric')  );
	}
});