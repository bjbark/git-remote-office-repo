Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardProdister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-prod-lister1',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardProdLister1',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  },{
        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    } ],	/**
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
				pagingButton : false,
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
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 120, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 100, align : 'left'
					},{	dataIndex: 'safe_stok'		, text : Language.get('safe_stok'		,'안전재고'		) , width : 80 , xtype : 'numericcolumn'
					},{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'현재고'		) , width : 80 , xtype : 'numericcolumn'
//					},{	dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'		,'주문잔량'		) , width : 80 , xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
 });