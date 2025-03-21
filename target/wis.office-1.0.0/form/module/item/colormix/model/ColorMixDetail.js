Ext.define('module.item.colormix.model.ColorMixDetail',{ extend:'Axt.data.Model',
	fields : [
		{name: 'prnt_item_idcd',		type: 'string'},		//부모품목id
		{name: 'prnt_item_code',		type: 'string'},		//부모품목id
		{name: 'prnt_item_name',		type: 'string'},		//부모품목id
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'chge_degr',				type: 'float' },		//차수
		{name: 'item_idcd',				type: 'string'} ,		//품목id
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'unit_perc_wigt',		type: 'float' },		//단위당중량
		{name: 'wigt_unit',				type: 'string'},		//중량단위
		{name: 'colr_bacd',				type: 'string'},		//컬러분류코드
		{name: 'colr_name',				type: 'string'},		//컬러명
		{name: 'chge_degr',				type: 'float' , defaultValue: 1},		//차수
		{name: 'item_idcd',				type: 'string'},		//품목ID
		{name: 'item_name',				type: 'string'},		//품명
		{name: 'unit_perc_wigt',		type: 'float' },		//단위당중량
		{name: 'wigt_unit',				type: 'string'},		//중량단위
		{name: 'need_time',				type: 'string'} ,		//소요시간
		{name: 'dwup_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } ,		//작성일자

		{name: 'prnt_item_idcd',		type: 'string'},		//부모품목id
		{name: 'prnt_item_code',		type: 'string'},		//부모품목id
		{name: 'prnt_item_name',		type: 'string'},		//부모품목id
		{name: 'line_seqn',				type: 'float' },		//순번
		{name: 'detail_chge_degr',		type: 'float' },		//차수
		{name: 'detail_item_idcd',		type: 'string'} ,		//품목id
		{name: 'detail_item_name',		type: 'string'},		//품명
		{name: 'detail_unit_perc_wigt',	type: 'float' },		//단위당중량
		{name: 'detail_wigt_unit',		type: 'string'},		//중량단위

		{name: 'user_memo',				type: 'string'},		//사용자메모
		{name: 'sysm_memo',				type: 'string'},		//시스템메모
		{name: 'prnt_idcd',				type: 'string'},		//부모ID
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
