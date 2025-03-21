Ext.define('module.custom.wontc.prod.order.workentry.model.WorkEntryMtrlPopup',{ extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'
		},{	name : 'amnd_degr'			, type : 'float'
		},{	name : 'acpt_seqn'			, type : 'float'
		},{	name : 'line_seqn'			, type : 'float'
		},{	name : 'bzpl_idcd'			, type : 'string', defaultValue : _global.hq_id
		},{	name : 'acct_bacd'			, type : 'string'
		},{	name : 'wkct_idcd'			, type : 'string'
		},{	name : 'item_idcd'			, type : 'string'
		},{	name : 'item_name'			, type : 'string'
		},{	name : 'item_code'			, type : 'string'
		},{	name : 'item_spec'			, type : 'string'
		},{	name : 'crte_idcd'			, type : 'string', defaultValue : _global.login_pk
		},{	name : 'item_widh'			, type : 'float'
		},{	name : 'item_leng'			, type : 'float'
		},{	name : 'need_qntt'			, type : 'float'
		},{	name : 'set_qntt'			, type : 'float'
		},{	name : 'base_qntt'			, type : 'float'
		},{	name : 'stok_used_qntt'		, type : 'float'
		},{	name : 'qntt'				, type : 'float'			/*자재투입할 수량*/
		},{	name : 'useqntt'			, type : 'float'			/*자재투입한 수량*/
		},{	name : 'seqn'				, type : 'float'			/* max seqn */
		},
	]
});
