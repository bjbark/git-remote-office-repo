Ext.define( 'module.custom.iypkg.stock.close.goodsstocklist.model.GoodsStockList', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드		*/
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		/* 일자		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 고객명			*/
		},{	name: 'prod_name'           , type: 'string'	/* 제품명			*/
		},{	name: 'drtr_name'           , type: 'string'	/* 담당자			*/
		},{	name: 'prod_spec'           , type: 'string'	/* 규격			*/
		},{	name: 'cstm_stnm_1fst'      , type: 'string'	/* 거래처약칭1		*/
		},{	name: 'crdt_lmit_amnt'      , type: 'float'		/* 여신한도	*/
		},{	name: 'scrt_sett_amnt'      , type: 'float'		/* 담보설정금액	*/ , defaultValue : 0
		},{	name: 'prod_istt_qntt'      , type: 'float'		/* 생산	*/ , defaultValue : 0
		},{	name: 'prod_ostt_qntt'      , type: 'float'		/* 출고	*/ , defaultValue : 0
		},{	name: 'prod_ostt_qntt2'     , type: 'float'		/* 출고	*/ , defaultValue : 0
		},{	name: 'pqty_pric'           , type: 'float'		/* 단가	*/ , defaultValue : 0
		},{	name: 'post_code'           , type: 'string'	/* 우편번호	*/
		},{	name: 'addr_1fst'           , type: 'string'	/* 주소1	*/
		},{	name: 'addr_2snd'           , type: 'string'	/* 주소2	*/
		},{	name: 'addr_seqn'           , type: 'float'		/* 주소순번	*/
		},{	name: 'stok_qntt'           , type: 'float'		/* 주소순번	*/
		},{	name: 'istt_qntt'           , type: 'float'		/* 생산	*/
		},{	name: 'ostt_qntt'           , type: 'float'		/* 출고	*/
		},{	name: 'base_qntt'           , type: 'float'		/* 출고	*/
		},{	name: 'qntt'                , type: 'float'		/* 수량	*/
		},{	name: 'istt_pric'           , type: 'float'		/* 단가	*/
		},{	name: 'istt_amnt'           , type: 'float'		/* 금액	*/
		},{	name: 'amnt'                , type: 'float'		/* 	*/
		},{	name: 'invc_dvcd'           , type: 'string'	/* 구분		*/

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
