Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-mmbrmast-lister2',
	store		: 'module.workshop.print.basic.mmbrmast.store.MmbrMast2',

	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
							click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.lineDelete({});
							}
						}
					},
					 '-' , '-' ,
					{ text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : Const.UPDATE.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex : 'line_seqn'		, text : Language.get('line_seqn'		,'항번'		), width :  50 , align : 'center'
					},{	dataIndex : 'base_yorn'		, text : Language.get('base_yorn'		,'기본여부'	), width :  80 , align : 'center',xtype:'lookupcolumn',lookupValue:resource.lookup('yorn')
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: false,
							lookupValue:resource.lookup('yorn'),
							enableKeyEvents : true,
							listeners:{
								change : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index ,2);
									}
								},
							}
						}
					},{	dataIndex : 'dlvy_alis'		, text : Language.get('dlyy_alis'		,'별칭'		), width : 120 , align : 'left'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index , 6);
									}
								},
							}
						}
					},{	dataIndex : 'dlvy_zpcd'		, text : Language.get('dlvy_zpcd'		,'우편번호'	), width :  80 , align : 'left'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'DAUM',
										widget	: 'popup-zipcode-search',
										params	: {},
										result	: function(records) {
											var address = records[0];
											record.set('dlvy_zpcd',address.zonecode);
											record.set('dlvy_addr_1fst',address.roadAddress);
											grid.up('grid').plugins[0].startEdit(rowIndex , 6);
										}
									});
								}
							}
						]
					},{	dataIndex : 'dlvy_addr_1fst', text : Language.get('dlvy_addr_1fst'	,'주소'		), width : 200 , align : 'left'
					},{	dataIndex : 'dlvy_addr_2snd', text : Language.get('dlvy_addr_2snd'	,'상세주소'	), width : 120 , align : 'left'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index , 7);
									}
								},
							}
						}
					},{	dataIndex : 'rctr_name'		, text : Language.get('rctr_name'		,'수취인명'	), width : 100 , align : 'left'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index , 8);
									}
								},
							}
						}
					},{	dataIndex : 'tele_numb'		, text : Language.get('tele_numb'	,'전화번호'	), width : 110, align : 'left'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							vtype		: 'mobile',
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e){
									var index = self.up('grid').view.getSelectionModel().getCurrentPosition().row;
									if(e.keyCode == e.ENTER || e.keyCode == e.TAB){
										self.up("grid").plugins[0].startEdit(index+1 , 1);
									}
								},
							}
						}
					}
				]
		,
		}
		;
		return item;
	},



	listeners: {
		edit : function(editor, context) {
			var me = this;
		}
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			lister		= Ext.ComponentQuery.query('module-mmbrmast-lister')[0],
			select		= lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			store.each(function(record){
				uper_seqn = record.get('line_seqn');
			})
			if (uper_seqn == undefined) {
				uper_seqn = 0;
			}
			var seq = uper_seqn + 1;
			var dsp = uper_seqn + 1;

			record = Ext.create( store.model.modelName , {
				mmbr_idcd		: select.get('mmbr_idcd'),
				line_seqn		: seq,

				crte_dttm		: Ext.Date.format(new Date(), 'Ymd'),
			});
			store.add(record);
		}
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records[0]){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}
	},
});