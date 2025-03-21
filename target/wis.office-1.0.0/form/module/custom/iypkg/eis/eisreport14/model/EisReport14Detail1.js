Ext.define('module.custom.iypkg.eis.eisreport14.model.EisReport14Detail1',{ extend:'Axt.data.Model',
	fields : [
	    {	name: 'mon',				type: 'float'},		//invoice번호
		{	name: 'year', 				type: 'string' },		//계획년도
		{	name: 'user_name',			type: 'string'},	//사업장ID
		{	name: 'sw_code',			type: 'float'},		//작업지시번호
		{	name: 'dw_code',			type: 'float'},		//작업지시번호
		{	name: 'sum_code',			type: 'float'},		//작업지시번호
		{	name: 'sub',				type: 'float' },		//금액,수량,m2
		{	name: 'total',				type: 'float' },	//금액,수량,m2
		{	name: 'mm',					type: 'string'},		//1~12월
		{	name: 'offr_amnt',			type: 'float' },		//sw+dw 합계
		{	name: 'cstm_idcd',			type: 'string'},		//거래처id
		{	name: 'user_idcd',			type: 'string'},		//담당자id
		{	name: 'mn01_goal'			, type: 'float'  , defaultValue: '0'},		//1월목표
		{	name: 'mn02_goal'			, type: 'float'  , defaultValue: '0'},		//2월목표
		{	name: 'mn03_goal'			, type: 'float'  , defaultValue: '0'},		//3월목표
		{	name: 'mn04_goal'			, type: 'float'  , defaultValue: '0'},		//4월목표
		{	name: 'mn05_goal'			, type: 'float'  , defaultValue: '0'},		//5월목표
		{	name: 'mn06_goal'			, type: 'float'  , defaultValue: '0'},		//6월목표
		{	name: 'mn07_goal'			, type: 'float'  , defaultValue: '0'},		//7월목표
		{	name: 'mn08_goal'			, type: 'float'  , defaultValue: '0'},		//8월목표
		{	name: 'mn09_goal'			, type: 'float'  , defaultValue: '0'},		//9월목표
		{	name: 'mn10_goal'			, type: 'float'  , defaultValue: '0'},		//10월목표
		{	name: 'mn11_goal'			, type: 'float'  , defaultValue: '0'},		//11월목표
		{	name: 'mn12_goal'			, type: 'float'  , defaultValue: '0'},		//12월목표
		{	name: 'mn01_rslt'			, type: 'float'  , defaultValue: '0'},		//1월실적
		{	name: 'mn02_rslt'			, type: 'float'  , defaultValue: '0'},		//2월실적
		{	name: 'mn03_rslt'			, type: 'float'  , defaultValue: '0'},		//3월실적
		{	name: 'mn04_rslt'			, type: 'float'  , defaultValue: '0'},		//4월실적
		{	name: 'mn05_rslt'			, type: 'float'  , defaultValue: '0'},		//5월실적
		{	name: 'mn06_rslt'			, type: 'float'  , defaultValue: '0'},		//6월실적
		{	name: 'mn07_rslt'			, type: 'float'  , defaultValue: '0'},		//7월실적
		{	name: 'mn08_rslt'			, type: 'float'  , defaultValue: '0'},		//8월실적
		{	name: 'mn09_rslt'			, type: 'float'  , defaultValue: '0'},		//9월실적
		{	name: 'mn10_rslt'			, type: 'float'  , defaultValue: '0'},		//10월실적
		{	name: 'mn11_rslt'			, type: 'float'  , defaultValue: '0'},		//11월실적
		{	name: 'mn12_rslt'			, type: 'float'  , defaultValue: '0'},		//12월실적
		{	name: 'uper_seqn'			, type: 'float'  , defaultValue: '0'},		//상위순번
		{	name: 'disp_seqn'			, type: 'float'  , defaultValue: '0'},		//표시순번


		{	name: 'goalname'			, type: 'string' },		//월
		{	name: 'goal'				, type: 'float'  , defaultValue: '0'},		//목표합
		{	name: 'rslt'				, type: 'float'  , defaultValue: '0'},		//실적합
		{	name: 'percent'				, type: 'float'  , defaultValue: '0'},		//달성률
		{	name: 'data'				, type: 'float' },		//

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
