Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster3', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-sjflv-oemmast-lister-master3',
	store		: 'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster3',
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	features	: [{  ftype: 'grid-summary' } ],
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },


	border : 0  ,
	title  : Language.get('','배합기준'),

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'	},
					{	text : Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'	},
				]
			}
		;
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this, item =
		{
			defaults: {style: 'text-align:center'},
			items	: [
				{	text : Language.get('acct_name'		, '계정구분'	) , dataIndex: 'acct_name'	, width : 70	, align : 'center'
				},{	text : Language.get('acct_bacd'		, '계정분류코드' ) , dataIndex: 'acct_bacd'	, width : 70 	, align : 'center'	, hidden: true
				},{	text : Language.get('item_code'		, '품목코드'	) , dataIndex: 'item_code'	, width : 90 	, align : 'center'
				},{	text : Language.get('item_name'		, '품명'		) , dataIndex: 'item_name'	, width : 180
				},{	text : Language.get('item_spec'		, '규격'		) , dataIndex: 'item_spec'	, width : 130
				},{	text : Language.get('mixx_rate'		, '배합비(%)'	) , dataIndex: 'mixx_rate'	, width : 75	, xtype: 'numericcolumn', //summaryType: 'sum' ,
				},{	text : Language.get(''				, '출고량'		) , dataIndex: 'os_qntt'	, width : 65 	, format: '#,##0.####', align : 'right'
				},{	text : Language.get(''				, '미납잔량'	) , dataIndex: 'need_qntt'	, width : 65 	, format: '#,##0.####',		summaryType: 'sum' , align : 'center',
					renderer : function(a, b, record){
						var master = Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master')[0].getSelectionModel().getSelection()[0];
						return parseFloat((master.data.invc_qntt * (record.data.mixx_rate/100)-record.data.os_qntt).toFixed(3));
					}
				},{	text : Language.get('ostt_qntt'			, '수량'	) 	, dataIndex: 'ostt_qntt'	, width : 60	, align : 'right'	,
					tdCls 	: 'editingcolumn',
					editor	: {
						xtype		:'textfield',
						selectOnFocus: true,
						allowBlank	: false
					}
				},{	text : Language.get(''			, 'batch'	)	, dataIndex: 'lott_numb'	, width : 130
				},{ xtype	: 'actioncolumn',
					tdCls	: 'editingcolumn',
					editable: true,
					enableKeyEvents : true,
					width	: 20,
					align	: 'center',
					items	: [
						{	iconCls	: Const.SELECT.icon,
							handler	: function (grid, rowIndex, colIndex, item, e, record) {
								if(record.get('ostt_qntt')>0){
									resource.loadPopup({
										select	: 'MULTI',
										widget	: 'lookup-lott-popup',
										title	: 'Batch No 찾기',
										params : {
											stor_grp		: _global.stor_grp ,
											line_stat		: '0',
											item_idcd		: record.get('item_idcd'),
											stok_type_dvcd 	: '1',
											dvcd			: '1',
											qntt			: record.get('ostt_qntt')
										},
										result : function(records) {
											var	parent = records[0];
											var rtnLottNumb = "" ;
											record.set('lott_numb',parent.data.lott_numb);
											Ext.each(records, function(record) {
												if (rtnLottNumb.length > 0) {
													rtnLottNumb += ",";
												}
												rtnLottNumb += record.get("lott_numb");
											});
											record.set('lott_numb',rtnLottNumb);
										}
									})
								}else{
									Ext.Msg.alert('알림','출고수량이 없습니다.');
								}
							},
							scope : me
						}
					]
				},{	text : Language.get(''			, '창고명'	)	, dataIndex: 'wrhs_name'	, width : 100
				},{ xtype	: 'actioncolumn',
					tdCls	: 'editingcolumn',
					editable: true,
					enableKeyEvents : true,
					width	: 20,
					align	: 'center',
					items	: [
						{	iconCls	: Const.SELECT.icon,
							handler	: function (grid, rowIndex, colIndex, item, e, record) {
								if(record.get('ostt_qntt')>0){
									resource.loadPopup({
										select	: 'MULTI',
										widget	: 'lookup-wrhs-popup',
										title	: '창고 찾기',
										params : {
											stor_grp		: _global.stor_grp ,
											line_stat		: '0',
										},
										result : function(records) {
											record.set('wrhs_name', records[0].data.wrhs_name);
											record.set('wrhs_idcd', records[0].data.wrhs_idcd);
										}
									})
								}else{
									Ext.Msg.alert('알림','출고수량이 없습니다.');
								}
							},
							scope : me
						}
					]
				},{	text : Language.get('wrhs_idcd'	, '창고'	) , dataIndex: 'wrhs_idcd'	, width : 100	, hidden: true
				},{	text : Language.get('invc_numb', '수주번호'	) , dataIndex: 'invc_numb'	, hidden: true
				},{	dataIndex:	'invc_date'		, width: 90, align : 'center' , text: Language.get( 'invc_date'	, '출고일자'),
					tdCls	: 'editingcolumn',
					editor	: {
						xtype		:'datefield',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
										index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
									grid.plugins[0].startEdit(row,grid.columns[index]);
								}
							}
						}
					},
					renderer:function(val){
						a =Ext.util.Format.strToDate(val);
						return a;
					}
				}
			]
		};
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
	},

});





