Ext.define( 'module.sale.sale.salelist3.model.SaleList3', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//입고INVOICE번호
		},{	name: 'line_seqn'			, type: 'float'			//입고순번
		},{	name: 'acpt_numb'			, type: 'string'		//수주INVOICE번호
		},{	name: 'item_idcd'			, type: 'string'		//원단ID
		},{	name: 'fabc_name'			, type: 'string'		//원단명
		},{	name: 'fabc_code'			, type: 'string'		//원단코드
		},{	name: 'ppln_dvcd'			, type: 'string'		//원단골
		},{	name: 'cstm_idcd'			, type: 'string'		//입고처ID
		},{	name: 'cstm_name'			, type: 'string'		//입고처명
		},{	name: 'fdat_spec'			, type: 'string'		//재단규격 = 원단규격
		},{	name: 'istt_qntt'			, type: 'float'			//입고량
		},{	name: 'acpt_cstm_name'		, type: 'string'		//수주거래처명
		},{	name: 'prod_idcd'			, type: 'string'		//제품ID
		},{	name: 'prod_name'			, type: 'string'		//제품명
		},{	name: 'prod_spec'			, type: 'string'		//상자규격
		},{	name: 'istt_amnt'			, type: 'float'			//원단입고공급가
		},{	name: 'mxm2_qntt'			, type: 'float'			//원단입고제곱미터수량
		},{	name: 'pqty_pric'			, type: 'string'		//원단입고개당단가
		},{	name: 'mxm2_pric'			, type: 'float'			//원단입고제곱미터단가
		},{	name: 'm2'					, type: 'float'			//총m2
		},{	name: 'ostt_qntt'			, type: 'float'			//출고량
		},{	name: 'sale_amnt'			, type: 'float'			//제품출고공급가액
		},{	name: 'persent'				, type: 'float'			//원가율 = 재료비율 = (입고공급가 / 출고공급가  * 100)
		},{	name: 'rnum'				, type: 'float'
		}
	]
});
