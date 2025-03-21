Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sheetmast-detail'			,
	store		: 'module.workshop.print.basic.sheetmast.store.SheetMastDetail'	,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }],
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->','-',
					{	text : '<span class="write-button">행추가</span>', handler: me.rowInsert		, cls: 'button-style'} ,
					{	text : '<span class="write-button">행삭제</span>', handler: me.rowDelete		, cls: 'button1-style'} ,
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'	},
					{	text : Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{ dataIndex: 'shet_wght'		, text : Language.get('shet_wght'		,'무게(g)')	, width : 70  , align : 'right', xtype: 'numericcolumn',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{ dataIndex: 'colr_name'		, text : Language.get('colr_name'		,'컬러')	, width : 100 , align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp, line_stat : '0',prnt_idcd : '3104' },
										result	: function(records) {
											var	parent = records[0];
											record.set('colr_bacd',parent.data.base_idcd);
											record.set('colr_name',parent.data.base_name);

										},
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'puch_pric'		, text : Language.get('puch_pric'		,'구매단가'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[4]);
									}
								}
							}
						}
					},{ dataIndex: 'esti_pric'		, text : Language.get('esti_pric'		,'견적단가'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								}
							}
						}
					},{ dataIndex: 'sale_pric'		, text : Language.get('sale_pric'		,'판매단가'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[6]);
									}
								}
							}
						}
					},{ dataIndex: 'dprt_blwt_pric'	, text : Language.get('dprt_blwt_pric'	,'흑백양면'), width : 80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{ dataIndex: 'sprt_blwt_pric'	, text : Language.get('sprt_blwt_pric'	,'흑백단면'), width : 80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{ dataIndex: 'dprt_colr_pric'	, text : Language.get('dprt_colr_pric'	,'컬러양면'), width : 80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{ dataIndex: 'sprt_colr_pric'	, text : Language.get('sprt_colr_pric'	,'컬러단면'), width : 80, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[10]);
									}
								}
							}
						}
					},{ dataIndex: 'mixx_colr_dprt_pric'	, text : Language.get('mixx_colr_dprt_pric'	,'컬러양면(혼합)'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{ dataIndex: 'mixx_blwt_dprt_pric'	, text : Language.get('mixx_blwt_dprt_pric'	,'흑백양면(혼합)'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{ dataIndex: 'mixx_colr_sprt_pric'	, text : Language.get('mixx_colr_sprt_pric'	,'컬러단면(혼합)'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{ dataIndex: 'mixx_blwt_sprt_pric'	, text : Language.get('mixx_blwt_sprt_pric'	,'흑백단면(혼합)'), width : 100, align : 'right', xtype: 'numericcolumn'  , format		: '#,##0',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
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
	rowInsert: function(){
		var me			= this,
			myform		= me.up('grid'),
			store		= myform.getStore(),
			max_seq		= 0,
			select		= myform.getSelectionModel().getSelection()[0],
			master		= Ext.ComponentQuery.query('module-sheetmast-lister')[0],
			mSelect		= master.getSelectionModel().getSelection()[0],
			revs_numb	= 1
		;
		if(mSelect){
			if(mSelect.get('insert')!="Y"){

				max_seq = 0;
				store.each(function(findrecord) {
					if (findrecord.get('line_seqn') > max_seq) {
						max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
					}
				});
				max_seq = max_seq + 1;

				record = Ext.create( store.model.modelName , {
					updt_user_name	: _global.login_nm,
					crte_user_name	: _global.login_nm,
					updt_idcd		: _global.login_id,
					crte_idcd		: _global.login_id,
					shet_idcd		: mSelect.get('shet_idcd'),
					line_seqn		: max_seq,
					chk				: 'Y'
				});
				// ROW 추가
				store.add(record);
				var count = store.getCount();
				myform.plugins[0].startEdit(count-1 , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....

			}
		}else{
			Ext.Msg.alert('알림','용지 선택 후 진행해주세요.');
		}
	},
	/******************************************************************d
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var me = this,
			myform		= me.up('grid'),
			records		= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}
	},
});
