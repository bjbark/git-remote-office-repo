Ext.define('module.custom.iypkg.stock.isos.sptsmast.view.SptsMastLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sptsmast-lister2'			,
	store		: 'module.custom.iypkg.stock.isos.sptsmast.store.SptsMastLister2',
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig : {
		plugins: {
			ptype: 'gridviewdragdrop',
		},
		listeners: {
			drop: function (node, data, dropRec, dropPosition) {
				var me = this;
				var i = 1;
				me.store.each(function(records){
					records.set('disp_seqn',i);
					i++;
				})
			}
		}
	},
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
					'->', '-',
				{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon ,
					listeners: {
 			 			click:function(self,e){
							me.lineInsert({});
						}
					}
				},
				'-',
				{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon,
						listeners: {
							click:function(self,e){
								me.lineDelete({});
							}
						}
				},
				{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
				{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style' },
				{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' },
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{ dataIndex: 'disp_seqn'		, width:  50, align: 'center', text: Language.get(''		, '순번'		),hidden: false,
					},{	dataIndex: 'invc_date2'		, width: 90, align: 'center', text: Language.get('invc_date'		, '계획일자'		),
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
										grid.plugins[0].startEdit(row, grid.columns[2]);
									}
								}
							}
						},
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
						},
					},{ dataIndex: 'trst_qntt'		, width:  80, align: 'right' , text: Language.get('trst_qntt'		, '계획량'		), xtype: 'numericcolumn'  , summaryType: 'sum' , format:  '#,##0.##'
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
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{ dataIndex: 'lcal_name'		, width:  80, align: 'left'  , text: Language.get('lcal_name'		, '운송지역'		)
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
										grid.plugins[0].startEdit(row, grid.columns[4]);
									}
								}
							}
						}
					},{ dataIndex: 'cars_name'		, width:  80, align: 'left'  , text: Language.get('cars_name'		, '운송차량'		)
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var	grid   = self.up('grid'),
											action = grid.columns[5].items[0],
											val    = self.getValue()
										;

										action.handler.call(
											action.scope || action,
											grid, '', '','cars_name',val,grid.getSelectionModel().getSelection()[0]
										);
									}
								}
							}
						}
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '차량 선택',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {

									var find_name = "";

									if(item=="cars_name"){
										find_name = e;
									}
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-car-popup',
									params:{
										stor_grp : _global.stor_grp, line_stat : '0', find_name : find_name
									},
									result	: function(records) {
										var	parent = records[0];
										store = grid.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('cars_name',parent.data.cars_alis);
											record.set('cars_idcd',parent.data.cars_idcd);
//											me.plugins[0].startEdit(row,  grid.columns[6]);
										},
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'dlvy_cstm_name'	, width: 180, align: 'left'  , text: Language.get('dlvy_cstm_name'	, '납품처명'		)
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
										grid.plugins[0].startEdit(row, grid.columns[7]);
									}
								}
							}
						}
					},{ dataIndex: 'user_memo'		, flex: 1   , align: 'left'  , text: Language.get('user_memo'		, '비고'			)
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
											grid.plugins[0].startEdit(row+1, grid.columns[1]);
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

	cellEditAfter  : function (editor, context) {
		var me = this;
		var store = me.getStore();
		var a = this.getSelectionModel().getSelection()[0].data.trst_qntt;		//수주량

		if(a>0){
			var sum_qntt = 0;

			store.each(function(record){
				sum_qntt += record.get("trst_qntt");
				record.setDirty();
			});

			store.data.items[0].set("sum_qntt", sum_qntt);
		}
	},

	lineInsert : function (config) {
		var me			= this,
			myform		= Ext.ComponentQuery.query('module-sptsmast-lister2')[0],
			store		= me.getStore(),
			record		= undefined,
			max_seq		= 0,
			max_line_seq= 0,
			lastidx		= store.count(),
			mlister		= Ext.ComponentQuery.query('module-sptsmast-lister')[0],
			selectMaster = mlister.getSelectionModel().getSelection()[0],
			selectDetail= myform.getSelectionModel().getSelection()[0],
			records		= mlister.getSelectionModel().getSelection(),
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0]
		;

		if (!records || records.length != 1) {
			Ext.Msg.alert("알림", "출하계획을 등록할 수주를 선택해주세요.");
			return;
		}

		store.each(function(findrecord) {
			if (findrecord.get('disp_seqn') > max_seq) {
				max_seq			= findrecord.get('disp_seqn');   // 최종으로 사용한 항번을 찾는다....
				max_line_seq	= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq			= max_seq + 1;
		max_line_seq	= max_line_seq + 1;

		record = Ext.create( store.model.modelName , {
			invc_numb	: mrecord.get('invc_numb'),
			acpt_numb	: mrecord.get('invc_numb'),
			line_seqn	: max_line_seq,						//
			disp_seqn	: max_seq,							//
			dlvy_cstm_name	: mrecord.get('cstm_name'),		//
			cstm_idcd	: mrecord.get('cstm_idcd'),			//
			item_idcd	: mrecord.get('prod_idcd'),			//
			modify		: 'Y',
		});
		store.add(record);
		myform.plugins[0].startEdit(lastidx , 1);
	},

	lineDelete : function (config) {
		var me = this;
		var records = me.getSelectionModel().getSelection();
		if(records.length != 0){
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn : function (button) {
					if (button==='yes') {
						me.getStore().remove(records);
					}
				}
			});
		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}

});
