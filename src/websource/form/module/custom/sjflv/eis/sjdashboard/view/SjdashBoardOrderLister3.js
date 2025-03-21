Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderLister3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-order-lister3',
//	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister3',
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
					{	dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width :  80, align : 'left'
					},{	dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'		) , width : 120, align : 'left'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 120, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 100, align : 'left'
					},{	dataIndex: 'invc_qntt'		, text : Language.get('invc_qntt'		,'주문수량'		) , width :  80, align : 'right',xtype : 'numericcolumn'
					},{	dataIndex: 'user_name'		, text : Language.get('user_name'		,'영업담당'		) , width :  80, align : 'left'
					}
				]
			}
		;
		return item;
	}
 });