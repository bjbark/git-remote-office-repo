Ext.define('module.custom.hjsys.sale.order.saleorder.model.SaleOrderSubItem',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'invc_numb',				type: 'string'},
		{name: 'amnd_degr',				type: 'float' , defaultValue: '1'},
		{name: 'acpt_seqn',				type: 'float' , defaultValue: '1'},
		{name: 'line_seqn',				type: 'float' },
		{name: 'acct_bacd',				type: 'string'},
		{name: 'item_idcd',				type: 'string'},
		{name: 'item_widh',				type: 'float' },
		{name: 'item_leng',				type: 'float' },
		{name: 'need_qntt',				type: 'float' },
		{name: 'exng_qntt',				type: 'float' },
		{name: 'stok_qntt',				type: 'float' },
		{name: 'puch_qntt',				type: 'float' },
		{name: 'offr_yorn',				type: 'string'},
		{name: 'offr_date',				type: 'string'},
		{name: 'ostt_yorn',				type: 'string'},
		{name: 'ostt_date',				type: 'string'},
		{name: 'ostt_numb',				type: 'string'},
		{name: 'item_name',				type: 'string'},
		{name: 'item_spec',				type: 'string'},
		{name: 'item_code',				type: 'string'},
		{name: 'uper_seqn',				type: 'float' },
		{name: 'disp_seqn',				type: 'float' },
		{name: 'user_memo',				type: 'string'},
		{name: 'stok_used_qntt',		type: 'string'},
		{name: 'orig_invc_numb',		type: 'string'},
		{name: 'set_qntt',				type: 'float'},
		{name: 'mtrl_bacd',				type: 'string'},
		{name: 'mtrl_bacd_name',		type: 'string'},

		{name: 'sysm_memo',				type: 'string'},						//시스템메모
		{name: 'prnt_idcd',				type: 'string'},						//부모ID
		{name: 'line_levl',				type: 'float' , defaultValue: '0'},		//ROW레벨
		{name: 'line_ordr',				type: 'string', defaultValue: '0'},		//ROW순서
		{name: 'line_stat',				type: 'string', defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},						//ROW마감
		{name: 'find_name',				type: 'string'},						//찾기명
		{name: 'updt_user_name',		type: 'string'},						//수정사용자명
		{name: 'updt_ipad',				type: 'string'},						//수정IP
		{name: 'updt_dttm',				type: 'string'},						//수정일시
		{name: 'updt_idcd',				type: 'string'},						//수정ID
		{name: 'updt_urif',				type: 'string'},						//수정UI
		{name: 'crte_user_name',		type: 'string'},						//생성사용자명
		{name: 'crte_ipad',				type: 'string'},						//생성IP
		{name: 'crte_dttm',				type: 'string'},						//생성일시
		{name: 'crte_idcd',				type: 'string'},						//생성ID
		{name: 'crte_urif',				type: 'string'},						//생성UI
	],
});

