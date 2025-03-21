Ext.define('lookup.popup.model.ProdPopup',{ extend:'Axt.data.Model',
	fields:[
		{	name: 'prod_idcd'			, type: 'string'		/* 제품ID		*/
		},{	name: 'prod_code'			, type: 'string'		/* 제품코드		*/
		},{	name: 'prod_name'			, type: 'string'		/* 제품명		*/
		},{	name: 'prod_leng'			, type: 'float '		/* 제품길이		*/, defaultValue : 0
		},{	name: 'prod_widh'			, type: 'float '		/* 제품폭		*/, defaultValue : 0
		},{	name: 'prod_hght'			, type: 'float '		/* 제품높이		*/, defaultValue : 0
		},{	name: 'prod_spec'			, type: 'string'		/* 제품규격		*/
		},{	name: 'scre_dvcd'			, type: 'string'		/* 스코어구분코드	*/
		},{	name: 'bxty_idcd'			, type: 'string'		/* 박스형식ID	*/
		},{	name: 'sgam_relx'			, type: 'float '		/* 외날개여유		*/, defaultValue : 0
		},{	name: 'scre_spec_frml'		, type: 'string'		/* 스코어규격공식*/
		},{	name: 'scre_spec'			, type: 'float '		/* 스코어규격		*/, defaultValue : 0
		},{	name: 'pqty_mxm2'			, type: 'float '		/* 개당제곱미터	*/, defaultValue : 0
		},{	name: 'mxm2_pric'			, type: 'float '		/* 제곱미터단가	*/, defaultValue : 0
		},{	name: 'pqty_pric'			, type: 'float '		/* 개당단가		*/, defaultValue : 0
		},{	name: 'crny_dvcd'			, type: 'string'		/* 통화구분코드	*/
		},{	name: 'cstm_idcd'			, type: 'string'		/* 거래처ID		*/
		},{	name: 'pcod_numb'			, type: 'string'		/* PONO			*/
		},{	name: 'wmld_idcd'			, type: 'string'		/* 목형ID		*/
		},{	name: 'wmld_numb'			, type: 'string'		/* 목형번호		*/
		},{	name: 'wmld_size'			, type: 'string'		/* 목형사이즈		*/
		},{	name: 'cpst_numb'			, type: 'string'		/* 조판번호		*/
		},{	name: 'inkk_colr_name'		, type: 'string'		/* 잉크컬러명		*/
		},{	name: 'bxty_name'			, type: 'string'		/* 박스타입명		*/
		},{	name: 'bxty_leng'			, type: 'float '		/* 박스형식길이	*/, defaultValue : 0
		},{	name: 'bxty_widh'			, type: 'float '		/* 박스형식폭		*/, defaultValue : 0
		},{	name: 'bxty_hght'			, type: 'float '		/* 박스형식높이	*/, defaultValue : 0
		},{	name: 'fabc_idcd'			, type: 'string'		/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'		/* 원단명			*/
		},{	name: 'ppln_dvcd'			, type: 'string'		/* 골			*/
		},{	name: 'mxm2_qntt'			, type: 'float '		/* m2/개			*/
		},{	name: 'item_fxqt'			, type: 'float '		/* 원단절수		*/
		},{	name: 'item_widh2'			, type: 'float '		/* 원단폭			*/
		},{	name: 'item_leng2'			, type: 'float '		/* 원단장			*/
		},{	name: 'fabc_stnd_pric'		, type: 'float '		/* 원단표준단가	*/
		},{	name: 'ordr_cstm_idcd'		, type: 'string'		/* 매입처iD		*/
		},{	name: 'ordr_cstm_name'		, type: 'string'		/* 매입처			*/
		},{	name: 'ordr_mxm2_pric'		, type: 'float '		/* 매입단가		*/
		},{	name: 'sets_qntt'			, type: 'float '		/* 조/SET		*/



		},{	name: 'uper_seqn'			, type: 'float'		/* 상위순번		*/
		},{	name: 'disp_seqn'			, type: 'float'		/* 하위순번		*/
		},{	name: 'change'				, type: 'string'	/* 변경			*/
		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
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
