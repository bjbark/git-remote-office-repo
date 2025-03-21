Ext.define('module.membership.fee.feereport1.model.FeeReport1Master', { extend:'Axt.data.Model',
	fields: [
 		{	name: 'acce_date'		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr },
		{	name: 'cash_amnt'		, type: 'float'   , defaultValue: '0'},
		{	name: 'card_amnt'		, type: 'float'   , defaultValue: '0'},
		{	name: 'bank_amnt'		, type: 'float'   , defaultValue: '0'},
		{	name: 'etcc_amnt'		, type: 'float'   , defaultValue: '0'},
		{	name: 'totl_amnt'		, type: 'float'   , defaultValue: '0'},
		{	name: 'line_levl'		, type: 'float'   , defaultValue: '0'},
		{	name: 'line_ordr'		, type: 'string' },		//ROW순서
		{	name: 'line_stat'		, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'		, type: 'string' },		//ROW마감
		{	name: 'find_name'		, type: 'string' },		//찾기명
		{	name: 'updt_user_name'	, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'		, type: 'string' },		//수정IP
		{	name: 'updt_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'		, type: 'string' },		//수정ID
		{	name: 'updt_urif'		, type: 'string' },		//수정UI
		{	name: 'crte_user_name'	, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'		, type: 'string' },		//생성IP
		{	name: 'crte_dttm'		, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//생성일시
		{	name: 'crte_idcd'		, type: 'string' },		//생성ID
		{	name: 'crte_urif'		, type: 'string' },		//생성UI

	]
});

