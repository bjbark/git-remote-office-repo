Ext.define('module.custom.kortc.qc.insp.inspentry.view.InspEntryMrbLister', { extend     : 'Axt.grid.Panel',
	alias		: 'widget.module-inspentry-mrblister',
	store		: 'module.custom.kortc.qc.insp.inspentry.store.InspEntryMrbLister',
	border		: 0,
	columnLines : true,
	selModel: { selType: 'cellmodel'},
	features: [{ftype :'grid-summary'}],
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
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
						listeners: {
	 			 			click:function(self,e){
								me.rowInsert({});
							}
						}
					},
					'-',
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.rowDelete({});
							}
						}
					}
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex:	'invc_numb'	, width:  120   , align : 'left'	, text: Language.get( ''	, ''		),hidden : true
					},{	dataIndex:	'user_name'	, width: 150, align : 'left'		, text: Language.get( ''	, '협의자'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '협의자 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params:{

									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('user_idcd',parent.data.user_idcd);
											record.set('user_name',parent.data.user_name);
											record.set('dept_name',parent.data.dept_name);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'user_idcd'			, width: 150, align : 'left'	, text: Language.get( '', '거래처명'	),hidden : true,
					},{	dataIndex:	'dept_name'	, width : 120   , align : 'left'	, text: Language.get( ''	, '부서명'	),
					},{	dataIndex:	'invc_date'	, width : 100   , align : 'left'	, text: Language.get( ''	, '일자'		),
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
			}
		;
		return item;
	},

	listeners:{
		edit:function(){
			Ext.ComponentQuery.query('module-inspentry-editor')[0].down('[name=modify]').setValue('Y');
		}
	},

	rowInsert: function(){
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			lastidx		= store.count(),
			editor		= Ext.ComponentQuery.query('module-inspentry-editor')[0],
			invc_numb	= editor.down('[name=invc_numb]').getValue()
		;
		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			invc_date	: Ext.util.Format.date(new Date(),'Ymd') ,	//
			modify		: 'Y',
		});

//			record.recalculation(editor.getRecord());

		// ROW 추가
		store.add(record);
		Ext.ComponentQuery.query('module-inspentry-editor')[0].down('[name=modify]').setValue('Y');

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
		}Ext.ComponentQuery.query('module-inspentry-editor')[0].down('[name=modify]').setValue('Y');
	}
});
