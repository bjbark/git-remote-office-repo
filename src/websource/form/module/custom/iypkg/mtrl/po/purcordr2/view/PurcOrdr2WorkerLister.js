Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr2-worker-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister',

	border		: 0,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
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
					'-',
					{	text : '<span class="write-button">부자재 추가</span>'	, action : 'codeAction'		, cls: 'button1-style'	} ,
					'->','-',
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
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, action : Const.CANCEL.action ,cls: 'button-style' }
				]
			}
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'asmt_name'	, text : Language.get('asmt_name'		,'부자재명'		) , width : 230 , align : 'center',
						tdCls		: 'editingcolumn',
						editor		: {
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
										grid.plugins[0].startEdit(row, 1);
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
								tooltip	: '부자재명 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-asmt-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records) {
											var	parent = records[0],
												search = Ext.ComponentQuery.query('module-purcordr2-worker-search')[0],
												values = search.getValues()
											;
											record.set('asmt_name',parent.data.asmt_name);
											record.set('asmt_idcd',parent.data.asmt_idcd);
											record.set('asmt_dvcd',parent.data.asmt_dvcd);
											record.set('asmt_spec',parent.data.asmt_spec);

											if(parent.data.unit_idcd != ''){
												record.set('unit_idcd',parent.data.unit_idcd);
												record.set('unit_name',parent.data.unit_name);
											}

											Ext.Ajax.request({
												url			: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/pric.do',
												params		: {
													token	: _global.token_id ,
													param	: JSON.stringify({
														stor_id		: _global.stor_id,
														asmt_idcd	: parent.data.asmt_idcd,
														cstm_idcd	: values.cstm_idcd
													})
												},
												async	: false,
												method	: 'POST',
												success	: function(response, request) {
													var result = Ext.decode(response.responseText);
													record.set('offr_pric',result.records[0].pric);
												}
											});
										}
									});
								},
								scope : me
							}
						]
					},{	dataIndex: 'asmt_idcd'	, hidden : true
					},{	dataIndex: 'asmt_spec'	, text : Language.get('asmt_spec'		,'규격'		) , width :  80 , align : 'center',
					},{	dataIndex: 'asmt_dvcd'	, text : Language.get('asmt_dvcd'		,'구분'		) , width :  80 , align : 'center', xtype : 'lookupcolumn', lookupValue	: resource.lookup('asmt_dvcd'),
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'lookupfield',
							lookupValue	: resource.lookup('asmt_dvcd'),
							selectOnFocus: true,
							enableKeyEvents : true,
						}
					},{ dataIndex: 'offr_qntt'	, text : Language.get('offr_qntt'		,'발주수량'		) , width :  80 , align : 'right', xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
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
										grid.plugins[0].startEdit(row, grid.columns[5]);
									}
								}
							}
						}
					},{ dataIndex: 'offr_pric'	, text : Language.get('offr_pric'		,'단가'		) , width :  80 , align : 'right', xtype: 'numericcolumn',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
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
										grid.plugins[0].startEdit(row+1, grid.columns[4]);
									}
								}
							}
						}
					},{ dataIndex: 'offr_amnt'	, text : Language.get('offr_amnt'		,'공급가액'		) , width :  85 , align : 'right', xtype: 'numericcolumn',
					},{ dataIndex: 'offr_vatx'	, text : Language.get('offr_vatx'		,'부가세액'		) , width :  80 , align : 'right', xtype: 'numericcolumn',
					},{ dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'		,'합계금액'		) , width :  85 , align : 'right', xtype: 'numericcolumn',
					},{ dataIndex: 'unit_name'	, text : Language.get('unit_name'		,'단위'		) , width :  60 , align : 'center',
					},{	xtype	: 'actioncolumn',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '단위코드 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-unit-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001', tema : ''},
										result	: function(records) {
											var	parent = records[0];
											console.log(parent);
											record.set('unit_name',parent.data.unit_name);
											record.set('unit_idcd',parent.data.unit_idcd);
										}
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'unit_idcd'	, hidden : true, name : 'unit_idcd',
					},{ dataIndex: 'acpt_numb'	, text : Language.get('invc_numb'		,'수주번호'		) , width : 200 , align : 'center'
					},{	xtype	: 'actioncolumn',
						header	: '',
						width	: 20,
						align	: 'center',
						items	: [
							{	iconCls	: Const.SELECT.icon,
								tooltip	: '수주번호 찾기',
								handler	: function (grid, rowIndex, colIndex, item, e, record) {
									resource.loadPopup({
										select	: 'SINGLE',
										widget	: 'lookup-iypkg-ordr-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001', tema : '', line_clos : '0' },
										result	: function(records) {
											var	parent = records[0];
											record.set('acpt_numb',parent.data.invc_numb);
											record.set('prod_name',parent.data.prod_name);
											record.set('acpt_cstm_name',parent.data.cstm_name);
										}
									})
								},
								scope : me
							}
						]
					},{ dataIndex: 'acpt_cstm_name'	, text : Language.get('cstm_name'		,'수주처'		) , width :  150 , align : 'left',
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);

										grid.plugins[0].startEdit(row, grid.columns[17]);
									}
								}
							}
						}
					},{ dataIndex: 'prod_name'	, text : Language.get('prod_name'		,'제품명'		) , width :  230 , align : 'left',
						tdCls	: 'textfield',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = self.up('grid'),
											store = me.getStore(),
											selection = me.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[18]);
									}
								}
							}
						}
					},
				]
			}
		;
		return item;
	},

	cellEditAfter  : function (editor, context) {
		var me = this;

		var offr_qntt		= this.getSelectionModel().getSelection()[0].data.offr_qntt;		//발주수량
		var offr_pric		= this.getSelectionModel().getSelection()[0].data.offr_pric;		//단가
		var offr_amnt		= this.getSelectionModel().getSelection()[0].data.offr_amnt;		//공급가
		var offr_vatx		= this.getSelectionModel().getSelection()[0].data.offr_vatx;		//부가세
		var ttsm_amnt		= this.getSelectionModel().getSelection()[0].data.ttsm_amnt;		//합계금액

		var amnt		= Math.floor(offr_qntt*offr_pric);			//공급가
		var vatx		= Math.floor((offr_qntt*offr_pric)*0.1);	//부가세
		var ttsm		= amnt+vatx;								//합계

		var grid		= this;
		var pos			= this.view.getSelectionModel().getCurrentPosition().row;
		var models		= grid.getStore().getRange();

		if(offr_qntt > 0 && offr_pric > 0){
			models[pos].set('offr_amnt', amnt);
			models[pos].set('offr_vatx', vatx);
			models[pos].set('ttsm_amnt', ttsm);
		}

	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	},

	lineInsert : function (config) {
		var me			= this,
			store		= me.getStore(),
			record		= undefined,
			search		= Ext.ComponentQuery.query('module-purcordr2-worker-search')[0],
			values		= search.getValues()
		;

		if(values.cstm_idcd == ''){
			Ext.Msg.alert("알림","발주처를 먼저 입력하여주십시오.");
			return;
		}

		record = Ext.create( store.model.modelName , {
			_set			: 'insert',
			offr_path_dvcd	: 2,
			change			: 'Y',
			unit_idcd		: 'EA',
			unit_name		: 'EA'
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