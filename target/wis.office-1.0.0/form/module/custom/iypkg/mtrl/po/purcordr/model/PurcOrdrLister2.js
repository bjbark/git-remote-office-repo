Ext.define( 'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdrLister2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'code'				, type: 'string'	/* 발주순번		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 수주순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 수주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주품명ID	*/
		},{	name: 'prod_idcd'			, type: 'string'	/* 수주품명ID	*/
		},{	name: 'prod_name'			, type: 'string'	/* 수주품명		*/
		},{	name: 'prod_spec'			, type: 'string'	/* 수주제품규격	*/
		},{	name: 'acpt_qntt'			, type: 'string'	/* 수주량		*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'need_qntt'			, type: 'string'	/* 소요량		*/
		},{	name: 'offr_qntt'			, type: 'float'		/* 발주량		*/
		},{	name: 'unoffr'				, type: 'string'	/* 미발주량		*/
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'fdat_spec'			, type: 'string'	/* 재단규격		*/
		},{	name: 'fdat_spec2'			, type: 'string'	/* 재단규격		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'pcod_numb'			, type: 'string'	/* 고객주문번호	*/
		},{	name: 'rnum'				, type: 'string'

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
		},{	name: 'remk_text'			, type: 'string'	/* 생성UI		*/
		}
	]
});
