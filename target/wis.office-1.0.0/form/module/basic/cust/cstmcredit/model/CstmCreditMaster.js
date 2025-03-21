Ext.define('module.basic.cust.cstmcredit.model.CstmCreditMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'trns_stop_yorn'		, type: 'string'	/* 거래상태	*/
		},{	name: 'cstm_idcd'			, type: 'string'	/* 거래처idcd		*/
		},{	name: 'cstm_code'			, type: 'string'	/* 거래처코드		*/
		},{	name: 'cstm_name'			, type: 'string'	/* 거래처명			*/
		},{	name: 'sale_drtr_idcd'		, type: 'string'	/* 영업담당자			*/
		},{	name: 'sale_drtr_name'		, type: 'string'	/* 영업담당자			*/
		},{	name: 'pryr_trns_amnt'		, type: 'string'	/* 년간거래금액			*/
		},{	name: 'totl_urcp_amnt'		, type: 'string'	/* 미수총액			*/
		},{	name: 'last_ostt_date'		, type: 'string'	/* 최근출고일			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr ,
		},{	name: 'last_iamt_date'		, type: 'string'	/* 최근입금일			*/, convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr ,
		},{	name: 'npay_term'			, type: 'string'	/* 미수기간		*/
		}
	]
})