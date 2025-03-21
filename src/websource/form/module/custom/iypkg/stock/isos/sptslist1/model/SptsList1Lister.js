Ext.define('module.custom.iypkg.stock.isos.sptslist1.model.SptsList1Lister', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//출하계획번호
		},{	name: 'line_seqn'			, type: 'float'			//순번
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'acpt_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//수주일자
		},{	name: 'cstm_idcd'			, type: 'string'		//거래처ID
		},{	name: 'cstm_name'			, type: 'string'		//거래처명
		},{	name: 'prod_idcd'			, type: 'string'		//제품ID
		},{	name: 'prod_name'			, type: 'string'		//제품명
		},{	name: 'prod_code'			, type: 'string'		//제품코드
		},{	name: 'prod_spec'			, type: 'string'		//제품규격
		},{	name: 'acpt_qntt'			, type: 'float'			//수주량
		},{	name: 'pqty_pric'			, type: 'string'			//개당단가
		},{	name: 'ostt_yorn'			, type: 'string'		//전체출고여부
		},{	name: 'ostt_yorn2'			, type: 'string'		//부분출고여부
		},{	name: 'ostt_qntt'			, type: 'float'			//출고량
		},{	name: 'trst_qntt'			, type: 'float'			//계획량
		},{	name: 'lcal_name'			, type: 'string'		//운송지역
		}
	]
});