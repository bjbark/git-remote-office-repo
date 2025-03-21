Ext.define('module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2WorkerLister',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'			, type: 'string'	/* 출고번호		*/
		},{	name: 'line_seqn'			, type: 'string'	/* 출고순번		*/
		},{	name: 'ostt_date'			, type: 'string'	/* 출고일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'new_invc_numb'		, type: 'string'	/* 새로운 INVOICE번호	*/
		},{	name: 'new_line_seqn'		, type: 'string'	/* 새로운 INVOICE순번	*/
		},{	name: 'istt_date'			, type: 'string'	/* 출고일자		*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 출고처ID		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 출고처코드		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 출고처명		*/
		},{	name: 'nwek_name'			, type: 'string'	/* 차주		*/
		},{	name: 'deli_date'			, type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cars_idcd'			, type: 'string'	/* 차량ID		*/
		},{	name: 'porm_rate'			, type: 'float' 	/* 가감율			*/
		},{	name: 'porm_qntt'			, type: 'float' 	/* 가감수량		*/
		},{	name: 'cars_idcd'			, type: 'string'	/* 차량ID		*/
		},{	name: 'lcal_idcd'			, type: 'string'	/* 운송지역ID		*/
		},{	name: 'trnt_exps'			, type: 'float' 	/* 운송비용		*/
		},{	name: 'drtr_idcd'			, type: 'string'	/* 작업자ID		*/ , defaultValue : _global.login_pk
		},{	name: 'vatx_incl_yorn'		, type: 'string'	/* 부가세포함여부	*/ , defaultValue : 1
		},{	name: 'acpt_dvcd'			, type: 'string'	/* 수주구분		*/



		},{	name: 'invc_date'			, type: 'string'	/* 수주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_numb'			, type: 'string'	/* 수주번호		*/

		},{	name: 'prod_idcd'			, type: 'string'	/* 제품ID	*/
		},{	name: 'prod_code'			, type: 'string'	/* 제품코드	*/
		},{	name: 'prod_name'			, type: 'string'	/* 제품명		*/
		},{	name: 'prod_leng'			, type: 'float'		/* 장		*/
		},{	name: 'prod_widh'			, type: 'float'		/* 폭		*/
		},{	name: 'prod_hght'			, type: 'float'		/* 고		*/

		},{	name: 'acpt_qntt'			, type: 'float'		/* 수주량		*/
		},{	name: 'plan_qntt'			, type: 'float'		/* 계획수량	*/
		},{	name: 'unpaid'				, type: 'float'		/* 미출고잔량	*/
		},{	name: 'ostt_qntt'			, type: 'float'		/* 출고한수량	*/
		},{	name: 'ostt_qntt2'			, type: 'float'		/* 출고할수량	*/
		},{	name: 'ostt_amnt'			, type: 'float'		/* 출고공급가	*/
		},{	name: 'ttsm_amnt'			, type: 'float'		/* 출고합계	*/
		},{	name: 'prod_qntt'			, type: 'float'		/* 생산수량	*/
		},{	name: 'stok_qntt'			, type: 'float'		/* 현재고		*/
		},{	name: 'sale_amnt'			, type: 'float'		/* 공급가액	*/
		},{	name: 'vatx_amnt'			, type: 'float'		/* 부가세액	*/
		},{	name: 'ostt_qntt_edit'		, type: 'float'		/* 출고수량2	*/
		},{	name: 'sply_amnt_edit'		, type: 'float'		/* 공급가액2	*/
		},{	name: 'vatx_amnt_edit'		, type: 'float'		/* 부가세액2	*/
		},{	name: 'ttsm_amnt_edit'		, type: 'float'		/* 합계금액2	*/
		},{	name: 'subt_qntt'			, type: 'float' 	/* 감량		*/
		},{	name: 'pqty_pric'			, type: 'float'		/* 개당단가	*/
		},{	name: 'bzpl_idcd'			, type: 'string'	/* 사업장ID	*/
		},{	name: 'sale_unit'			, type: 'string'	/* 판매단위	*/
		},{	name: 'orig_seqn'			, type: 'string'	/* 계획순번	*/
		},{	name: 'orig_invc_numb'		, type: 'string'	/* 계획번호	*/

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
