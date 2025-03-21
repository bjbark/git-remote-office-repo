Ext.define( 'module.custom.iypkg.prod.worklist4.model.WorkList4Lister2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'	/* invoice번호	*/
		},{	name: 'line_seqn'		, type: 'float'		/* 순번			*/
		},{	name: 'invc_date'		, type: 'string'	/* 일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'prod_idcd'		, type: 'string'	/* 품목ID			*/
		},{	name: 'prod_code'		, type: 'string'	/* 품목코드			*/
		},{	name: 'prod_spec'		, type: 'string'	/* 제품규격			*/
		},{	name: 'cstm_idcd'		, type: 'string'	/* 발주거래처코드		*/
		},{	name: 'cstm_code'		, type: 'string'	/* 발주거래처코드		*/
		},{	name: 'cstm_name'		, type: 'string'	/* 발주거래처명		*/
		},{	name: 'acpt_cstm_name'	, type: 'string'	/* 수주거래처명		*/
		},{	name: 'offr_qntt'		, type: 'float'		/* 발주수량			*/
		},{	name: 'acpt_qntt'		, type: 'float'		/* 수주수량			*/
		},{	name: 'unoffr'			, type: 'string'	/* 미발주량			*/
		},{	name: 'pcod_numb'		, type: 'string'	/* 고객번호			*/
		},{	name: 'acpt_date'		, type: 'string'	/* 수주일자			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		}
	]
});
