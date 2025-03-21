Ext.define('module.custom.iypkg.eis.eisreport13.model.EisReport13Detail2',{ extend:'Axt.data.Model',
	fields : [
		{	name: 'plan_year'			, type: 'string' },		//계획년도
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'cstm_name'			, type: 'string' },		//거래처명
		{	name: 'drtr_idcd'			, type: 'string' },		//담당자ID
		{	name: 'user_idcd'			, type: 'string' },		//담당자명
		{	name: 'user_name'			, type: 'string' },		//담당자명
		{	name: 'sale_plan_dvcd'		, type: 'string' },		//영업계획구분코드
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
	]
});
