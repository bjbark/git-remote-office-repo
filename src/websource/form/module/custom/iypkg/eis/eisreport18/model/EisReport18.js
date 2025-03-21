Ext.define( 'module.custom.iypkg.eis.eisreport18.model.EisReport18', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'	/* 출고번호		*/
		},{	name: 'invc_date'			, type: 'string'	/* 출고일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'cstm_idcd'			, type: 'string'	/* 출고거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 출고거래처명	*/
		},{	name: 'item_idcd'			, type: 'string'	/* 출고품목ID	*/
		},{	name: 'prod_name'			, type: 'string'	/* 출고품목명	*/
		},{	name: 'prod_code'			, type: 'string'	/* 출고품목코드	*/
		},{	name: 'bxty_name'			, type: 'string'	/* 상자형식		*/
		},{	name: 'bxty_spec'			, type: 'string'	/* 상자규격		*/
		},{	name: 'ostt_qntt'			, type: 'string'	/* 출고량		*/
		},{	name: 'sale_pric'			, type: 'string' 	/* 출고단가		*/
		},{	name: 'sale_amnt'			, type: 'string' 	/* 출고공급가	*/
		//
		},{	name: 'istt_cstm_name'		, type: 'string' 	/* 입고처		*/
		},{	name: 'fabc_name'			, type: 'string'	/* 원단명		*/
		},{	name: 'ppln_dvcd'			, type: 'string'	/* 골		*/
		},{	name: 'fabc_spec'			, type: 'string'	/* 원단규격		*/
		},{	name: 'fdat_spec'			, type: 'string'	/* 재단규격		*/
		},{	name: 'istt_qntt'			, type: 'string' 	/* 입고량		*/
		},{	name: 'istt_pric'			, type: 'string' 	/* 입고단가		*/
		},{	name: 'istt_amnt'			, type: 'string' 	/* 입고공급가	*/
		},{	name: 'rnum'				, type: 'string'
		}
	]
});
