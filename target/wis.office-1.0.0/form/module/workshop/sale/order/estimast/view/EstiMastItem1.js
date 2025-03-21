Ext.define('module.workshop.sale.order.estimast.view.EstiMastItem1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-estimast-lister-item1',
	store		: 'module.workshop.sale.order.estimast.store.EstiMastItem1',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	viewConfig : {
		plugins: {
			ptype: 'gridviewdragdrop',
		},
		listeners: {
			drop: function (node, data, dropRec, dropPosition) {
				var me = this;
				var i = 1;
				me.store.each(function(records){
					records.set('wkfw_seqn',i);
					records.set('line_senq',i);
					i++;
				})
			}
		}
	},
	initComponent : function () {
		var me = this
			me.paging		= me.pagingItem();
			me.columns		= me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	fieldLabel	: '생산라인',
						xtype		: 'popupfield',
						editable	: false,
						name		: 'wkfw_name',
						clearable	: true ,
						hidden		: !(_global.hqof_idcd.toUpperCase()=='N1000HNSUN'),
						labelWidth	: 50,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-wkfw-popup',
							params	: { stor_grp : _global.stor_grp, line_stat : '0', sale_cstm_yorn : '1'},
							result	: function(records, nameField, pairField){
								var editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0],
									editorMaster = Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
									values = editor.getValues(),
									masterval = editorMaster.getValues()
								;
								//TODO : 생산라인 선택시 공정 저장 서비스 만들어야함.
								Ext.Ajax.request({
									url		: _global.location.http() + '/custom/hjsys/sale/order/estimast/set/wkfw.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											wkfw_idcd		: records[0].get('wkfw_idcd'),
											invc_numb		: masterval.invc_numb,
											item_idcd		: values.item_idcd,
											need_qntt		: values.need_qntt,
											line_seqn		: values.line_seqn,
											cstm_idcd		: masterval.cstm_idcd,
											updt_idcd		: _global.login_pk
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											var	store  = me.getStore(),
												item2  = Ext.ComponentQuery.query('module-estimast-lister-item2')[0],
												store2 = item2.getStore(),
												tree   = Ext.ComponentQuery.query('module-estimast-tree')[0]
											;
											tree.getStore().reload();
											store.reload();
											store2.reload();
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}
						}
					},
					{text : '<span class="write-button">작업지시서</span>', action : 'printAction'	, cls: 'button1-style'	,itemId:'treePrint'} ,
					{text : Const.UPDATE.text, iconCls: Const.UPDATE.icon, action : 'updateAction', cls: 'button-style' },
					{text : Const.CANCEL.text, iconCls: Const.CANCEL.icon, action : 'cancelAction', cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
					{	dataIndex : 'wkfw_idcd'			, text : Language.get('wkfw_idcd'		,'ID'			) , width :  50 , align :'center', hidden : true,
					},{ dataIndex : 'line_seqn'			, text : Language.get('line_seqn'		,'항번'			) , width :  50 , align :'center', hidden : true,
					},{ dataIndex : 'wkfw_seqn'			, text : Language.get('wkfw_seqn'		,'공정순서'		) , width :  70 , align : 'right', xtype: 'numericcolumn', hidden : false,
					},{ dataIndex : 'wkct_code'			, text : Language.get('wkct_code'		,'공정코드'		) , width :  70 , align :'center',
					},{ dataIndex : 'wkct_name'			, text : Language.get('wkfw_name'		,'공정명'			) , width : 120,
					},{ dataIndex : 'indn_qntt'			, text : Language.get('indn_qntt'		,'지시수량'	) , width :  90 , align : 'right', xtype: 'numericcolumn' , summaryType: 'sum',
						tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row+1, 4);
									}
								},
							}
						}
					},{ dataIndex : 'otod_yorn'			, text : Language.get('otod_yorn'		,'외주여부'		) , width :  70 , align :'center', hidden : true,
					},{ dataIndex : 'otod_cstm_name'	, text : Language.get('otod_cstm_name'	,'외주거래처'		) , width : 140 , align : 'left',
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '거래처 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									var wkct_idcd = record.data.wkct_idcd,
										mngt_sbsc_valu, mngt_sbsc_idcd = '000003'
									;
									mngt_sbsc_valu= 'A'.concat(wkct_idcd.substr(-2));
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup3',
										params:{ otod_cstm_yorn : '1', line_stat : '0'
											   , mngt_sbsc_valu : mngt_sbsc_valu, mngt_sbsc_idcd : mngt_sbsc_idcd, wkct_idcd : wkct_idcd},
										result	: function(records) {
											var	parent = records[0];
											record.set('otod_cstm_idcd',parent.data.cstm_idcd);
											record.set('otod_cstm_name',parent.data.cstm_name);
											if(record.get('otod_cstm_idcd') != '' || record.get('otod_cstm_idcd') != null){
												record.set('otod_yorn','1');
											}
										},
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'user_memo'     , text : Language.get('user_memo'		,'메모사항'		) , flex : 1,
						tdCls : 'editingcolumn',
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
										grid.plugins[0].startEdit(row+1, 4);
									}
								},
							}
						}
					},{ dataIndex: 'plan_strt_dttm', text : Language.get('plan_strt_dttm'	,'시작일자'		) , width : 90, xtype:'numericcolumn', hidden : true,
					},{ dataIndex: 'plan_endd_dttm', text : Language.get('plan_endd_dttm'	,'종료일자'		) , width : 90, xtype:'numericcolumn', hidden : true,
					}
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0];
		var indn_qntt = this.getSelectionModel().getSelection()[0].data.indn_qntt;
		var invc_qntt = editor.down('[name=pqty_ndqt]').getValue();
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var grid = this;
		var models = grid.getStore().getRange();
		if(indn_qntt < 0){
			Ext.Msg.alert("알림", "지시수량을 다시 입력해주십시오.");
			models[pos].set('indn_qntt',invc_qntt);
			return;
		}
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		},

	}
});

