Ext.define('module.custom.iypkg.sale.order.sptsmast.view.SptsMastWorkerLister', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sptsmast-worker-lister',
	store: 'module.custom.iypkg.sale.order.sptsmast.store.SptsMastWorker',

	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
//					{	text : '<span class="write-button">출하계획작성</span>'	, action : 'orderAction'	, cls: 'button1-style'	} , '-',
					{ text : Const.UPDATE.text, iconCls : Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style'},
					{ text : Const.CANCEL.text, iconCls : Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style'}
				]
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'chk'				, width:  35, align : 'center'	, text: Language.get('chk'				, '선택'		), xtype:'checkcolumn',
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								rowIndexNum = rowindex;
								if(bool){
									record.set('plan_qntt',record.get('unostt'));
									me.cellEditAfter(element, record);
								}else{
									record.set('plan_qntt','0');
									me.cellEditAfter(element, record);
								}
							}
						}
					},{	dataIndex:	'invc_date'			, width:  90, align : 'center', text: Language.get( 'invc_date'		, '수주일자'		)
					},{	dataIndex:	'deli_date'			, width:  90, align : 'center', text: Language.get('deli_date'		, '납기일자'		)
					},{	dataIndex:	'cstm_name'			, width: 170, align : 'left'  , text: Language.get( 'cstm_name'		, '수주처명'		)
					},{	dataIndex:	'invc_numb'			, width: 90, align : 'center', text: Language.get( 'invc_numb'		, '수주번호'		)
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'  , text: Language.get( 'item_name'		, '품명'			)
					},{	dataIndex:	'spec'				, width: 120, align : 'left'  , text: Language.get( ''				, '상자규격'		)
					},{	dataIndex:	'acpt_qntt'			, width:  80, align : 'right' , text: Language.get( 'invc_qntt'		, '수주수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'ostt_qntt'			, width:  80, align : 'right' , text: Language.get( 'ostt_qntt'		, '출고수량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'unostt'			, width:  80, align : 'right' , text: Language.get( ''				, '미출고잔량'		), xtype: 'numericcolumn'
					},{	dataIndex:	'plan_qntt'			, width:  80, align : 'right' , text: Language.get( 'plan_qntt'		, '계획량'			), xtype: 'numericcolumn' , summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'lcal_name'			, width: 100, align : 'left', text: Language.get( 'lcal_name'		, '운송지역'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						}
					},{	dataIndex:	'cars_name'		, width: 120, align : 'left'    , text: Language.get( 'colr_name'	, '운송차량'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-car-popup',
									params:{
										stor_grp : _global.stor_grp, line_stat : '0'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('cars_name',parent.data.cars_alis);
											record.set('cars_idcd',parent.data.cars_idcd);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
//					},{	dataIndex:	''					, width:  80, align : 'center', text: Language.get( ''				, 'm2/총'		)
//					},{	dataIndex:	'pcod_numb'			, width: 150, align : 'left'  , text: Language.get( 'pcod_numb'		, 'P/O No'		)
					},{	dataIndex:	'dlvy_cstm_name'	, width: 200, align : 'left'  , text: Language.get( 'assi_cstm_idcd', '납품처명'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						}
					},{	dataIndex:	'user_memo'			, width: 150, align : 'left', text: Language.get( 'user_memo'		, '비고'		)
						, tdCls	: 'editingcolumn',
						editor	: {
						xtype		:'textfield',
						selectOnFocus: true,
						allowBlank	: false
						}
					}
				]
			};
		return item;
	},


	cellEditAfter  : function (editor, context) {
		var me			= this
		var a = this.getSelectionModel().getSelection()[0].data.acpt_qntt;		//수주량
		var b = this.getSelectionModel().getSelection()[0].data.plan_qntt;		//기납품수량
		var grid = this;
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var models = grid.getStore().getRange()
		;
		if(b > a){
			Ext.Msg.alert("알림", "계획량을 다시 입력해주십시오.");
			models[pos].set('plan_qntt',0);
		}

	},


	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}



 });
