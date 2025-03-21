Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardOrderLister1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-order-lister1',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardOrderLister1',
	border		: 0 ,
	columnLines	: true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		:  [{ ptype:'gridcolumnmenu'  } ,{ ptype:'gridcolumnconfig'  } ], // grid의 columns 순서, 숨김 정보를 저장/복원하는 플러그인
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
					{	dataIndex: 'dvcd'			, text : Language.get('dvcd'		,'구분'			) ,width : 50, align : 'center'
					},{	dataIndex: 'today'			, text : Language.get('today'		,'당일'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: '1day_ago'		, text : Language.get('1day_ago'	,'1일전'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: '2day_ago'		, text : Language.get('2day_ago'	,'2일전'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: '3day_ago'		, text : Language.get('3day_ago'	,'3일전'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: '4day_ago'		, text : Language.get('4day_ago'	,'4일전'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: '5day_ago'		, text : Language.get('5day_ago'	,'5일전'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					},{	dataIndex: 'weak_ago'		, text : Language.get('weak_ago'	,'주간'			) ,flex : 1, minWidth : 60, xtype:'numericcolumn'
					}
				]
			}
		;
		return item;
	}
 });