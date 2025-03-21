Ext.define('module.qc.insp.inspentry4.model.InspEntry4Master',{ extend:'Axt.data.Model',
	fields:[
		{	name: 'invc_numb'				, type: 'string'
		},{	name: 'bzpl_idcd'				, type: 'string'
		},{	name: 'pdod_date'				, type: 'string',defaultV : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'acpt_numb'				, type: 'string'
		},{	name: 'acpt_seqn'				, type: 'float'
		},{	name: 'pdsd_numb'				, type: 'string'
		},{	name: 'pdsd_date'				, type: 'string'
		},{	name: 'wkfw_idcd'				, type: 'string'
		},{	name: 'strt_dttm'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'endd_dttm'				, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'work_date'				, type: 'string',defaultV : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'stnd_unit'				, type: 'string'
		},{	name: 'stnd_unit_qntt'			, type: 'float'
		},{	name: 'prod_bzpl_idcd'			, type: 'string'
		},{	name: 'pror_prog_stat_dvcd'		, type: 'string'
		},{	name: 'last_insp_yorn'			, type: 'string'
		},{	name: 'last_insp_date'			, type: 'string',defaultV : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'line_seqn'				, type: 'float'
		},{	name: 'wkfw_seqn'				, type: 'float'
		},{	name: 'wkct_idcd'				, type: 'string'
		},{	name: 'cvic_idcd'				, type: 'string'
		},{	name: 'wkct_item_idcd'			, type: 'string'
		},{	name: 'mold_idcd'				, type: 'string'
		},{	name: 'mtrl_bacd'				, type: 'string'
		},{	name: 'prod_dept_idcd'			, type: 'string'
		},{	name: 'orig_invc_numb'			, type: 'string'
		},{	name: 'cstm_idcd'				, type: 'string'
		},{	name: 'item_idcd'				, type: 'string'
		},{	name: 'bomt_degr'				, type: 'string'
		},{	name: 'unit_idcd'				, type: 'string'
		},{	name: 'indn_qntt'				, type: 'float'	//의뢰수량
		},{	name: 'work_strt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr
		},{	name: 'work_endd_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.dateToStr
		},{	name: 'work_dvcd'				, type: 'string'
		},{	name: 'insp_wkct_yorn'			, type: 'string'
		},{	name: 'last_wkct_yorn'			, type: 'string'
		},{	name: 'cofm_yorn'				, type: 'string'
		},{	name: 'remk_text'				, type: 'string'
		},{	name: 'prog_stat_dvcd'			, type: 'string'
		},{	name: 'uper_seqn'				, type: 'float'
		},{	name: 'disp_seqn'				, type: 'float'
		},{	name: 'cstm_name'				, type: 'string'
		},{	name: 'item_name'				, type: 'string'
		},{	name: 'item_spec'				, type: 'string'
		},{	name: 'wkct_name'				, type: 'string'
		},{	name: 'dept_name'				, type: 'string'
		},{	name: 'work_item_name'			, type: 'string'
		},{	name: 'work_item_spec'			, type: 'string'
		},{	name: 'user_memo'				, type: 'string'
		},{	name: 'sysm_memo'				, type: 'string'
		},{	name: 'prnt_idcd'				, type: 'string'
		},{	name: 'line_levl'				, type: 'float'  , defaultValue: '0'
		},{	name: 'line_ordr'				, type: 'float'
		},{	name: 'line_stat'				, type: 'string' , defaultValue: '0'
		},{	name: 'line_clos'				, type: 'string'
		},{	name: 'find_name'				, type: 'string'
		},{	name: 'updt_user_name'			, type: 'string'
		},{	name: 'updt_ipad'				, type: 'string'
		},{	name: 'updt_dttm'				, type: 'string'
		},{	name: 'updt_idcd'				, type: 'string'
		},{	name: 'updt_urif'				, type: 'string'
		},{	name: 'crte_user_name'			, type: 'string'
		},{	name: 'crte_ipad'				, type: 'string'
		},{	name: 'crte_dttm'				, type: 'string'
		},{	name: 'crte_idcd'				, type: 'string'
		},{	name: 'crte_urif'				, type: 'string'
		},{	name: 'prod_qntt'				, type: 'float'  //생산수량
		},{	name: 'insp_qntt'				, type: 'float'  //검사수량
		},{	name: 'smor_poor_qntt'			, type: 'float'  //시료불량수량
		},{	name: 'smor_pass_qntt'			, type: 'float'  //시료합격수량
		},{	name: 'insp_mthd_dvcd'			, type: 'string' //검사방법
		},{	name: 'judt_dvcd'				, type: 'string' //검사판정
		},{	name: 'wkod_numb'				, type: 'string' //지시번호
		},{	name: 'last_invc_numb'			, type: 'string' //최종검사번호
		},{	name: 'pass_yorn'				, type: 'string' //합격여부
		},{	name: 'istt_yorn'				, type: 'string' //입고여부
		},{	name: 'work_book_invc_numb'		, type: 'string' //work_book -> invc_numb
		}
	]
});
