Ext.define('module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail4', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-sordermast-lister-detail4',
	store: 'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail4',

	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary' } ],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon , itemId: 'cnslInsertRow', hidden : true,
						listeners: {
	 			 			click:function(self,e){
								me.lineInsert({});
							}
						}
					},
					'-',
					{	text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon , itemId: 'cnslDeleteRow', hidden : true,
							listeners: {
								click:function(self,e){
									me.lineDelete({});
								}
							}
					},
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon, action : Const.UPDATE.action ,cls: 'button-style', itemId: 'btnCnslUpdate', hidden:false },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style', itemId: 'btnCnslCancel', hidden:false },
//					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
	                  {	xtype: 'rownumberer'	    , text : '항번', width : 40    , align : 'center'
	                },{	dataIndex:	'uper_seqn'		, width:  50 , align : 'center'	, text: Language.get(''	, 'up'	),hidden : true,
				    },{	dataIndex:	'line_seqn'		, width:  50 , align : 'center'	, text: Language.get(''	, '순번'	),hidden : true,
					},{	dataIndex:	'invc_numb'		, width:  90 , align : 'center'	, text: Language.get(''	, 'invc번호'	),hidden : true,
					},{	dataIndex:	'drtr_name'		, width: 110 , align : 'center'	, text: Language.get(''	, '상담자'	),
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '담당자 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params:{
										line_stat : '0'
									},
									result	: function(records) {
										var	parent = records[0];
										var grid = me.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0]
										row = store.indexOf(selection);
											record.set('drtr_idcd',parent.data.user_idcd);
											record.set('drtr_name',parent.data.user_name);
											me.plugins[0].startEdit(row, 1);
										},
									})
								},
								scope : me
							}
						]
					},{	dataIndex:	'cnsl_cont'		, flex :  80, align : 'left'	, text: Language.get(''	, '상담내용'	),
						editor	: {
							xtype		:'textfield',
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
					},{	dataIndex:	'user_memo'	, flex :  20, align : 'left'	, text: Language.get(''	, '비고'	),
						editor	: {
							xtype		:'textfield',
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
					}
				]
			};
		return item;
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			uper_seqn	= 0,
			mlister		= Ext.ComponentQuery.query('module-sordermast-lister-master')[0],
			mrecord		= record ? record[0] : mlister.getSelectionModel().getSelection()[0]
		;

		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = 0;
		}
		var seq = uper_seqn + 1;
		var dsp = uper_seqn + 1;
		record = Ext.create( store.model.modelName , {
			line_seqn		: seq,
			invc_numb		: mrecord.get('invc_numb'),
			uper_seqn		: mrecord.get('amnd_degr'),
			modify			: 'Y',
		});
		store.add(record);
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
