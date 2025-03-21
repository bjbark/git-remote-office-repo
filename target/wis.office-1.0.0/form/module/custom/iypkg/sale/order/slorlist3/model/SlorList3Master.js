Ext.define('module.custom.iypkg.sale.order.slorlist3.model.SlorList3Master',{ extend:'Axt.data.Model',
	fields : [
		// boxx_acpt
		{	name: 'invc_numb'           , type: 'string'	/* 수주번호		*/
		},{	name: 'invc_date'           , type: 'string'	/* 수주일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_dvcd'           , type: 'string'	/* 수주구분코드	*/
		},{	name: 'drtr_idcd'           , type: 'string'	/* 담당자ID	*/
		},{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID	*/
		},{	name: 'mker_name'           , type: 'string'	/* 생산자명		*/
		},{	name: 'prod_idcd'           , type: 'string'	/* 제품ID		*/
		},{	name: 'prod_name'           , type: 'string'	/* 제품명		*/
		},{	name: 'item_leng'           , type: 'string'	/* 제품길이		*/
		},{	name: 'item_widh'           , type: 'string'	/* 제품폭		*/
		},{	name: 'item_hght'           , type: 'string'	/* 제품높이		*/
		},{	name: 'spec'                , type: 'string'	/* 상자규격		*/
			,convert : function(newValue , row){
				return row.get('item_leng')+'*'+row.get('item_widh')+'*'+row.get('item_hght');
			}
		},{	name: 'pqty_pric'           , type: 'float'		/* 개당단가		*/ , defaultValue : 0
		},{	name: 'acpt_qntt'           , type: 'float'		/* 수주수량		*/ , defaultValue : 0
		},{	name: 'stok_qntt'           , type: 'float'		/* 재고수량		*/ , defaultValue : 0
		},{	name: 'prod_qntt'           , type: 'float'		/* 생산수량		*/ , defaultValue : 0
		},{	name: 'deli_date'           , type: 'string'	/* 납기일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'pcod_numb'           , type: 'string'	/* PONO			*/
		},{	name: 'vatx_dvcd'           , type: 'string'	/* 부가세구분코드	*/
		},{	name: 'sply_amnt'           , type: 'float'		/* 공급가액		*/ , defaultValue : 0
		},{	name: 'vatx_amnt'           , type: 'float'		/* 부가세액		*/ , defaultValue : 0
		},{	name: 'ttsm_amnt'           , type: 'float'		/* 합계금액		*/ , defaultValue : 0
		},{	name: 'vatx'                , type: 'float'		/* 부가율		*/ , defaultValue : 0
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

		// 거래처(cstm_mast)
		},{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명		*/
		},{	name: 'sale_drtr_idcd'      , type: 'string'	/* 영업담당자ID	*/

		// 담당자(user_mast)
		},{	name: 'user_idcd'           , type: 'string'	/* 담장자ID		*/
		},{	name: 'user_name'           , type: 'string'	/* 담장자명		*/

		},{	name: 'rnum'                 , type: 'string'	/* 순서	*/
		}

	]
});
