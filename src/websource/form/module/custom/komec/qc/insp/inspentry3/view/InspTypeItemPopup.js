Ext.define('module.custom.komec.qc.insp.inspentry3.view.InspTypeItemPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-inspentry3-insptypeitem',
	alias	: 'widget.module-komec-inspentry3-insptypeitem',
	store	: 'module.custom.komec.qc.insp.inspentry3.store.InspTypeItemPopup',

	title	: Language.get('insptypeitem_popup','검사성적서 입력'),
	closable: true,
	autoShow: true,
	width	: 1050,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' , },
					items	: [
						{	fieldLabel	: Language.get('invc_numb','입고번호'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'invc_numb',
							margin		: '0 0 0 13',
							width		: 150,
							labelWidth	: 45,
							value		: me.popup.params.wkod_numb,
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('item_name','품명'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'item_name',
							width		: 200,
							margin		: '0 0 0 14',
							labelWidth	: 45,
							value		: me.popup.params.item_name,
							labelStyle	: 'text-align:right;padding : 0 3 0 0;',
							fieldCls    : 'readonlyfield'
						},{	xtype		: 'textfield',
							name		: 'cstm_idcd',
							value		: me.popup.params.cstm_idcd,
							hidden		: true
						},{	fieldLabel	: Language.get('istt_date','입고일자'),
							xtype		: 'datefield',
							readOnly	: true,
							name		: 'istt_date',
							width		: 123,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: new Date(me.popup.params.istt_date),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('istt_qntt','입고수량'),
							xtype		: 'numericfield',
							readOnly	: true,
							name		: 'istt_qntt',
							width		: 123,
							margin		: '0 0 0 95',
							labelWidth	: 45,
							value		: me.popup.params.istt_qntt,
							fieldCls   : 'readonlyfield'
						},
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 5,  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
					layout		: { type: 'vbox' }
				}
			],
			layout			: { type: 'hbox' },
			fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' , margin		: '2 0 2 22', },
			items			: [
				{	fieldLabel	: Language.get('wkct_insp_dvcd','검사구분'),
					xtype		: 'lookupfield',
					name		: 'wkct_insp_dvcd',
					width		: 150,
					labelWidth	: 45,
					margin		: '0 0 0 15',
					value		: '3000',
					lookupValue	: resource.lookup('wkct_insp_dvcd'),
							listeners:{
								render:function(a, b){
									function isBigEnough(element, index, array) {
										return (element[0] == 3000);
									}
									var lookupVal = resource.lookup('wkct_insp_dvcd').filter(isBigEnough);
									this.setLookupValue(lookupVal);
								},
								change:function(){
									var grid	= me.down('grid'),
										store	= grid.getStore(),
										val		= this.getValue()
									;
									if(me.down('[name=insp_type_name]').getValue()){
										if(val != '3000'){
											grid.columns[11].hide();
											grid.columns[12].hide();
											grid.columns[13].hide();
											grid.columns[14].hide();
										}else{
											grid.columns[11].show();
											grid.columns[13].show();
											grid.columns[14].show();
										}
										store.reload();
									}else{
										Ext.Msg.alert('알림','검사유형을 선택해주세요.')
										this.setValue('');
										return;
									}
								}
							}
				},{	fieldLabel	: Language.get('','검사유형'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					width		: 200,
					labelWidth	: 45,
					margin		: '0 0 0 15',
					name		: 'insp_type_name',
					pair		: 'insp_type_idcd',
					value		: me.popup.params.insp_type_name,
					clearable	: false ,
					popup		: {
						select	: 'SINGLE',
						widget	: 'lookup-insptype-popup',
						params	: { stor_grp : _global.stor_grp , line_stat : '0' },
						result	: function(records, nameField, pairField) {
							nameField.setValue(records[0].get('insp_type_name'));
							pairField.setValue(records[0].get('insp_type_idcd'));
							me.down('[name=wkct_insp_dvcd]').setValue('3000');
						}
					}
				},{	xtype 	: 'textfield' ,
					name	: 'insp_type_idcd',
					hidden 	: true,
					value	:me.popup.params.insp_type_idcd,
					listeners	:{
						change	:function(){
							var store	= me.down('grid').getStore();
							store.load({
								params		: {param:JSON.stringify({insp_type_idcd : this.getValue()})},
								scope		: me,
								callback	: function(records, operation, success) {
								}
							});
						}
					}
				},{	fieldLabel	: Language.get('insp_date','검사일자'),
					name		: 'insp_date',
					xtype		: 'datefield',
					labelWidth	: 45,
					increment	: 30,
					anchor		: '100%',
					margin		: '0 0 0 15',
					width		: 140,
					value		: new Date(),
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
				},{	fieldLabel	: Language.get('judt_dvcd','판정구분'),
					xtype		: 'lookupfield',
					width		: 125,
					labelWidth	: 45,
					hidden		: true,
					margin		: '0 0 0 77',
					lookupValue	: resource.lookup('judt_dvcd'),
						listeners:{
							change:function(){
								var grid	= me.down('grid'),
									store	= grid.getStore(),
									val		= this.getValue(),
									length	= store.data.items.length
								;
								store.each(function(findrecord) {
									findrecord.set('judt_dvcd',val);
								});
						}
					}
				}
 			]
		};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			master = Ext.ComponentQuery.query('module-komec-inspentry3-lister')[0],
			selectMaster = master.getSelectionModel().getSelection()[0],
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'cellmodel'},
				features	: [{ ftype : 'grid-summary' }],
				plugins 	: { ptype  : 'cellediting-directinput', clicksToEdit: 1 },

				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	text: Language.get('line_seqn'			, '순번'			)	, dataIndex: 'line_seqn'		,  width : 50 	, align:'center'
					},{	text: Language.get('insp_sbsc_name'		, '검사항목'		)	, dataIndex: 'insp_sbsc_name'	,  width : 150
					},{ text : Language.get('insp_cond'			, '검사조건'		)	, dataIndex: 'insp_cond'		,  width : 140
					},{ text : Language.get('insp_mthd_dvcd'	, '검사방법구분코드'	)	, dataIndex: 'insp_mthd_dvcd'	,  width : 140	, hidden:true
					},{ text : Language.get('wkct_name'			, '공정명'			)	, dataIndex: 'wkct_name'		,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_uppt'	, '검사수준(상)'	)	, dataIndex: 'insp_levl_uppt'	,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_midl'	, '검사수준(중)'	)	, dataIndex: 'insp_levl_midl'	,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_lprt'	, '검사수준(하)'	)	, dataIndex: 'insp_levl_lprt'	,  width : 80	, hidden:true
					},{	text : Language.get('goal_levl'			, '목표수준'		)	, dataIndex: 'goal_levl'		,  width : 65 	, xtype:'numericcolumn'
					},{	text : Language.get('uppr_valu'			, '상한값'			)	, dataIndex: 'uppr_valu'		,  width : 60 	, xtype:'numericcolumn'
					},{	text : Language.get('lwlt_valu'			, '하한값'			)	, dataIndex: 'lwlt_valu'		,  width : 60 	, xtype:'numericcolumn'
					},{	text : Language.get('msmt_valu'			, '측정값x1'		)	, dataIndex: 'msmt_valu'		,  width : 60
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me.down('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var	msmtValue = parseFloat(self.getValue());
										var	upprValue = parseFloat(selection.get('uppr_valu'));
										var	lwltValue = parseFloat(selection.get('lwlt_valu'));

										if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty){
											if (msmtValue > upprValue) {
												Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
												self.setValue('');
												return;
											} else if (msmtValue < lwltValue) {
												Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
												self.setValue('');
												return;
											}
											grid.plugins[0].startEdit(row, grid.columns[12]);
										}
									}
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

									if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty) {
										if (msmtValue > upprValue) {
											Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
											self.setValue('');
											return;
										} else if (msmtValue < lwltValue) {
											Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
											self.setValue('');
											return;
										}
									}
								}
							}
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							return value;
						},
					},{	text : Language.get('msmt_valu2'			, '측정값x2'			)	, dataIndex: 'msmt_valu2'		,  width : 60
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me.down('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;

										var	msmtValue = parseFloat(self.getValue());
										var	upprValue = parseFloat(selection.get('uppr_valu'));
										var	lwltValue = parseFloat(selection.get('lwlt_valu'));

										if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty){
											if (msmtValue > upprValue) {
												Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
												self.setValue('');
												return;
											} else if (msmtValue < lwltValue) {
												Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
												self.setValue('');
												return;
											}
											grid.plugins[0].startEdit(row, grid.columns[13]);
										}
									}
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

									if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty) {
										if (msmtValue > upprValue) {
											Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
											self.setValue('');
											return;
										} else if (msmtValue < lwltValue) {
											Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
											self.setValue('');
											return;
										}
									}
								}
							},
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}

							return value;
						},
					},{	text : Language.get('msmt_valu3'			, '측정값x3'			)	, dataIndex: 'msmt_valu3'		,  width : 60
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me.down('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var	msmtValue = parseFloat(self.getValue());
										var	upprValue = parseFloat(selection.get('uppr_valu'));
										var	lwltValue = parseFloat(selection.get('lwlt_valu'));

										if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty){
											if (msmtValue > upprValue) {
												Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
												self.setValue('');
												return;
											} else if (msmtValue < lwltValue) {
												Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
												self.setValue('');
												return;
											}
											grid.plugins[0].startEdit(row, grid.columns[14]);
										}
									}
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

									if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty) {
										if (msmtValue > upprValue) {
											Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
											self.setValue('');
											return;
										} else if (msmtValue < lwltValue) {
											Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
											self.setValue('');
											return;
										}
									}
								}
							}
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							return value;
						},
					},{	text : Language.get('msmt_valu4'			, '측정값x4'			)	, dataIndex: 'msmt_valu4'		,  width : 60
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me.down('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var	msmtValue = parseFloat(self.getValue());
										var	upprValue = parseFloat(selection.get('uppr_valu'));
										var	lwltValue = parseFloat(selection.get('lwlt_valu'));

										if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty){
											if (msmtValue > upprValue) {
												Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
												self.setValue('');
												return;
											} else if (msmtValue < lwltValue) {
												Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
												self.setValue('');
												return;
											}
											grid.plugins[0].startEdit(row, grid.columns[15]);
										}
									}
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

									if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty) {
										if (msmtValue > upprValue) {
											Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
											self.setValue('');
											return;
										} else if (msmtValue < lwltValue) {
											Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
											self.setValue('');
											return;
										}
									}
								}
							}
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							return value;
						},
					},{	text : Language.get('msmt_valu5'			, '측정값x5'			)	, dataIndex: 'msmt_valu5'		,  width : 60
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										var grid = me.down('grid'),
											store = grid.getStore(),
											selection = grid.getSelectionModel().getSelection()[0],
											row = store.indexOf(selection)
										;
										var	msmtValue = parseFloat(self.getValue());
										var	upprValue = parseFloat(selection.get('uppr_valu'));
										var	lwltValue = parseFloat(selection.get('lwlt_valu'));

										if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty){
											if (msmtValue > upprValue) {
												Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
												self.setValue('');
												return;
											} else if (msmtValue < lwltValue) {
												Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
												self.setValue('');
												return;
											}
											grid.plugins[0].startEdit(row, grid.columns[16]);
										}
									}
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

									if(msmtValue != '' || msmtValue != null || msmtValue.isEmpty) {
										if (msmtValue > upprValue) {
											Ext.Msg.alert('알림', '상한값을 벗어났습니다.');
											self.setValue('');
											return;
										} else if (msmtValue < lwltValue) {
											Ext.Msg.alert('알림', '하한값을 벗어났습니다.');
											self.setValue('');
											return;
										}
									}
								}
							}
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '유해물질'){
								if(value == '1'){
									value = 'OK';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == 'Appearance'){
								if(value == '1'){
									value = 'Clear Liquid';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							return value;
						},
					},{	text : Language.get('insp_qntt','검사수량')		, dataIndex: 'insp_qntt'	,  width : 70 , hidden : true
					},{	text : Language.get('pass_qntt', '합격수량')	, dataIndex: 'pass_qntt'	,  width : 70 ,
						tdCls : 'editingcolumn',
						editor: {
							xtype			: 'numericfield',
							selectOnFocus: true,
							allowBlank		: true,
							enableKeyEvents	: true,
							listeners:{
								keydown : function(self, e) {
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);
									var total = record.get('pass_qntt')+record.get('poor_qntt');
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										if(total > record.get('insp_qntt')){
											Ext.Msg.alert("알림","불량수량을 확인해주세요.");
											record.set('poor_qntt',0);
										}else{
											grid.plugins[0].startEdit(row, grid.columns[18]);
										}
									}
								},
								change:function(){
									var pos = me.down('grid').view.getSelectionModel().getCurrentPosition().row,
										grid1 = me.down('grid'),
										grid =  grid1.getStore().getRange(),
										val  = grid[pos].data.poor_qntt
									;
									if(val!=0){
										grid[pos].set('judt_dvcd','2');
									}else{
										grid[pos].set('judt_dvcd','1');
									}
								}
							}
						}
					},{	text : Language.get('poor_qntt', '불량수량')	, dataIndex: 'poor_qntt'	,  width : 70,
						tdCls : 'editingcolumn',
						editor: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents: true ,
							listeners:{
								keydown : function(self, e) {
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);
									var total = record.get('pass_qntt')+record.get('poor_qntt');
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										if(total > record.get('insp_qntt')){
											Ext.Msg.alert("알림","불량수량을 확인해주세요.");
											record.set('poor_qntt',0);
										}else{
											grid.plugins[0].startEdit(row, grid.columns[19]);
										}
									}
								},
								change:function(){
									var pos = me.down('grid').view.getSelectionModel().getCurrentPosition().row,
										grid1 = me.down('grid'),
										grid =  grid1.getStore().getRange(),
										val  = this.getValue()
									;
									if(val){
										grid[pos].set('judt_dvcd','2');
									}else{
										grid[pos].set('judt_dvcd','1');
									}
								}
							}
						},
					},{ text: Language.get('judt_dvcd'			,'판정구분')	, dataIndex: 'judt_dvcd'		, width : 80 , xtype :'lookupcolumn', lookupValue : resource.lookup('judt_dvcd'),align : 'center'
						, tdCls : 'editingcolumn' ,
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: false,
							allowBlank	: true,
							lookupValue : resource.lookup('judt_dvcd'),
						},
					},{ text: Language.get('wkct_insp_dvcd'		, '검사구분')	, dataIndex: 'wkct_insp_dvcd'	,  width : 80 , xtype :'lookupcolumn', lookupValue : resource.lookup('wkct_insp_dvcd'),align : 'center'
						, tdCls : 'editingcolumn',
						hidden	: true,
						editor	: {
							xtype		:'lookupfield',
							selectOnFocus: true,
							allowBlank	: true,
							lookupValue : resource.lookup('wkct_insp_dvcd')
						},
					}
				],
				listeners: {
					itemdblclick: function(dataview, index, item, e) {
						me.finishAction();
					},
					 render: function(){
						var me = this ;
//						new Ext.util.KeyMap({
//							target		: me.getEl(),
//							eventName	: 'keyup',
//							binding		: [
//								{	key: Ext.EventObject.ENTER,
//									fn: function(key,e){
//										me.fireEvent('itemdblclick', me.getView() );
//									}
//								}
//							]
//						});
					}
				}
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			param	= Ext.merge(me.down('form').getValues(),
						{hq_id : _global.hq_id },
						me.popup.params
					)
			values	= me.down('form').getValues()
		;


		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		if(values.insp_type_idcd){
			store.load({
				params		: {param:JSON.stringify(param)},
				scope		: me,
				callback	: function(records, operation, success) {
				}
			});
		}
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me		= this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			lister1	= Ext.ComponentQuery.query('module-komec-inspentry3-lister1')[0].getStore(),
			store	= me.down('grid').getStore(),
			changes = store.getUpdatedRecords().length,
			param 	= me.popup.params,
			max_seq = 0
		;
		if(changes != 0){
			if(values.wkct_insp_dvcd == ''){
				Ext.Msg.alert("알림","검사구분을 선택해주세요.");
				return;
			}
			if(values.insp_type_idcd == ''){
				Ext.Msg.alert("알림","검사유형을 선택해주세요.");
				return;
			}
			if(values.insp_strt_time == ''){
				Ext.Msg.alert("알림","검사시간을 선택해주세요.");
				return;
			}
			max_seq = 1;


			Ext.each(store.getUpdatedRecords(),function(rec){
				var msmt_valu = rec.get('msmt_valu');
				var msmt_valu2 = rec.get('msmt_valu2');
				var msmt_valu3 = rec.get('msmt_valu3');
				var msmt_valu4 = rec.get('msmt_valu4');
				var msmt_valu5 = rec.get('msmt_valu5');

				if(msmt_valu === 'OK'){
					rec.set('msmt_valu', '1');
				}

				if(msmt_valu === 'Clear_Liquid'){
					rec.set('msmt_valu', '1');
				}

				if(msmt_valu === 'FAIL'){
					rec.set('msmt_valu', '0');
				}

				if(msmt_valu2 === 'OK'){
					rec.set('msmt_valu2', '1');
				}

				if(msmt_valu2 === 'Clear_Liquid'){
					rec.set('msmt_valu2', '1');
				}

				if(msmt_valu2 === 'FAIL'){
					rec.set('msmt_valu2', '0');
				}


				if(msmt_valu3 === 'OK'){
					rec.set('msmt_valu3', '1');
				}

				if(msmt_valu3 === 'Clear_Liquid'){
					rec.set('msmt_valu3', '1');
				}

				if(msmt_valu3 === 'FAIL'){
					rec.set('msmt_valu3', '0');
				}

				if(msmt_valu4 === 'OK'){
					rec.set('msmt_valu4', '1');
				}

				if(msmt_valu4 === 'Clear_Liquid'){
					rec.set('msmt_valu4', '1');
				}

				if(msmt_valu4 === 'FAIL'){
					rec.set('msmt_valu4', '0');
				}

				if(msmt_valu5 === 'OK'){
					rec.set('msmt_valu5', '1');
				}

				if(msmt_valu5 === 'Clear_Liquid'){
					rec.set('msmt_valu5', '1');
				}

				if(msmt_valu5 === 'FAIL'){
					rec.set('msmt_valu5', '0');
				}
			});

			for(var i = 0; i<store.getCount();i++){
				store.getAt(i).data.insp_type_idcd	= values.insp_type_idcd;
//				store.getAt(i).data.insp_type_name	= values.insp_type_name;
				store.getAt(i).data.wkct_insp_dvcd	= values.wkct_insp_dvcd;
//				store.getAt(i).data.wkct_idcd		= values.wkct_idcd;
				store.getAt(i).data.cstm_idcd		= values.cstm_idcd;
				store.getAt(i).data.wkod_numb		= param.wkod_numb;
				store.getAt(i).data.wkod_seqn		= param.wkod_seqn;
				store.getAt(i).data.invc_numb		= param.invc_numb;
				store.getAt(i).data.insp_date		= values.insp_date;
				store.getAt(i).data.insp_qntt		= param.istt_qntt;
				store.getAt(i).data.item_idcd		= param.item_idcd;
				store.getAt(i).data.crte_idcd		= _global.login_pk;
				store.getAt(i).data.updt_idcd		= _global.login_pk;
				store.getAt(i).data.seqn			= max_seq++;
				store.getAt(i).setDirty(true);
			}
			console.log(store.getRange());
			store.update({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					me.setResponse();
					store.reload();
					lister1.reload();
				}
			});

		}else{
			Ext.Msg.alert("알림","수정사항이 없습니다.");
		}

	}
});
