Ext.define('lookup.popup.model.SaleOrderStokLister', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	//INVOICE번호
//		},{	name: 'item_code'			, type: 'string'
//		},{	name: 'item_idcd'			, type: 'string'
		},{	name: 'invc_date'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//INVOICE일자
		},{	name: 'acpt_dvcd'			, type: 'string'	//수주구분코드
		},{	name: 'drtr_idcd'			, type: 'string'	//담당자ID
		},{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'assi_cstm_idcd'		, type: 'string'	//보조거래처ID
		},{	name: 'mker_name'			, type: 'string'	//생산자명
		},{	name: 'prod_idcd'			, type: 'string'	//제품ID
		},{	name: 'prod_name'			, type: 'string'	//제품명
		},{	name: 'item_leng'			, type: 'float ', defaultValue : 0 	//품목길이
		},{	name: 'item_widh'			, type: 'float ', defaultValue : 0 	//품목폭
		},{	name: 'item_hght'			, type: 'float ', defaultValue : 0 	//품목높이
		},{	name: 'sgam_relx'			, type: 'float ' , defaultValue : 0 	//외날개여유
		},{	name: 'scre_spec_frml'		, type: 'string' 	//스코어규격공식
		},{	name: 'scre_spec'			, type: 'float ' , defaultValue : 0 	//스코어규격
		},{	name: 'stat_dvcd'			, type: 'string' 	//상태구분값
		},{	name: 'cpst_numb'			, type: 'string' 	//조판번호
		},{	name: 'wmld_numb'			, type: 'string' 	//목형번호
		},{	name: 'wmld_size'			, type: 'string' 	//목형사이즈
		},{	name: 'inkk_colr_name'		, type: 'string' 	//잉크컬러명
		},{	name: 'pqty_mxm2'			, type: 'float ' , defaultValue : 0 	//개당제곱미터
		},{	name: 'bxty_idcd'			, type: 'string' 	//박스형식ID
		},{	name: 'acpt_qntt'			, type: 'float ' , defaultValue : 0 	//수주수량
		},{	name: 'base_qntt'			, type: 'float ' , defaultValue : 0 	//재고수량
		},{	name: 'stok_qntt'			, type: 'float ' , defaultValue : 0 	//재고수량
		},{	name: 'prod_qntt'			, type: 'float ' , defaultValue : 0 	//생산수량
		},{	name: 'mxm2_pric'			, type: 'float ' , defaultValue : 0 	//제곱미터단가
		},{	name: 'pqty_pric'			, type: 'float ' , defaultValue : 0 	//개당단가
		},{	name: 'crny_dvcd'			, type: 'string' 	//통화구분코드
		},{	name: 'deli_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 	 	//납기일자
		},{	name: 'pcod_numb'			, type: 'string' 	//PONO
		},{	name: 'vatx_dvcd'			, type: 'string' 	//부가세구분코드
		},{	name: 'sply_amnt'			, type: 'float ' , defaultValue : 0	//공급가액
		},{	name: 'vatx_amnt'			, type: 'float ' , defaultValue : 0	//부가세액
		},{	name: 'ttsm_amnt'			, type: 'float ' , defaultValue : 0	//합계금액
		},{	name: 'remk_text'			, type: 'string' 	//비고
		},{	name: 'prod_yorn'			, type: 'string' 	//생산여부
		},{	name: 'prod_date'			, type: 'string' 	//생산일자
		},{	name: 'ostt_yorn'			, type: 'string' 	//출고여부
		},{	name: 'ostt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//출고일자
		},{	name: 'ostt_qntt'			, type: 'float ' , defaultValue : 0 	//출고수량
		},{	name: 'rqod_yorn'			, type: 'string' 	//청구여부
		},{	name: 'rqod_date'			, type: 'string' 	//청구일자
		},{	name: 'rqod_amnt'			, type: 'float ' , defaultValue : 0 	//청구금액
		},{	name: 'bill_yorn'			, type: 'string' 	//계산서여부
		},{	name: 'bill_date'			, type: 'string' 	//계산서일자
		},{	name: 'bill_amnt'			, type: 'float ' , defaultValue : 0 	//계산서금액
		},{	name: 'iamt_yorn'			, type: 'string' 	//입금여부
		},{	name: 'apvl_yorn'			, type: 'string' 	//승인여부
		},{	name: 'iamt_date'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr 		//입금일자
		},{	name: 'iamt_amnt'			, type: 'float ' , defaultValue : 0 	//입금금액
		},{	name: 'mxm2_qntt'			, type: 'float ' , defaultValue : 0 	//m2당수량
		},{	name: 'scre_dvcd'			, type: 'string' 	//스코어구분


		},{	name: 'drtr_name'			, type: 'string' 	//담당자명
		},{	name: 'cstm_name'			, type: 'string' 	//거래처명
		},{	name: 'assi_cstm_name'		, type: 'string' 	//납품처명
		},{	name: 'bxty_name'			, type: 'string' 	//박스규격
		},{	name: 'prod_code'			, type: 'string' 	//제품코드
		},{	name: 'prod_code2'			, type: 'string' 	//제품코드
		},{	name: 'item_name'			, type: 'string' 	//제품명


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
		},{	name: 'auto_spts_yorn'		, type: 'string'	/* 자동 출하계획 생성여부	*/ , defaultValue:_global.options.auto_spts_yorn
		},{	name: 'hqof_idcd'			, type: 'string'	/* stor	*/ , defaultValue:_global.hq_id
		},{	name: 'stor_id'				, type: 'string'	/* stor	*/ , defaultValue:_global.stor_id
		}
	]
});