Ext.define('module.workshop.print.basic.mmbrmast.model.MmbrMast2',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'mmbr_idcd',			type: 'string'},		//회원ID
		{	name: 'line_seqn',			type: 'float '},		//순번
		{	name: 'dlvy_alis',			type: 'string'},		//배송별칭
		{	name: 'base_yorn',			type: 'string'},		//기본여부
		{	name: 'dlvy_zpcd',			type: 'string'},		//배송우편번호
		{	name: 'dlvy_addr_1fst',		type: 'string'},		//배송주소1
		{	name: 'dlvy_addr_2snd',		type: 'string'},		//배송주소2
		{	name: 'rctr_name',			type: 'string'},		//수취인명
		{	name: 'tele_numb',			type: 'string'},		//전화번호




		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'   , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string'  , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' , convert : Ext.util.Format.strToDateTime, serialize: Ext.util.Format.datetimeToStr},		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' , defaultValue : _global.login_pk},		//생성ID
		{	name: 'crte_urif'			, type: 'string' },		//생성UI

	]
});
