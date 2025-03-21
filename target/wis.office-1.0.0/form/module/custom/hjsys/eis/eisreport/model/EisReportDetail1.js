Ext.define('module.custom.hjsys.eis.eisreport.model.EisReportDetail1',{ extend:'Axt.data.Model',
	fields : [
		{name: 'item_name'				, type: 'string'},		//
		{name: 'unit_name'				, type: 'string'},		//
		{name: 'modl_name'				, type: 'string'},		//
		{name: 'dlvy_cstm_name'			, type: 'string'},		//
		{name: 'cstm_name'				, type: 'string'},		//
		{name: 'acpt_qntt'				, type: 'float'},		//
		{name: 'invc_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//
		{name: 'deli_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//
		{name: 'ostt_date'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },		//
		{name: 'user_memo'				, type: 'string'},		//


		{name: 'wkct_1'			, type: 'string'},		//
		{name: 'wkct_2'			, type: 'string'},		//
		{name: 'wkct_3'			, type: 'string'},		//
		{name: 'wkct_4'			, type: 'string'},		//
		{name: 'wkct_5'			, type: 'string'},		//
		{name: 'wkct_6'			, type: 'string'},		//
		{name: 'wkct_7'			, type: 'string'},		//
		{name: 'wkct_8'			, type: 'string'},		//
		{name: 'wkct_9'			, type: 'string'},		//

		{name: 'weekcnt'		, type: 'string'},		//
	]
});
