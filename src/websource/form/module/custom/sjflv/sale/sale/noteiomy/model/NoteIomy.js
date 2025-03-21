Ext.define('module.custom.sjflv.sale.sale.noteiomy.model.NoteIomy',{ extend:'Axt.data.Model',
	 fields:
	[
		{	name: 'iomy_dvcd'		, type: 'string' 	/* 입출금구분코드		*/
		},{	name: 'invc_numb'		, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'invc_date'		, type: 'string' 	/* INVOICE일자	*/
		},{	name: 'stot_bass'		, type: 'string' 	/* 결제근거			*/
		},{	name: 'paym_bank_name'	, type: 'string' 	/* 지급은행명		*/
		},{	name: 'invc_date'		, type: 'string' 	/* 전표일자			*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'iomy_date'		, type: 'string' 	/* 임급일자			*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'publ_date'		, type: 'string' 	/* 발행일자			*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'expr_date'		, type: 'string' 	/* 만기일자			*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'plan_amnt'		, type: 'float' 	/* 계획금액			*/
		},{	name: 'iomy_date'		, type: 'string' 	/* 입출금일자		*/ , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'iomy_amnt'		, type: 'float' 	/* 입출금금액		*/
		},{	name: 'cstm_code'		, type: 'string' 	/* 거래처코드		*/
		},{	name: 'cstm_name'		, type: 'string' 	/* 거래처명			*/
		},{	name: 'remk_text'		, type: 'string' 	/* 비고			*/
		},{	name: 'row_type'		, type: 'string' 	/* row타입		*/
		}
	]
});
