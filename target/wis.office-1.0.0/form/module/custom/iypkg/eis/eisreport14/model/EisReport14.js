Ext.define('module.custom.iypkg.eis.eisreport14.model.EisReport14',{ extend:'Axt.data.Model',
	fields : [
	    {	name: 'cstm_name',			type: 'string'},		//invoice번호
		{	name: 'year', 				type: 'string' },		//계획년도
		{	name: 'cstm_idcd',			type: 'string'},		//사업장ID
		{	name: 'user_name',			type: 'string'},		//사업장ID
		{	name: 'user_idcd',			type: 'string'},		//사업장ID
		{	name: 'sw_code',			type: 'float'},		//작업지시번호
		{	name: 'dw_code',			type: 'float'},		//작업지시번호
		{	name: 'sum_code',			type: 'float'},		//작업지시번호
		{	name: 'cstm_idcd',			type: 'string'},		//거래처id
		{	name: 'user_idcd',			type: 'string'},		//담당자id
		{	name: 'goal',				type: 'float' },		//목표
		{	name: 'rslt',				type: 'float' },		//실적금액
		{	name: 'name',			type: 'string' },		//담당자id
		{	name: 'data1',			type: 'float' },		//실적금액
		{	name: 'data2',				type: 'float' },		//달성율

		{	name: 'user_memo',			type: 'string'},		//사용자메모
		{	name: 'sysm_memo',			type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',			type: 'string'},		//부모ID
		{	name: 'line_levl',			type: 'float'  , defaultValue : 0 },		//ROW레벨
		{	name: 'line_ordr',			type: 'string'},		//ROW순서
		{	name: 'line_stat',			type: 'string' , defaultValue : '0'},		//ROW상태
		{	name: 'line_clos',			type: 'string'},		//ROW마감
		{	name: 'find_name',			type: 'string'},		//찾기명
		{	name: 'updt_user_name',		type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',			type: 'string'},		//수정IP
		{	name: 'updt_dttm',			type: 'string'},		//수정일시
		{	name: 'updt_idcd',			type: 'string'},		//수정ID
		{	name: 'updt_urif',			type: 'string'},		//수정UI
		{	name: 'crte_user_name',		type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',			type: 'string'},		//생성IP
		{	name: 'crte_dttm',			type: 'string'},		//생성일시
		{	name: 'crte_idcd',			type: 'string'},		//생성ID
		{	name: 'crte_urif',			type: 'string'},		//생성UI
	]
});
