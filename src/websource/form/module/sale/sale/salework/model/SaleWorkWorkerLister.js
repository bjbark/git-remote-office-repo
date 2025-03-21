Ext.define('module.sale.sale.salework.model.SaleWorkWorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'	/* 발주번호		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 발주순번		*/
		},{	name: 'new_invc_numb'		, type: 'string'	/* 새로운 INVOICE번호	*/
		},{	name: 'new_line_seqn'		, type: 'string'	/* 새로운 INVOICE순번	*/
		},{	name: 'istt_date'			, type: 'string'	/* 입고일자		*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 입고처ID = 발주처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 입고처명 = 발주처명		*/

		},{	name: 'invc_date'			, type: 'string'	/* 발주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'prod_name'			, type: 'string'	/* 수주품명		*/
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'acpt_seqn'			, type: 'float'		/* 수주번호		*/
		},{	name: 'boxx_bom_seqn'		, type: 'float'		/* bom수주순번	*/
		},{	name: 'acpt_cstm_name'		, type: 'string'	/* 수주처		*/

		},{	name: 'fabc_idcd'			, type: 'string'	/* 원단ID		*/
		},{	name: 'fabc_code'			, type: 'string'	/* 원단코드		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'item_ttln'			, type: 'float'		/* 장		*/
		},{	name: 'item_ttwd'			, type: 'float'		/* 폭		*/
		},{	name: 'item_fxqt'			, type: 'float'		/* 절수		*/
		},{	name: 'scre_spec'			, type: 'string'	/* 재단및스코어	*/
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 자료구분(부가세포함여부)	*/, defaultValue : 1

		},{	name: 'offr_qntt'			, type: 'float'		/* 발주량		*/
		},{	name: 'istt_qntt'			, type: 'float'		/* 입고한수량	*/
		},{	name: 'unistt'				, type: 'float'		/* 미입고잔량	*/
		},{	name: 'istt_qntt2'			, type: 'float'		/* 입고할수량	*/
		},{	name: 'istt_amnt'			, type: 'float'		/* 입고공급가	*/
		},{	name: 'istt_vatx'			, type: 'float'		/* 입고부가세	*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 입고합꼐		*/


		},{	name: 'subt_qntt'			, type: 'float'		/* 감량		*/
		},{	name: 'mxm2_qntt'			, type: 'float'		/* 제곱미터수량	*/
		},{	name: 'mxm2_pric'			, type: 'float'		/* 제곱미터단가	*/
		},{	name: 'pqty_pric'			, type: 'float'		/* 개당단가		*/
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID	*/ , defaultValue: _global.stor_id
		},{	name: 'offr_path_dvcd'		, type: 'string'	/* 발주구분코드	*/

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명			*/
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
