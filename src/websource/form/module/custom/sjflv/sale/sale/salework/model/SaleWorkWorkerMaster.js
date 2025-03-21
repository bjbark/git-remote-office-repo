Ext.define('module.custom.sjflv.sale.sale.salework.model.SaleWorkWorkerMaster',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'puch_sale_dvcd'		, type: 'string' ,defaultValue : '2000'	/* 매입매출구분코드 1000:매입 2000: 매출		*/
		},{	name: 'publ_date'			, type: 'string'	/* 발행일자		*/
		},{	name: 'rqod_rcvd_dvcd'		, type: 'string'	/* 영수/청구		*/
		},{	name: 'vatx_dvcd'			, type: 'string'	/* 				*/
		},{	name: 'invc_date1'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 				*/
		},{	name: 'invc_date2'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 				*/
		},{	name: 'deli_date1'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 				*/
		},{	name: 'deli_date2'			, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr	/* 				*/
		},{	name: 'deli_yorn'			, type: 'string'
		},{	name: 'dept_idcd'			, type: 'string' , defaultValue : _global.dept_id	/* */
		},{	name: 'drtr_idcd'			, type: 'string' , defaultValue : _global.login_pk	/* */
		},{	name: 'drtr_name'			, type: 'string' , defaultValue : _global.login_nm	/* */
		},{	name: 'stor'				, type: 'string' , defaultValue : _global.stor_grp
		},{	name: 'bzpl_idcd'			, type: 'string' , defaultValue : _global.options.dflt_bzpl_idcd
		},{	name: 'acpt_dvcd'			, type: 'string'
		}
	]
});
