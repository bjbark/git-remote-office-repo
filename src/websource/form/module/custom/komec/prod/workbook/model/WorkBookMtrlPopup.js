Ext.define('module.custom.komec.prod.workbook.model.WorkBookMtrlPopup',{ extend:'Axt.data.Model',
	fields : [
		{	name : 'invc_numb'			, type : 'string'
		},{	name : 'line_seqn'			, type : 'float'
		},{	name : 'lott_numb'			, type : 'string'
		},{	name : 'istt_date'			, type : 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name : 'item_idcd'			, type : 'string'
		},{	name : 'item_code'			, type : 'string'
		},{	name : 'item_name'			, type : 'string'
		},{	name : 'stok_qntt'			, type : 'float '
		},{	name : 'ivst_qntt'			, type : 'float ', defaultValue:'0'
		},{	name : 'wkct_idcd'			, type : 'string'
		},{	name : 'wkct_name'			, type : 'string'
		},{	name : 'wkod_numb'			, type : 'string'
		},{	name : 'wkod_seqn'			, type : 'float'
		},{	name : 'bzpl_idcd'			, type : 'string'
		},{	name : 'wrsh_idcd'			, type : 'string'
		},{	name : 'stor_id'			, type : 'string',defaultValue:_global.stor_id
		},{	name : 'drtr_idcd'			, type : 'string',defaultValue:_global.login_pk
		},{	name : 'unit_idcd'			, type : 'string'
		},


		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'float', defaultValue: '0'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string',defaultValue:_global.login_pk},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string',defaultValue:_global.login_pk},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
	]
});
