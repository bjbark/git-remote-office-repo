Ext.define('module.sale.sale.bondinit.model.BondInit', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명			*/
		},{	name: 'buss_numb'           , type: 'string'	/* 사업자번호			*/
		},{	name: 'modify'              , type: 'string'	/* 수정유무		*/
		},{	name: 'mail_addr'           , type: 'string'	/* 메일주소		*/
		},{	name: 'bond_dvcd'           , type: 'string'	/* 채권구분코드		*/
		},{	name: 'trns_yymm'           , type: 'string'	/* 이월년월			*/
		},{	name: 'sale_drtr_idcd'      , type: 'string'
		},{	name: 'user_name'           , type: 'string'	/* 담당자명			*/
		},{	name: 'trns_bill_amnt'      , type: 'float'		/* 거래명세서금액		*/ , defaultValue : 0
		},{	name: 'rqbl_amnt'           , type: 'float'		/* 청구서금액		*/ , defaultValue : 0
		},{	name: 'txbl_amnt'           , type: 'float'		/* 세금계산서금액		*/ , defaultValue : 0
		},{	name: 'insert'              , type: 'string'	/* insert 여부 check*/
		},{	name: 'check'               , type: 'string'	/* check*/
		},{	name: 'remk_text'           , type: 'string'	/* 메모*/

		},{	name: 'user_memo'           , type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'           , type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'           , type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'           , type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'           , type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'           , type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'      , type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'           , type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'           , type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/

		}
	]
});
