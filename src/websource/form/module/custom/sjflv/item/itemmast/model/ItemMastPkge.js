Ext.define('module.custom.sjflv.item.itemmast.model.ItemMastPkge', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'pckg_bacd'			, type: 'string' },		//포장용기
		{	name: 'pckg_qntt'			, type: 'float ' , defaultValue : 0 },		//포장수량
		{	name: 'base_yorn'			, type: 'boolean' , convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt},		//기본값


		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' ,defaultValue:_global.login_pk},		//수정IP
		{	name: 'updt_dttm'			, type: 'string' },		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' ,defaultValue:_global.login_pk},		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI
	]
});

