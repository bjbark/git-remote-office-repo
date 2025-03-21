Ext.define('module.basic.hldymast.model.HldyMast', { extend:'Axt.data.Model',
	fields: [
		{name: 'bzpl_idcd',				type: 'string'},
		{name: 'bzpl_name',				type: 'string'},
		{name: 'hldy_date',				type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,
		{name: 'dywk_dvcd',				type: 'string'},
		{name: 'hldy_type_dvcd',		type: 'string'},
		{name: 'hldy_name',				type: 'string'},
		{name: 'stnd_hldy_yorn',		type: 'string' , defaultValue: '1'},
		{name: 'remk_text',				type: 'string'},
		{name: 'user_memo',				type: 'string'},
		{name: 'sysm_memo',				type: 'string'},
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},	//ROW레벨
		{name: 'line_ordr',				type: 'string'},		//ROW순서
		{name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{name: 'line_clos',				type: 'string'},		//ROW마감
		{name: 'find_name',				type: 'string'},		//찾기명
		{name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{name: 'updt_ipad',				type: 'string'},		//수정IP
		{name: 'updt_dttm',				type: 'string'},		//수정일시
		{name: 'updt_idcd',				type: 'string'},		//수정ID
		{name: 'updt_urif',				type: 'string'},		//수정UI
		{name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{name: 'crte_ipad',				type: 'string'},		//생성IP
		{name: 'crte_dttm',				type: 'string'},		//생성일시
		{name: 'crte_idcd',				type: 'string'},		//생성ID
		{name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
