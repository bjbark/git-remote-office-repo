Ext.define( 'module.custom.iypkg.mtrl.po.purcordr.model.PurcOrdrWorkerLister', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'code'				, type: 'string'	/* 발주순번		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 수주순번		*/
		},{	name: 'invc_date'			, type: 'string'	/* 수주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_name'			, type: 'string'	/* 수주처		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 수주코드		*/
		},{	name: 'prod_code'			, type: 'string'	/* 제품코드		*/
		},{	name: 'prod_name'			, type: 'string'	/* 제품명		*/
		},{	name: 'new_invc_numb'		, type: 'string'	/* 새로운 INVOICE번호	*/
		},{	name: 'new_line_seqn'		, type: 'string'	/* 새로운 INVOICE순번	*/
		},{	name: 'offr_cstm_idcd'		, type: 'string'	/* 발주처ID	*/
		},{	name: 'offr_cstm_name'		, type: 'string'	/* 발주처명		*/
		},{	name: 'item_scre_spec'		, type: 'string'	/* 스코어규격		*/
		},{	name: 'offr_date'			, type: 'string'	/* 발주일		*/
		},{	name: 'acpt_qntt'			, type: 'float'		/* 수주량		*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'item_fxqt'			, type: 'string'	/* 절수		*/
		},{	name: 'need_qntt'			, type: 'float'		/* 소요량=제곱미터수량 (원단수주기준)*/
		},{	name: 'pqty_pric'			, type: 'float'		/* 개당단가(원단수주기준)		*/
//		},{	name: 'mxm2_pric'			, type: 'float'		/* 제곱미터단가 (원단수주기준)	*/
//		},{	name: 'stnd_pric'			, type: 'float'		/* 제곱미터단가 (원단코드기준)	*/
		},{	name: 'mxm2_qntt'			, type: 'float'		/* 제곱미터수량	*/
		},{	name: 'mxm2_pric'			, type: 'float'		/* 제곱미터단가	*/
		},{	name: 'offr_qntt'			, type: 'float'		/* 발주량		*/
		},{	name: 'unoffr'				, type: 'float'		/* 미발주량		*/
		},{	name: 'subt_qntt'			, type: 'float' , defalutValue : 0		/* 감량			*/
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID	*/ , defaultValue: _global.stor_id
		},{	name: 'offr_path_dvcd'		, type: 'string'	/* 발주구분코드	*/
		},{	name: 'fdat_spec'			, type: 'string'	/* 재단규격		*/
		},{	name: 'item_spec'			, type: 'string'	/* 품목규격		*/
		},{	name: 'ppkd_dvcd'			, type: 'string'	/* 지종			*/

		},{	name: 'offr_amnt'			, type: 'float'		/* 공급가(발주금액)		*/
		},{	name: 'offr_vatx'			, type: 'float'		/* 부가세(발주부가세)		*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 합계금액				*/
		},{	name: 'item_ttln'			, type: 'float'		/* 장		*/
		},{	name: 'item_widh'			, type: 'float'		/* 폭		*/
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주번호		*/

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
