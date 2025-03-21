Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister3', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-purcbillwork-lister3',
	store	: 'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister3',

	border : 0,
	columnLines: true,
	selModel: {selType: 'checkboxmodel', mode : 'MULTI'},
	features: [{ftype :'grid-summary'}],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
							click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					'-','-',
					{	text : '<span class="write-button">매입계산서 발행</span>', action : 'txblAction2'	, cls: 'button1-style', style : 'width : 100px'	}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'item_name'		, width: 230, align : 'left'	, text: Language.get('item_name'	, '품명'		),
						tdCls	: 'editingcolumn',
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[1]);
									}
								}
							}
						}
					},{	dataIndex:	'item_spec'		, width: 170, align : 'left'	, text: Language.get('item_spec'	, '규격'		),
						tdCls	: 'editingcolumn',
						editor	: {
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[2]);
									}
								}
							}
						}
					},{	dataIndex:	'qntt'			, width: 100, align : 'right'	, text: Language.get('qntt'			, '수량'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_pric'			, width: 100, align : 'right'	, text: Language.get('pric'			, '단가'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[4]);
									}
								}
							}
						}
					},{	dataIndex:	'istt_amnt'		, width: 100, align : 'right'	, text: Language.get('sply_amnt'	, '공급가액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								},
							}
						}
					},{	dataIndex:	'istt_vatx'		, name : 'vatx_amnt', width: 100, align : 'right'	, text: Language.get('vatx_amnt'	, '부가세'		), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
						tdCls	: 'editingcolumn',
					},{	dataIndex:	'ttsm_amnt'		, width: 120, align : 'right'	, text: Language.get('ttsm_amnt'	, '합계금액'	), xtype: 'numericcolumn' , summaryType: 'sum', format: '#,##0',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype			:'numericfield',
							selectOnFocus	: true,
							allowBlank		: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row+1, grid.columns[0]);
									}
								}
							}
						}
					}
				]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		var qntt			= this.getSelectionModel().getSelection()[0].data.qntt;			//수량
		var pric			= this.getSelectionModel().getSelection()[0].data.istt_pric;	//단가
		var sply_amnt		= this.getSelectionModel().getSelection()[0].data.istt_amnt;	//공급가액
		var vatx_amnt		= this.getSelectionModel().getSelection()[0].data.istt_vatx;	//부가세액
		var ttsm_amnt		= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;	//합계금액

		var amnt		= qntt*pric;					//공급가
		var vatx		= Math.round((amnt)*0.1);		//부가세
		var ttsm		= amnt+vatx;					//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(qntt > 0 && pric > 0){
			models[pos].set('istt_amnt', amnt);
			models[pos].set('istt_vatx', vatx);
			models[pos].set('ttsm_amnt', ttsm);
		}else if(qntt < 0){
			Ext.Msg.alert("알림", "발행할 수량을 다시 입력해주십시오.");
			models[pos].set('qntt',0);
			models[pos].set('istt_amnt', 0);
			models[pos].set('istt_vatx', 0);
			models[pos].set('ttsm_amnt', 0);
		}else if(sply_amnt){
			models[pos].set('istt_vatx', Math.round((sply_amnt)*0.1));
			models[pos].set('ttsm_amnt', sply_amnt+Math.round((sply_amnt)*0.1));
		}else if(ttsm_amnt){
			models[pos].set('istt_amnt', Math.round((ttsm_amnt)/1.1));
			models[pos].set('istt_vatx', Math.round(ttsm_amnt-(ttsm_amnt)/1.1));
		}
	},


	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},
	},

	//행추가
	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined
		;

		record = Ext.create( store.model.modelName , {
			line_seqn		: 1,
			txbl_path_dvcd	: 13,		//기타매입
		});

		Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search')[0].down('[name=change]').setValue('Y');
		store.add(record);
	},


	//행삭제
	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove (records);
					}
				}
			});
			Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search')[0].down('[name=change]').setValue('Y');
		}else{
			Ext.Msg.alert("알림","선택된 자료가 없습니다.");
		}
	},


});
