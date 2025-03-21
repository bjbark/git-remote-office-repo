Ext.define('module.workshop.print.basic.menumast.model.MenuMastMaster', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string' 	/* INVOICE번호	*/
		},{	name: 'prnt_idcd'			, type: 'string' 	/* 부모ID		*/
		},{	name: 'prnt_name'			, type: 'string' 	/* 부모명		*/
		},{	name: 'dspl_rank'			, type: 'float ' 	/* 순위			*/
		},{	name: 'clss_name'			, type: 'string' 	/* 명칭			*/
		},{	name: 'esti_typl_yorn'		, type: 'char' 		/* 견적여부		*/



		},{	name: 'user_memo'			, type: 'string'			//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'		//시스템메모
		},{	name: 'line_levl'			, type: 'float', defaultValue: '0'
		},{	name: 'line_ordr'			, type: 'float', defaultValue: '0'
		},{	name: 'line_stat'			, type: 'float', defaultValue: '0'
		},{	name: 'line_clos'			, type: 'float', defaultValue: '0'
		},{	name: 'find_name'			, type: 'string'
		},{	name: 'updt_user_name'		, type: 'string'
		},{	name: 'updt_ipad'			, type: 'string'
		},{	name: 'updt_dttm'			, type: 'string'
		},{	name: 'updt_idcd'			, type: 'string'
		},{	name: 'updt_urif'			, type: 'string'
		},{	name: 'crte_user_name'		, type: 'string'
		},{	name: 'crte_ipad'			, type: 'string'
		},{	name: 'crte_dttm'			, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'crte_idcd'			, type: 'string'
		},{	name: 'crte_urif'			, type: 'string'
		},
	]
});