Ext.define('module.custom.iypkg.stock.isos.sptsmast.model.SptsMast',{ extend:'Axt.data.Model',
	 fields:
	[
		{	name: 'invc_numb'			, type: 'string' 	/* 출하계획번호	*/
		},{	name: 'new_invc_numb'		, type: 'string' 	/* 출하계획순번	*/
		},{	name: 'line_seqn'			, type: 'float' 	/* 출하계획순번	*/
		},{	name: 'invc_date'			, type: 'string' 	/* 출하계획날짜	*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/*INVOICE일자*/
		},{	name: 'invc_date2'			, type: 'string' 	/* 출하계획날짜	*/ , convert : Ext.util.Format.dateToStr, serialize: Ext.util.Format.dateToStr	/*INVOICE일자*/
		},{	name: 'cstm_idcd'			, type: 'string' 	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string' 	/* 거래처명		*/
		},{	name: 'cars_idcd'			, type: 'string' 	/* 거래처명		*/
		},{	name: 'cars_name'			, type: 'string' 	/* 거래처명		*/
		},{	name: 'acpt_numb'			, type: 'string' 	/* 수주번호		*/
		},{	name: 'acpt_seqn'			, type: 'float' 	/* 수주순번		*/
		},{	name: 'acpt_date'			, type: 'string' 	/* 수주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_qntt'			, type: 'float' 	/* 수주수량		*/
		},{	name: 'item_idcd'			, type: 'string' 	/* 품목ID		*/
		},{	name: 'prod_idcd'			, type: 'string' 	/* 품목ID		*/
		},{	name: 'prod_name'			, type: 'string' 	/* 품목명		*/
		},{	name: 'trst_qntt'			, type: 'float' 	/* 의뢰수량		*/
		},{	name: 'vatx_incl_yorn'		, type: 'string' 	/* 부가세포함여부	*/
		},{	name: 'sale_amnt'			, type: 'float' 	/* 판매금액		*/
		},{	name: 'vatx_amnt'			, type: 'float' 	/* 부가세액		*/
		},{	name: 'ttsm_amnt'			, type: 'float' 	/* 합계금액		*/
		},{	name: 'deli_date'			, type: 'string' 	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'stnd_unit'			, type: 'string' 	/* 기준단위		*/
		},{	name: 'stnd_unit_qntt'		, type: 'float' 	/* 기준단위수량	*/
		},{	name: 'wrhs_idcd'			, type: 'string' 	/* 창고ID		*/
		},{	name: 'dlvy_cstm_idcd'		, type: 'string' 	/* 납품거래처ID	*/
		},{	name: 'dlvy_cstm_name'		, type: 'string' 	/* 납품거래처명	*/
		},{	name: 'dsct_yorn'			, type: 'string' 	/* 중단여부		*/
		},{	name: 'ostt_dvcd'			, type: 'string' 	/* 출고구분코드	*/
		},{	name: 'insp_dvcd'			, type: 'string' 	/* 검사구분코드	*/
		},{	name: 'insp_date'			, type: 'string' 	/* 검사일자		*/
		},{	name: 'pcod_numb'			, type: 'string' 	/* PONO		*/
		},{	name: 'ostt_yorn'			, type: 'string' 	/* 출고여부		*/
		},{	name: 'ostt_date'			, type: 'string' 	/* 출고일자		*/
		},{	name: 'ostt_qntt'			, type: 'float' 	/* 출고수량		*/
		},{	name: 'uper_seqn'			, type: 'float' 	/* 상위순번		*/
		},{	name: 'disp_seqn'			, type: 'float' 	/* 표시순번		*/
		},{	name: 'sum_qntt'			, type: 'float' 	/* 표시순번		*/
		},{	name: 'item_leng'			, type: 'string' 	/* 장		*/
		},{	name: 'item_widh'			, type: 'string' 	/* 폭		*/
		},{	name: 'item_hght'			, type: 'string' 	/* 고		*/
		},{	name: 'spec'				, type: 'string' ,	/* 상자규격		*/
			convert : function(newValue , row){
				return row.get('item_leng')+'*'+row.get('item_widh')+'*'+row.get('item_hght');
			}
		},{	name: 'lcal_idcd'			, type: 'string' 	/* 운송지역idcd	*/
		},{	name: 'lcal_name'			, type: 'string' 	/* 운송지역명	*/
		},{	name: 'm2'					, type: 'float' 	/* m2/총		*/

		},{	name: 'user_memo'			, type: 'string' 	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string' 	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string' 	/* 부모ID		*/
		},{	name: 'disp_seqn'			, type: 'float' 	/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_levl'			, type: 'float' 	/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float' 	/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string' 	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string' 	/* ROW마감	*/ , defaultValue: 0
		},{	name: 'find_name'			, type: 'string' 	/* 찾기명		*/ , defaultValue : 0
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
	]
});
