Ext.define('module.custom.sjflv.item.mtrlsubslist.model.MtrlSubsList',{ extend:'Axt.data.Model',
	fields:
	[
		{name: 'invc_numb',				type: 'string'},		//INVOICE번호
		{name: 'item_idcd',				type: 'string'},		//자재IDS
		{name: 'item_code',				type: 'string'},		//자재코드
		{name: 'item_name',				type: 'string'},		//자재명
		{name: 'item_spec',				type: 'string'},		//규격
		{name: 'befr_splr_name',		type: 'string'},		//기존공급사
		{name: 'befr_mker_name',		type: 'string'},		//기존 제조사
		{name: 'splr_name',				type: 'string'},		//대치 공급사
		{name: 'mker_name',				type: 'string'},		//대치 제조사
		{name: 'usag_qntt_memo',		type: 'string'},		//사용량
		{name: 'ecod_purp',				type: 'string'},		//Test 목적
		{name: 'test_drtr_name',		type: 'string'},		//실험자
		{name: 'hala_yorn',				type: 'string'},		//할랄여부
		{name: 'fema',					type: 'string'},		//fema
		{name: 'mtrl_sbzt_dvcd',		type: 'string'},		//대치유형
		{name: 'test_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//실험날짜
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
