Ext.define( 'module.sale.sale.salelist1.model.SaleList1', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'           , type: 'string'	/* Invoice ID	*/
		},{	name: 'line_seqn'           , type: 'float'	/* 순번			*/
		},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명		*/
		},{	name: 'invc_date'           , type: 'string'	/* 매출일자		*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'prod_name'           , type: 'string'	/* 품명			*/
		},{	name: 'prod_spec'           , type: 'string'	/* 규격			*/
		},{	name: 'ostt_qntt'           , type: 'float'	/* 출고수량		*/
		},{	name: 'sale_pric'           , type: 'string'	/* 단가			*/
		},{	name: 'sale_amnt'           , type: 'float'	/* 공급가액		*/
		},{	name: 'vatx_amnt'           , type: 'float'	/* 부가세액		*/
		},{	name: 'ttsm_amnt'           , type: 'float'	/* 합계금액		*/
		},{	name: 'sale_ttsm'           , type: 'float'	/* 청구금액		*/
		},{	name: 'baln'                , type: 'float'	/* 잔액		name=edit_tab1name=edit_tab1edit_tab1edit_tab1	*/
		},{	name: 'user_memo'           , type: 'string'	/* 비고			*/
		},{	name: 'rnum'                , type: 'string'	/* */
		}
	]
});
