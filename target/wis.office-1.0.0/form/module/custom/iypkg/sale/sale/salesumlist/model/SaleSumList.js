Ext.define('module.custom.iypkg.sale.sale.salesumlist.model.SaleSumList', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'prod_name'			, type: 'string'		//품목명
		},{	name: 'prod_code'			, type: 'string'		//품목코드
		},{	name: 'prod_spec'			, type: 'string'		//상자규격
		},{	name: 'cstm_idcd'			, type: 'string'		//매출처ID
		},{	name: 'cstm_name'			, type: 'string'		//매출처명
		},{	name: 'cstm_code'			, type: 'string'		//매출처코드
		},{	name: 'ostt_qntt'			, type: 'float'			//출고량
		},{	name: 'sale_pric'			, type: 'float'			//단가
		},{	name: 'sale_amnt'			, type: 'float'			//공급가액
		},{	name: 'm2'					, type: 'string'		//총m2
		},{	name: 'rnum'				, type: 'string'
		}
	]
});