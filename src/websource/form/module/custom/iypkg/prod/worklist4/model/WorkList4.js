Ext.define( 'module.custom.iypkg.prod.worklist4.model.WorkList4', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	/* invoice번호	*/
		},{	name: 'line_seqn'		, type: 'float'		/* 순번			*/
		},{	name: 'invc_date'		, type: 'string'	/* 공정ID			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'wkct_idcd'		, type: 'string'	/* 공정ID			*/
		},{	name: 'wkct_name'		, type: 'string'	/* 공정명			*/
		},{	name: 'cstm_code'		, type: 'string'	/* 외주거래처코드		*/
		},{	name: 'cstm_name'		, type: 'string'	/* 외주거래처명		*/
		},{	name: 'acpt_numb'		, type: 'string'	/* 수주번호			*/
		},{	name: 'acpt_date'		, type: 'string'	/* 수주일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_cstm_name'	, type: 'string'	/* 수주거래처명		*/
		},{	name: 'prod_name'		, type: 'string'	/* 제품명			*/
		},{	name: 'prod_spec'		, type: 'string'	/* 제품규격			*/
		},{	name: 'offr_qntt'		, type: 'float'		/* 발주수량			*/
		},{	name: 'istt_qntt'		, type: 'float'		/* 입고수량			*/
		},{	name: 'istt_pric'		, type: 'string'	/* 입고단가			*/
		},{	name: 'istt_amnt'		, type: 'float'		/* 입고공급가		*/
		},{	name: 'wkun_dvcd'		, type: 'string'	/* 작업단위			*/
		},{	name: 'unistt'			, type: 'string'	/* 미입고량			*/
		},{	name: 'unit_name'		, type: 'string'	/* 수량단위명		*/
		},{	name: 'rnum'			, type: 'string'
		}
	]
});
