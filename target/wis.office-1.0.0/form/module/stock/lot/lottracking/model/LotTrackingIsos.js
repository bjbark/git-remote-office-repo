Ext.define('module.stock.lot.lottracking.model.LotTrackingIsos',{ extend:'Axt.data.Model',
	fields: [
		{name: 'isos_dvcd',				type: 'string'},		//
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'wrhs_idcd',				type: 'string'},		//
		{name: 'item_idcd',				type: 'string'},		//
		{name: 'lott_numb',				type: 'string'},		//
		{name: 'full_invc_numb',		type: 'string'},		//
		{name: 'isos_evi',				type: 'string'},		//
		{name: 'wrhs_name',				type: 'string'},		//
		{name: 'qntt',					type: 'float '},		//
		{name: 'acct_bacd_name',		type: 'string'},		//


		{name: 'user_memo',				type: 'string'},		//
		{name: 'sysm_memo',				type: 'string'},		//
		{name: 'prnt_idcd',				type: 'string'},		//
		{name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
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
