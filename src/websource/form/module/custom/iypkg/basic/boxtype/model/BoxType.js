Ext.define('module.custom.iypkg.basic.boxtype.model.BoxType', { extend:'Axt.data.Model',
	fields: [
		{	name: 'bxty_idcd'		, type: 'string' },		//박스형식id
		{	name: 'bxty_name'		, type: 'string' },		//박스형식명
		{	name: 'scre_dvcd'		, type: 'string' },		//스코어구분코드
		{	name: 'fabc_ttln_calc'	, type: 'string' },		//원단총장계산식
		{	name: 'mxm2_gath'		, type: 'float' },		//제곱미터집합
		{	name: 'offr_gath'		, type: 'float' },		//발주집합
		{	name: 'fabc_ttwd_calc'	, type: 'string' },		//원단총폭계산식
		{	name: 'sgam_relx'		, type: 'float' },		//외날개여유
		{	name: 'mxm2_fdat_loss'	, type: 'float' },		//제곱미터재단LOSS
		{	name: 'offr_fdat_loss'	, type: 'float' },		//발주재단LOSS
		{	name: 'scre_calc_1fst'	, type: 'string' },		//스코어계산식1
		{	name: 'scre_calc_2snd'	, type: 'string' },		//스코어계산식2
		{	name: 'scre_calc_3trd'	, type: 'string' },		//스코어계산식3
		{	name: 'scre_calc_4frt'	, type: 'string' },		//스코어계산식4
		{	name: 'scre_calc_5fit'	, type: 'string' },		//스코어계산식5
		{	name: 'scre_calc'		, type: 'string' },		//스코어계산식
		{	name: 'tsum_ttln_calc'	, type: 'string' },		//2합총장계산식
		{	name: 'tsum_stnd'		, type: 'float' },		//2합기준
		{	name: 'mxm2_tsum'		, type: 'float' },		//제곱미터2합
		{	name: 'offr_tsum'		, type: 'float' },		//발주2합
		{	name: 'minm_leng'		, type: 'float' },		//최소길이
		{	name: 'maxm_leng'		, type: 'float' },		//최대길이
		{	name: 'minm_widh'		, type: 'float' },		//최소폭
		{	name: 'maxm_widh'		, type: 'float' },		//최대폭
		{	name: 'bxty_leng'		, type: 'float' },		//박스형식길이
		{	name: 'bxty_widh'		, type: 'float' },		//박스형식폭
		{	name: 'bxty_hght'		, type: 'float' },		//박스형식높이
		{	name: 'remk_text'		, type: 'string' },		//비고
		{	name: 'bxty_imge'		, type: 'string' },		//박스형식이미지
		{	name: 'bxty_imge_name'	, type: 'string' },		//박스형식이미지명
		{	name: 'bxty_code'		, type: 'string' },		//형식코드
		{	name: 'modify'			, type: 'string' },		//수정여부
		{	name: 'user_memo'		, type: 'string' },		//수정여부
		{	name: 'imge_chek1'		, type: 'string' },		//이미지체크

		{	name: 'line_stat'		, type: 'string' },		//상태
	]
});

