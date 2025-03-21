Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardMtrlLister4', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjdashboard-mtrl-lister4',
	store		: 'module.custom.sjflv.eis.sjdashboard.store.SjdashBoardMtrlLister4',
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
				     	   '->',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
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
					{	dataIndex: 'dvcd'		, width : 75  , align : 'center' , text : Language.get('dvcd'		,'구분'		)
					},{	dataIndex: 'cstm_name'	, width : 100 , align : 'left'   , text : Language.get('deli_date'	,'거래처명'		)
					},{	dataIndex: 'item_code'	, width : 85  , align : 'center' , text : Language.get('item_code'	,'품목코드'		)
					},{	dataIndex: 'item_name'	, width : 190 , align : 'left'   , text : Language.get('item_name'	,'품명'		)
					},{	dataIndex: 'item_spec'	, width : 130 , align : 'left'   , text : Language.get('item_spec'	,'규격'		)
					},{	dataIndex: 'unit_name'	, width : 50  , align : 'center' , text : Language.get('unit_name'	,'단위'		)
					},{	dataIndex: 'istt_qntt'	, width : 65  , align : 'right'  , text : Language.get('istt_qntt'	,'입고수량'		),xtype : 'numericcolumn'

					},{	dataIndex:	'lott_numb'	, width: 120  , align : 'left'   , text: Language.get( 'lott_numb'	,'Batch No'	)
					},{	dataIndex:	'make_natn'	, width: 100  , align : 'left'   , text: Language.get( 'make_natn'	,'제조국'		)
					},{	dataIndex:	'make_date'	, width: 100  , align : 'center' , text: Language.get( 'make_date'	,'제조일자'		),
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						}
					},{	dataIndex:	'rtil_ddln_date'	, width: 100, align : 'center' , text: Language.get( 'rtil_ddln_date'	, '유통기한'	),
						renderer:function(val){
							var a = null;
							if(val){
								if(val.match(/[^0-9]/)){
									var date1 = new Date(val);
										date2 = Ext.Date.format(date1,'Y-m-d'),
										a = date2
									;
								}else{
									a = val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
								}
							}
							return a;
						}
//					},{	dataIndex: 'qntt'	, width : 75   , align : 'right'  , text : Language.get('unpaid'	,'수량'		), xtype : 'numericcolumn'
					},{	dataIndex: 'remk_text', flex : 1   , align : 'left'   , text : Language.get('remk_text'	,'비고'		),
					}
				]
			}
		;
		return item;
	}
 });