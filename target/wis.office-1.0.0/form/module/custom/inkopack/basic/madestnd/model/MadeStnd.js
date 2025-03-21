Ext.define('module.custom.inkopack.basic.madestnd.model.MadeStnd', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'item_name'			, type: 'string' },		//품명
		{	name: 'item_code'			, type: 'string' },		//품목코드
		{	name: 'item_spec'			, type: 'string' },		//품목규격
		{	name: 'spec_horz'			, type: 'float' },		//규격가로
		{	name: 'spec_vrtl'			, type: 'float' },		//규격세로
		{	name: 'spec_tick'			, type: 'float' },		//규격두께
		{	name: 'bath_qntt'			, type: 'int' },		//batch 수량
		{	name: 'colr_ccnt'			, type: 'int' },		//컬러도수
		{	name: 'liqu_type'			, type: 'string' },		//액형
		{	name: 'fabc_widh'			, type: 'float' },		//원단폭
		{	name: 'proc_bacd'			, type: 'string' },		//가공분류코드
		{	name: 'roll_perc_poch'		, type: 'int' },		//ROLL당파우치
		{	name: 'ygls_tick'			, type: 'float' },		//유광두께
		{	name: 'ngls_tick'			, type: 'float' },		//무광두께
		{	name: 'nutc_valu'			, type: 'string'},	//넛찌값
		{	name: 'sgsp_sccs_yorn'		, type: 'boolean'},	//분리배출여부
		{	name: 'rond_yorn'			, type: 'boolean'},	//라운드여부
		{	name: 'zipr_yorn'			, type: 'boolean'},	//지퍼여부
		{	name: 'hole_yorn'			, type: 'boolean'},	//타공여부
		{	name: 'stnd_yorn'			, type: 'boolean'},	//스탠드여부
		{	name: 'uppr_open_yorn'		, type: 'boolean'},	//상단오픈여부
		{	name: 'lwrp_open_yorn'		, type: 'boolean'},	//하단오픈여부
		{	name: 'left_open_yorn'		, type: 'boolean'},	//좌측오픈여부
		{	name: 'righ_open_yorn'		, type: 'boolean'},	//우측오픈여부
		{	name: 'poch_wdth'			, type: 'float' },		//파우치넓이
		{	name: 'poch_hght'			, type: 'float' },		//파우치높이
		{	name: 'poch_tick'			, type: 'float' },		//파우치두께
		{	name: 'item_tick'			, type: 'float' },		//품목두께
		{	name: 'real_item_tick'		, type: 'float' },		//실품목두께
		{	name: 'proc_name'			, type: 'string' },		//가공분류이름
		{	name: 'user_memo'			, type: 'string' },		//사용자메모
		{	name: 'sysm_memo'			, type: 'string' },		//시스템메모
		{	name: 'prnt_idcd'			, type: 'string' },		//부모ID
		{	name: 'line_levl'			, type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr'			, type: 'string' },		//ROW순서
		{	name: 'line_stat'			, type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos'			, type: 'string' },		//ROW마감
		{	name: 'find_name'			, type: 'string' },		//찾기명
		{	name: 'updt_user_name'		, type: 'string' },		//수정사용자명
		{	name: 'updt_ipad'			, type: 'string' },		//수정IP
		{	name: 'updt_dttm'			, type: 'string' },		//수정일시
		{	name: 'updt_idcd'			, type: 'string' },		//수정ID
		{	name: 'updt_urif'			, type: 'string' },		//수정UI
		{	name: 'crte_user_name'		, type: 'string' },		//생성사용자명
		{	name: 'crte_ipad'			, type: 'string' },		//생성IP
		{	name: 'crte_dttm'			, type: 'string' },		//생성일시
		{	name: 'crte_idcd'			, type: 'string' },		//생성ID
	]
});

