Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sheetmast-lister'			,
	store		: 'module.workshop.print.basic.sheetmast.store.SheetMast'	,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
					'->', '-' ,
					{	text : '<span class="write-button">행추가</span>', handler: me.rowInsert		, cls: 'button-style'} ,
					{	text : '<span class="write-button">행삭제</span>', handler: me.rowDelete		, cls: 'button1-style'} ,
					{	text : Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'	},
					{	text : Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'	}, '-'
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'shet_code'		, text : Language.get(''				,'용지코드'), width : 70 , align : 'center',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row, grid.columns[1]);
									}
								}
							}
						}
					},{ dataIndex: 'shet_name'		, text : Language.get('shet_name'		,'용지명')	, width : 150 , align : 'left',
						tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
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
										grid.plugins[0].startEdit(row, grid.columns[2]);
									}
								}
							}
						}
					},{ dataIndex: 'horz_leng'		, text : Language.get('horz_leng'		,'가로')	, width : 60  , align : 'right',
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
					},{ dataIndex: 'vrtl_leng'		, text : Language.get('vrtl_leng'		,'세로')	, width : 60  , align : 'right',
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
			select		= myform.getSelectionModel().getSelection()[0],
			lcls		= Ext.ComponentQuery.query('module-sheetmast-lclslister')[0],
			mcls		= Ext.ComponentQuery.query('module-sheetmast-mclslister')[0],
			scls		= Ext.ComponentQuery.query('module-sheetmast-sclslister')[0],
			lSelect		= lcls.getSelectionModel().getSelection()[0],
			mSelect		= mcls.getSelectionModel().getSelection()[0],
			sSelect		= scls.getSelectionModel().getSelection()[0]
		;
		if(lSelect && mSelect && sSelect){
			var shet_idcd = "";
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'shet_mast'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					shet_idcd = result.records[0].seq;
				}
			});

			if(shet_idcd){
				record = Ext.create( store.model.modelName , {
					updt_user_name	: _global.login_nm,
					crte_user_name	: _global.login_nm,
					updt_idcd		: _global.login_id,
					crte_idcd		: _global.login_id,
					lcls_idcd		: lSelect.get('clss_idcd'),
					mcls_idcd		: mSelect.get('clss_idcd'),
					scls_idcd		: sSelect.get('clss_idcd'),
					shet_idcd		: shet_idcd,
					insert			: 'Y'
				});
				// ROW 추가
				store.add(record);
				var count = store.getCount();
				myform.plugins[0].startEdit(count-1 , 1);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....
			}
		}else{
			Ext.Msg.alert('알림','대, 중, 소분류 선택 후 진행해주세요.');
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
