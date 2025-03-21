Ext.define('module.custom.komec.item.itemlist.model.ItemListRett',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'invc_numb'              , type : 'string'
		},{ name: 'line_seqn'              , type : 'string'
		},{ name: 'acpt_numb'              , type : 'string'
		},{ name: 'acpt_seqn'              , type : 'string'
		},{ name: 'dlvy_numb'              , type : 'string'
		},{ name: 'dlvy_seqn'              , type : 'string'
		},{ name: 'item_idcd'              , type : 'string'
		},{ name: 'unit_idcd'              , type : 'string'
		},{ name: 'wrhs_idcd'              , type : 'string'
		},{ name: 'zone_idcd'              , type : 'string'
		},{ name: 'rett_resn_dvcd'         , type : 'string'
		},{ name: 'norm_sale_pric'         , type : 'float'
		},{ name: 'sale_stnd_pric'         , type : 'float'
		},{ name: 'sale_pric'              , type : 'float'
		},{ name: 'rett_qntt'              , type : 'float'
		},{ name: 'vatx_incl_yorn'         , type : 'string'
		},{ name: 'vatx_rate'              , type : 'float'
		},{ name: 'sply_amnt'              , type : 'float'
		},{ name: 'vatx_amnt'              , type : 'float'
		},{ name: 'ttsm_amnt'              , type : 'float'
		},{ name: 'rett_proc_dvcd'         , type : 'string'
		},{ name: 'proc_drtr_idcd'         , type : 'string'
		},{ name: 'proc_dttm'              , type : 'string'
		},{ name: 'apvl_date'              , type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'ostt_date1'              , type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'ostt_date2'              , type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'apvl_drtr_idcd'         , type : 'string'
		},{ name: 'rett_memo'              , type : 'string'
		},{ name: 'lott_numb'              , type : 'string'
		},{ name: 'orig_invc_numb'         , type : 'string'
		},{ name: 'orig_seqn'              , type : 'string'
		},{ name: 'uper_seqn'              , type : 'string'
		},{ name: 'disp_seqn'              , type : 'string'
		},{ name: 'invc_date'              , type : 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'bzpl_idcd'              , type : 'string'
		},{ name: 'expt_dvcd'              , type : 'string'
		},{ name: 'cstm_idcd'              , type : 'string'
		},{ name: 'ostt_dvcd'              , type : 'string'
		},{ name: 'drtr_idcd'              , type : 'string'
		},{ name: 'dept_idcd'              , type : 'string'
		},{ name: 'rett_hhmm'              , type : 'string'
		},{ name: 'trut_dvcd'              , type : 'string'
		},{ name: 'dlvy_cond_dvcd'         , type : 'string'
		},{ name: 'deli_date'              , type : 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'sale_stor_yorn'         , type : 'string'
		},{ name: 'crny_dvcd'              , type : 'string'
		},{ name: 'excg_rate'              , type : 'float'
		},{ name: 'remk_text'              , type : 'string'
		},{ name: 'item_code'              , type : 'string'
		},{ name: 'item_name'              , type : 'string'
		},{ name: 'item_spec'              , type : 'string'
		},{ name: 'item_unit'              , type : 'string'
		},{ name: 'cstm_code'              , type : 'string'
		},{ name: 'cstm_name'              , type : 'string'
		},{ name: 'boss_name'              , type : 'string'
		},{ name: 'tele_numb'              , type : 'string'
		},{ name: 'dept_code'              , type : 'string'
		},{ name: 'dept_name'              , type : 'string'
		},{ name: 'bzpl_code'              , type : 'string'
		},{ name: 'bzpl_name'              , type : 'string'
		},{ name: 'wrhs_code'              , type : 'string'
		},{ name: 'wrhs_name'              , type : 'string'
		},{ name: 'func_wrhs_idcd'         , type : 'string'
		}
	]
});
