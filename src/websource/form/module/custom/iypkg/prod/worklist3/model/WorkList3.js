Ext.define( 'module.custom.iypkg.prod.worklist3.model.WorkList3', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	/* invoice번호	*/
		},{	name: 'line_seqn'		, type: 'float'		/* 순번			*/
		},{	name: 'invc_date'		, type: 'string'	/* 입고일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'wkct_idcd'		, type: 'string'	/* 공정ID			*/
		},{	name: 'wkct_name'		, type: 'string'	/* 공정명			*/
		},{	name: 'cstm_idcd'		, type: 'string'	/* 외주거래처ID		*/
		},{	name: 'cstm_name'		, type: 'string'	/* 외주거래처명		*/
		},{	name: 'istt_qntt'		, type: 'float'		/* 입고수량			*/
		},{	name: 'istt_pric'		, type: 'string'	/* 입고단가			*/
		},{	name: 'istt_vatx'		, type: 'float'		/* 입고부가세		*/
		},{	name: 'istt_amnt'		, type: 'float'		/* 입고공급가		*/
		},{	name: 'ttsm_amnt'		, type: 'float'		/* 합계금액			*/
		},{	name: 'subt_qntt'		, type: 'float'		/* 감량			*/
		},{	name: 'rnum'			, type: 'string'
		}
	]
});
