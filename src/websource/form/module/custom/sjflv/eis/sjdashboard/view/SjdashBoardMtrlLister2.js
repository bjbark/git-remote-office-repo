Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister2', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-mtrl-lister2',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister2',
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
					{	dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'		) , width : 100, align : 'center'
					},{	dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'			) , width : 200, align : 'left'
					},{	dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			) , width : 100, align : 'left'
					},{	dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'Batch No'		) , width : 120, align : 'left'
					},{	dataIndex: 'istt_date'		, text : Language.get('istt_date'		,'입고일자'		) , width : 80, align : 'center'
					},{	dataIndex: 'rtil_ddln_date'	, text : Language.get('rtil_ddln_date'	,'유통기한'		) , width : 80, align : 'center'
					},{	dataIndex: 'stok_qntt'		, text : Language.get('stok_qntt'		,'현재고'			) , width : 71, align : 'right',xtype : 'numericcolumn'
					},{	dataIndex: 'istt_qntt'		, text : Language.get('istt_qntt'		,'입고수량'		) , width : 71, align : 'right',xtype : 'numericcolumn'
					}
				]
			}
		;
		return item;
	}
 });