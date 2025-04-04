Ext.define('module.custom.hjsys.sale.order.saleorder.model.SaleOrderTree',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'id'					, type: 'string'
		},{ name: 'line_seqn'			, type: 'int'   , mapping : 'resource.line_seqn'
 		},{ name: 'text'				, type: 'string', mapping : 'resource.item_name'
		},{	name: 'invc_numb'			, type: 'string', mapping : 'resource.invc_numb'
		},{	name: 'line_seqn'			, type: 'string', mapping : 'resource.line_seqn'
		},{	name: 'acpt_seqn'			, type: 'string', mapping : 'resource.acpt_seqn'
		},{	name: 'acct_bacd'			, type: 'string', mapping : 'resource.acct_bacd'
		},{	name: 'item_idcd'			, type: 'string', mapping : 'resource.item_idcd'
		},{	name: 'item_name'			, type: 'string', mapping : 'resource.item_name'
		},{	name: 'item_code'			, type: 'string', mapping : 'resource.item_code'
		},{	name: 'item_spec'			, type: 'string', mapping : 'resource.item_spec'
		},{	name: 'item_tick'			, type: 'float' , mapping : 'resource.item_tick'
		},{	name: 'item_leng'			, type: 'float' , mapping : 'resource.item_leng'
		},{	name: 'item_widh'			, type: 'float' , mapping : 'resource.item_widh'
		},{	name: 'item_mtrl'			, type: 'string', mapping : 'resource.item_mtrl'
		},{	name: 'mtrl_bacd'			, type: 'string', mapping : 'resource.mtrl_bacd'
		},{	name: 'mtrl_bacd_name'		, type: 'string', mapping : 'resource.mtrl_bacd_name'
		},{	name: 'prnt_acct'			, type: 'string', mapping : 'resource.prnt_acct'
		},{	name: 'drwg_chek'			, type: 'string', mapping : 'resource.drwg_chek'
		},{	name: 'drwg_numb'			, type: 'string', mapping : 'resource.drwg_numb'
		},{	name: 'revs_numb'			, type: 'string', mapping : 'resource.revs_numb'
		},{	name: 'pqty_ndqt'			, type: 'float' , mapping : 'resource.pqty_ndqt'
		},{	name: 'loss_rate'			, type: 'string' , mapping : 'resource.loss_rate'
		},{	name: 'acct_bacd_name'		, type: 'string', mapping : 'resource.acct_bacd_name'
		},{	name: 'pror_cnt'			, type: 'float' , mapping : 'resource.pror_cnt'
		},{	name: 'mtrl_cnt1'			, type: 'float' , mapping : 'resource.mtrl_cnt1'
		},{	name: 'mtrl_cnt2'			, type: 'float' , mapping : 'resource.mtrl_cnt2'
		},{	name: 'row_number'			, type: 'float' , mapping : 'resource.row_number'


		},{	name: 'ivst_wkct_idcd'		, type: 'string', mapping : 'resource.ivst_wkct_idcd'
		},{	name: 'unit_idcd'			, type: 'string', mapping : 'resource.unit_idcd'
		},{	name: 'supl_dvcd'			, type: 'string', mapping : 'resource.supl_dvcd'
		},{	name: 'cstm_idcd'			, type: 'string', mapping : 'resource.cstm_idcd'
		},{	name: 'ndqt_nmrt'			, type: 'string', mapping : 'resource.ndqt_nmrt'
		},{	name: 'ndqt_dnmn'			, type: 'string', mapping : 'resource.ndqt_dnmn'
		},{	name: 'need_qntt'			, type: 'float' , mapping : 'resource.need_qntt'
		},{	name: 'used_schd_date'		, type: 'string', mapping : 'resource.used_schd_date'
		},{	name: 'lwcs_yorn'			, type: 'string', mapping : 'resource.lwcs_yorn'
		},{	name: 'incm_loss_rate'		, type: 'string', mapping : 'resource.incm_loss_rate'
		},{	name: 'otcm_loss_rate'		, type: 'string', mapping : 'resource.otcm_loss_rate'
		},{	name: 'stok_plac'			, type: 'string', mapping : 'resource.stok_plac'
		},{	name: 'stok_unit_idcd'		, type: 'string', mapping : 'resource.stok_unit_idcd'
		},{	name: 'remk_text'			, type: 'string', mapping : 'resource.remk_text'
		},{	name: 'offr_date'			, type: 'string', mapping : 'resource.offr_date'
		},{	name: 'offr_numb'			, type: 'string', mapping : 'resource.offr_numb'
		},{	name: 'offr_qntt'			, type: 'string', mapping : 'resource.offr_qntt'
		},{	name: 'last_yorn'			, type: 'string', mapping : 'resource.last_yorn'
		},{	name: 'imge_1fst'			, type: 'string', mapping : 'resource.imge_1fst'
		},{	name: 'imge_2snd'			, type: 'string', mapping : 'resource.imge_2snd'
		},{	name: 'uper_seqn'			, type: 'string', mapping : 'resource.uper_seqn'
		},{	name: 'disp_seqn'			, type: 'string', mapping : 'resource.disp_seqn'
		},{	name: 'user_memo'			, type: 'string', mapping : 'resource.user_memo'
		},{	name: 'sysm_memo'			, type: 'string', mapping : 'resource.sysm_memo'
		},{	name: 'prnt_idcd'			, type: 'string', mapping : 'resource.prnt_idcd'
		},{	name: 'line_levl'			, type: 'float' , mapping : 'resource.line_levl'
		},{	name: 'line_ordr'			, type: 'string', mapping : 'resource.line_ordr'
		},{	name: 'line_stat'			, type: 'string', mapping : 'resource.line_stat'
		},{	name: 'line_clos'			, type: 'string', mapping : 'resource.line_clos'
		},{	name: 'find_name'			, type: 'string', mapping : 'resource.find_name'
		},{	name: 'updt_user_name'		, type: 'string', mapping : 'resource.updt_user_name'
		},{	name: 'updt_ipad'			, type: 'string', mapping : 'resource.updt_ipad'
		},{	name: 'updt_dttm'			, type: 'string', mapping : 'resource.updt_dttm'
		},{	name: 'updt_idcd'			, type: 'string', mapping : 'resource.updt_idcd'
		},{	name: 'updt_urif'			, type: 'string', mapping : 'resource.updt_urif'
		},{	name: 'crte_user_name'		, type: 'string', mapping : 'resource.crte_user_name'
		},{	name: 'crte_ipad'			, type: 'string', mapping : 'resource.crte_ipad'
		},{	name: 'crte_dttm'			, type: 'string', mapping : 'resource.crte_dttm'
		},{	name: 'crte_idcd'			, type: 'string', mapping : 'resource.crte_idcd'
		},{	name: 'crte_urif'			, type: 'string', mapping : 'resource.crte_urif'
		},{	name: 'has_chld'			, type: 'string', mapping : 'resource.has_chld'
		},{	name: 'ivst_wkct_name'		, type: 'string', mapping : 'resource.ivst_wkct_name'
		},{	name: 'width'				, type: 'float' , mapping : 'resource.width'
		},{	name: 'length'				, type: 'float' , mapping : 'resource.length'
		},{	name: 'mprq_qntt'			, type: 'float' , mapping : 'resource.mprq_qntt'
		},{	name: 'mtrl_ndqt'			, type: 'float' , mapping : 'resource.mtrl_ndqt'
		},{	name: 'file_name'			, type: 'string' , mapping : 'resource.file_name'
		}
	],
	idProperty: 'id'+'prnt_idcd'
});
