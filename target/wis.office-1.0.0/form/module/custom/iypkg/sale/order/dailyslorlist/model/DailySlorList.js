Ext.define('module.custom.iypkg.sale.order.dailyslorlist.model.DailySlorList',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'invc_numb'			, type: 'string'	/* 수주번호		*/
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		/* 수주일자		*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처ID	*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드	*/
		},{	name: 'bxty_idcd'			, type: 'string'	/* 박스형식ID = 제품형식*/
		},{	name: 'bxty_name'			, type: 'string'	/* 박스형식명	*/
		},{	name: 'prod_idcd'			, type: 'string'	/* 제품ID		*/
		},{	name: 'prod_name'			, type: 'string'	/* 제품명		*/
		},{	name: 'acpt_qntt'			, type: 'float '	/* 수주량		*/
		},{	name: 'pqty_pric'			, type: 'float '	/* 개당단가		*/
		},{	name: 'sply_amnt'			, type: 'float '	/* 공급가액	 : 개당단가*수주량 으로 해놈(임시)	*/
		},{	name: 'pcod_numb'			, type: 'string'	/* PONO		*/
		},{	name: 'prod_spec'			, type: 'string'	/* 상자규격		*/
		},{	name: 'rnum'				, type: 'string'	/* 		*/
		},{	name: 'deli_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		/* 납기일자		*/
		}
	]
});
