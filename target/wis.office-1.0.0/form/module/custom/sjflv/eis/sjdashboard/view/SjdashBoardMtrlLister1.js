Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-mtrl-lister1',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister1',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnconfig'  } ], // grid의 columns 순서, 숨김 정보를 저장/복원하는 플러그인
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
					{	dataIndex: 'item_code'	, text : Language.get('line_clos'			,'품목코드'		) , width : 100, align : 'center'
					},{	dataIndex: 'item_name'	, text : Language.get('acpt_stat_dvcd'		,'품명'			) , width : 200, align : 'left'
					},{	dataIndex: 'item_spec'	, text : Language.get('acpt_stat_dvcd'		,'규격'			) , width : 150, align : 'left'
					},{	dataIndex: 'unit_name'	, text : Language.get('acpt_stat_dvcd'		,'단위'			) , width : 50, align : 'center'
					},{	dataIndex: 'safe_stok'	, text : Language.get('acpt_stat_dvcd'		,'안전재고'		) , width : 70, align : 'right',xtype : 'numericcolumn'
					},{	dataIndex: 'stok_qntt'	, text : Language.get('acpt_stat_dvcd'		,'현재고'			) , width : 70, align : 'right',xtype : 'numericcolumn'
//					},{	dataIndex: 'acpt_stat_dvcd'	, text : Language.get('acpt_stat_dvcd'		,'발주잔량'	) , width : 80, align : 'right',xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
 });