Ext.define('module.custom.inkopack.cost.stndcostwork.view.StndCostWorkLister', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-stndcostwork-lister',
	store		: 'module.custom.inkopack.cost.stndcostwork.store.StndCostWork',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnconfig'  } ], // grid의 columns 순서, 숨김 정보를 저장/복원하는 플러그인

	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },

	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent : function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 * 그리드 하단의 페이징 툴바 및 액션버튼을 등록한다.
	 */
	pagingItem : function () {
		var	me = this,
			item = {
				xtype	: 'grid-paging',
				itemId	: 'mainbutton',
				items	: [
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action,cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action,cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action,cls: 'button-style' } ,
					'-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action,cls: 'button-style' }
				]
			}
		;
		return item ;
	},

	/**
	 * 그리드 컬럼 내용 등록
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'} ,
				items	: [
					{	dataIndex	: 'cost_larg_name'	, text	: Language.get('cost_larg_name' ,	'원가 대분류'		) , width : 100	,align : 'left'
					},{	dataIndex	: 'cost_midl_name'	, text	: Language.get('cost_midl_name' ,	'원가 중분류'		) , width : 100	,align : 'left'
					},{	dataIndex	: 'mtrl_item_name'	, text	: Language.get('mtrl_item_name' ,	'자재품명'		) , flex  : 1	,align : 'left'
					},{	dataIndex	: 'mtrl_spec'		, text	: Language.get('mtrl_spec' ,		'자재규격'		) , flex  : 1	,align : 'left'
					},{	dataIndex	: 'item_tick'		, text	: Language.get('item_tick' ,		'품목두께'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'item_leng'		, text	: Language.get('item_leng' ,		'품목길이'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'item_widh'		, text	: Language.get('item_widh' ,		'품목폭'			) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'item_spgr'		, text	: Language.get('item_spgr' ,		'품목비중'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'prnt_ccnt'		, text	: Language.get('prnt_ccnt' ,		'인쇄도수'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'need_qntt'		, text	: Language.get('need_qntt' ,		'소요수량'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'cost_adpt_dvcd'	, text	: Language.get('cost_adpt_dvcd' ,	'원가적용구분'	) , width : 100	,align : 'center',	xtype : 'lookupcolumn' ,lookupValue	: resource.lookup('cost_adpt_dvcd')
					},{	dataIndex	: 'stnd_pric'		, text	: Language.get('stnd_pric' ,		'표준단가'		) , width : 100	,align : 'right',	xtype : 'numericcolumn'
					},{	dataIndex	: 'user_memo'		, text	: Language.get('user_memo' ,		'비고'			) , flex  : 1	,align : 'left'
					},{	dataIndex	: 'line_seqn'		, text	: Language.get('line_seqn' ,		'순번'			) , width : 50	,align : 'right',	xtype : 'numericcolumn' , hidden : true
					},{	dataIndex	: 'cost_type_bacd'	, text	: Language.get('cost_type_bacd' ,	'원가타입코드'	) , width : 100	,align : 'left',	xtype : 'lookupcolumn' ,lookupValue	: resource.getList('cost_type_bacd'), hidden : true
					}
				]
			}
		;
		return item;
	}
 });