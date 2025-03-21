Ext.define('module.custom.iypkg.stock.isos.isttwork3.view.IsttWork3Lister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-isttwork3-lister',
	store		: 'module.custom.iypkg.stock.isos.isttwork3.store.IsttWork3Lister',
	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me     = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	viewConfig: {
		getRowClass : function ( record , index ) {
			if(record.get('invc_date') == '합계' || record.get('invc_date').length < 8){
				return 'text-warn';
			}else if(record.get('fabc_name') == '일계'){
				return 'text-blue';
			}else if(record.get('rnum') == '2'){
				return 'text-green';
			}
		}
	},

	pagingItem : function () {
		var  me   = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					'-',
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style'},
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'},
				]
			};
		return item ;
	},

	columnItem : function () {
		var me   = this,
			item =  {
				defaults: {style: 'text-align:center'},
				items   : [
					{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get( 'invc_date'		, '입고일자'	)
					},{	dataIndex:	'cstm_name'			, width: 160, align : 'left'	, text: Language.get( 'cstm_name'		, '입고처명'	)
					},{	dataIndex:	'prod_name'			, width: 230, align : 'left'	, text: Language.get( 'prod_name'		, '품명'		)
					},{	dataIndex:	'istt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'istt_qntt'		, '입고량'	), xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								focus:function(a,b,c,d){
									var grid = this.up('grid');
									var idx = grid.getSelectionModel (). getSelection ()[0];
									rowIndexNum = grid.getStore().indexOf(idx);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.TAB || e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								},
							},
						},
					},{	dataIndex:	'subt_qntt'			, width:  60, align : 'right'	, text: Language.get( 'subt_qntt'		, '감량'		), xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								focus:function(a,b,c,d){
									var grid = this.up('grid');
									var idx = grid.getSelectionModel (). getSelection ()[0];
									rowIndexNum = grid.getStore().indexOf(idx);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.TAB || e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								},
							},
						},
					},{	dataIndex:	'pqty_pric'			, width:  80, align : 'right'	, text: Language.get( 'pqty_pric'		, '단가/개'	), xtype : 'numericcolumn'
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								focus:function(a,b,c,d){
									var grid = this.up('grid');
									var idx = grid.getSelectionModel (). getSelection ()[0];
									rowIndexNum = grid.getStore().indexOf(idx);
								},
								keydown : function(self, e) {
									if (e.keyCode == e.TAB || e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								},
							},
						},
					},{	dataIndex:	'istt_amnt'			, width:  80, align : 'right'	, text: Language.get( 'istt_amnt'		, '공급가액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'istt_vatx'			, width:  80, align : 'right'	, text: Language.get( 'istt_vatx'		, '부가세'		), xtype : 'numericcolumn'
					},{	dataIndex:	'ttsm_amnt'			, width:  80, align : 'right'	, text: Language.get( 'ttsm_amnt'		, '합계금액'	), xtype : 'numericcolumn'
					},{	dataIndex:	'acpt_cstm_name'	, width: 160, align : 'left'	, text: Language.get( 'acpt_cstm_name'	, '수주처명'	)
					}
				]
			};
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;
		var grid		= this;
		var unistt		= grid.getStore().getAt(rowIndexNum).get('unistt');		//미입고잔량
		var qntt		= grid.getStore().getAt(rowIndexNum).get('istt_qntt');	//입고할수량
		var pric		= grid.getStore().getAt(rowIndexNum).get('pqty_pric');	//개당단가

		var amnt		= Math.floor(qntt*pric);		//공급가
		var vatx		= Math.floor((qntt*pric)*0.1);	//부가세
		var ttsm		= amnt+vatx;					//합계

		var models		= grid.getStore().getRange();


		models[rowIndexNum].set('istt_amnt',amnt);
		models[rowIndexNum].set('istt_vatx',vatx);
		models[rowIndexNum].set('ttsm_amnt',ttsm);


	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
 });