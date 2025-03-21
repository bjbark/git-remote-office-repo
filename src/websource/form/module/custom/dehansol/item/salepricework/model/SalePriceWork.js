Ext.define('module.custom.dehansol.item.salepricework.model.SalePriceWork',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd',				type: 'string'},		//tool코드
		{	name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr  },	//등록일자
		{	name: 'cstm_idcd',				type: 'string'},		//거래처id
		{	name: 'item_make_dvcd',			type: 'string'},		//품목제조구분코드
		{	name: 'item_type_dvcd',			type: 'string'},		//품목형태구분코드
		{	name: 'mesh_name',				type: 'string'},		//망사명
		{	name: 'diag_sqre',				type: 'string'},		//대각평각
		{	name: 'item_spec',				type: 'string'},		//품목규격
		{	name: 'plmk_size_horz',			type: 'float'},			//제판사이즈 가로
		{	name: 'plmk_size_vrtl',			type: 'float'},			//제판사이즈 세로
		{	name: 'dict_yorn',				type: 'string'},		//다이렉트 여부
		{	name: 'unit_idcd',				type: 'string'},		//단위 ID
		{	name: 'mesh_ndqt',				type: 'float'},			//망사소요량
		{	name: 'sale_pric',				type: 'float'},			//판매단가
		{	name: 'cstm_name',				type: 'string'},		//거래처명
		{	name: 'unit_name',				type: 'string'},		//단위명

		{	name: 'user_memo',				type: 'string'},		//사용자메모
		{	name: 'sysm_memo',				type: 'string'},		//시스템메모
		{	name: 'prnt_idcd',				type: 'string'},		//부모ID
		{	name: 'line_levl',				type: 'float'  , defaultValue: '0'},		//ROW레벨
		{	name: 'line_ordr',				type: 'string'},		//ROW순서
		{	name: 'line_stat',				type: 'string' , defaultValue: '0'},		//ROW상태
		{	name: 'line_clos',				type: 'string'},		//ROW마감
		{	name: 'find_name',				type: 'string'},		//찾기명
		{	name: 'updt_user_name',			type: 'string'},		//수정사용자명
		{	name: 'updt_ipad',				type: 'string'},		//수정IP
		{	name: 'updt_dttm',				type: 'string'},		//수정일시
		{	name: 'updt_idcd',				type: 'string'},		//수정ID
		{	name: 'updt_urif',				type: 'string'},		//수정UI
		{	name: 'crte_user_name',			type: 'string'},		//생성사용자명
		{	name: 'crte_ipad',				type: 'string'},		//생성IP
		{	name: 'crte_dttm',				type: 'string'},		//생성일시
		{	name: 'crte_idcd',				type: 'string'},		//생성ID
		{	name: 'crte_urif',				type: 'string'},		//생성UI
		{	name: 'stok_mngt_yorn',			type: 'string'},		//재고관리여부
	]
});
