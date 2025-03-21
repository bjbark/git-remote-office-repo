Ext.define('module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister', { extend: 'Axt.grid.Panel',
	 alias		: 'widget.module-smplmast2-lister'			,
	store		: 'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister'	,
	selModel 	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features: [{ftype :'grid-summary'}],
	plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
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
				'-',
				{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style' },
				{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style' },
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align: center', sortable: false, menuDisabled: true },
				items : [
					{	xtype: 'rownumberer'		, width:  50, text: '번호', align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get(''	,'날짜')	, width : 90	, align : 'center',
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
					},{	dataIndex: 'cstm_name'		, text : Language.get(''	,'거래처')	, width : 150	, align : 'left',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[3]);
									}
								}
							}
						}
					},{	dataIndex: 'smpl_usge_dvcd'	, text : Language.get(''	,'유형')	, width : 90 , align : 'left',xtype :'lookupcolumn', lookupValue : resource.lookup('smpl_usge_dvcd'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							lookupValue	: resource.lookup('').concat(resource.lookup('smpl_usge_dvcd').slice(0,4)),
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								/*change : function(self, newValue, oldValue, opt) {
									var msgItem = "";
									if (newValue > 20) {
										for(i = 0; i < self.lookupValue.length; i++) {
											var lookupValue = self.lookupValue[i];
											if (lookupValue[0] < 20) {
												if (msgItem.length > 0) {
													msgItem += ", ";
												}
												msgItem += lookupValue[1];
											}
										}
										Ext.Msg.alert('알림', "색소샘플 유형을 " + msgItem + "에서  선택해 주세요.");
										self.setValue("");
										return;
									}
								},*/
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
					},{	dataIndex: 'smpl_clss_name'	, text : Language.get(''	,'대항목')	, width : 140	, align : 'left',
					},{	xtype	: 'actioncolumn',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-base-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '4200'},
										result	: function(records) {
											var	parent = records[0];
											var grid = me.up('grid'),
												store = me.getStore(),
												selection = me.getSelectionModel().getSelection()[0]
												row = store.indexOf(selection);
											record.set('smpl_clss_code', parent.data.base_code);
											record.set('smpl_clss_name', parent.data.base_name);
											me.plugins[0].startEdit(row, 7);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex: 'smpl_clss_code'	, hidden	: true,
					},{	dataIndex: 'item_name'		, text : Language.get(''	,'샘플명'	)	, width : 200	, align : 'left',
						tdCls	: 'editingcolumn',
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
											index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
										grid.plugins[0].startEdit(row, grid.columns[8]);
									}
								}
							}
						}
					},{	dataIndex: 'spec_1fst'		, text : Language.get(''	,'규격1')	, width : 110	, align : 'left',
						tdCls	: 'editingcolumn',
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
										var gridDataIndices = Ext.Array.pluck(grid.columns, 'dataIndex'),
											index = Ext.Array.indexOf(gridDataIndices,this.name)+1;
										grid.plugins[0].startEdit(row, grid.columns[9]);
									}
								}
							}
						}
					},{	dataIndex: 'spec_2snd'		, text : Language.get(''	,'규격2')	, width : 110	, align : 'left',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[10]);
									 }
								}
							}
						},
						renderer:function(val){
							if (val != "") {
								a= '<span style="color:red; font-weight:bold">'+val+'</span>';
								return a
							} else {
								return val
							}
						},
					},{	dataIndex: 'remk_text'		, text : Language.get(''	,'비고')	, width : 130	, align : 'left',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex: 'sale_drtr_name'	, text : Language.get(''	,'영업담당')	, width : 100	, align : 'center',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						}
					},{	dataIndex: 'labr_drtr_name'	, text : Language.get(''	,'연구담당')	, width : 100	, align : 'center',
						tdCls	: 'editingcolumn',
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						}
					},{	dataIndex: 'pcmt'			, text : Language.get(''	,'특이사항')		, width : 150	, align : 'left',
						tdCls	: 'editingcolumn',
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
					},{	dataIndex: 'smpl_esti_cont'		, text : Language.get(''	,'견적가')		, width : 190	, align : 'right',
						tdCls	: 'editingcolumn',
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
					}
				]
			}
		;
		return item;
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined

		;

		var new_invc_numb
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/sjflv/sale/etc/smplmast/get/invc.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'smpl_trst_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});


		record = Ext.create( store.model.modelName , {
			new_invc_numb	: new_invc_numb,
			smpl_dvcd		: 1,
			modify			: 'Y',
		});
		store.add(record);
		record.commit();
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
});
