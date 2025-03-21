/**
 */
Ext.define('module.qc.insp.inspentry2.view.InspTypeItemPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-inspentry2-insptypeitem',
	alias	: 'widget.module-inspentry2-insptypeitem',
	store	: 'module.qc.insp.inspentry2.store.InspTypeItemPopup',

	title	: Language.get('insptypeitem_popup','검사성적서 입력'),
	closable: true,
	autoShow: true,
	width	: 800,
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
						{	fieldLabel	: Language.get('invc_numb','지시번호'),
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
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('','지시일자'),
							xtype		: 'datefield',
							readOnly	: true,
							name		: 'pdod_date',
							width		: 123,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: new Date(me.popup.params.pdod_date),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('indn_qntt','지시수량'),
							xtype		: 'numericfield',
							readOnly	: true,
							name		: 'indn_qntt',
							width		: 123,
							margin		: '0 0 0 95',
							labelWidth	: 45,
							value		: me.popup.params.indn_qntt,
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
					lookupValue	: resource.lookup('wkct_insp_dvcd'),
							listeners:{
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
											grid.columns[12].show();
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
						}
					}
				},{	name		: 'insp_type_idcd', xtype : 'textfield' , hidden : true, value:me.popup.params.insp_type_idcd,
					listeners:{
						change:function(){
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
				},{	fieldLabel	: Language.get('',''),
					name		: 'insp_strt_time',
					xtype		: 'timefield',
					labelWidth	: 45,
					format		: 'H:i',
					submitFormat: 'Hi',
					increment	: 30,
					anchor		: '100%',
					margin		: '0 0 0 2',
					width		: 60,
					value		: '00:00'
				},{	fieldLabel	: Language.get('judt_dvcd','판정구분'),
					xtype		: 'lookupfield',
					width		: 125,
					labelWidth	: 45,
					margin		: '0 0 0 15',
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

//				,{	fieldLabel	: '공정명'	,
//					xtype		: 'popupfield',
//					editable	: true,
//					enableKeyEvents : true,
//					width		: 150,
//					labelWidth	: 45,
//					margin		: '0 0 0 15',
//					name		: 'wkct_name',
//					pair		: 'wkct_idcd',
//					value		: me.popup.params.wkct_name,
//					clearable	: false ,
//					popup		: {
//						select	: 'SINGLE',
//						widget	: 'lookup-wkct-popup',
//						params	: { stor_grp : _global.stor_grp , line_stat : '0' },
//						result	: function(records, nameField, pairField) {
//							nameField.setValue(records[0].get('wkct_name'));
//							pairField.setValue(records[0].get('wkct_idcd'));
//						}
//					}
//				},{ xtype	: 'textfield' , name	: 'wkct_idcd' , hidden	: true }
			// 기타 검색 조건이 필요한 경우
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
			master = Ext.ComponentQuery.query('module-inspentry2-lister')[0],
			selectMaster = master.getSelectionModel().getSelection()[0],
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: { selType: 'cellmodel'},
				features	: [{ ftype : 'grid-summary' }],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

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
					{	text: Language.get('line_seqn'			, '순번'			)	, dataIndex: 'line_seqn'		,  width : 50 , align:'center'
					},{	text: Language.get('insp_sbsc_name'		, '검사항목'		)	, dataIndex: 'insp_sbsc_name'	,  width : 100
					},{ text : Language.get('insp_cond'			, '검사조건'		)	, dataIndex: 'insp_cond'		,  width : 140
					},{ text : Language.get('wkct_name'			, '공정명'			)	, dataIndex: 'wkct_name'		,  width : 80,hidden:true
					},{	text: Language.get('insp_levl_uppt'		, '검사수준(상)'	)	, dataIndex: 'insp_levl_uppt'	,  width : 80,hidden:true
					},{	text: Language.get('insp_levl_midl'		, '검사수준(중)'	)	, dataIndex: 'insp_levl_midl'	,  width : 80,hidden:true
					},{	text: Language.get('insp_levl_lprt'		, '검사수준(하)'	)	, dataIndex: 'insp_levl_lprt'	,  width : 80,hidden:true
					},{	text: Language.get('goal_levl'			, '목표수준'		)	, dataIndex: 'goal_levl'		,  width : 65 ,xtype:'numericcolumn'
					},{	text: Language.get('uppr_valu'			, '상한값'			)	, dataIndex: 'uppr_valu'		,  width : 60 ,xtype:'numericcolumn'
					},{	text: Language.get('lwlt_valu'			, '하한값'			)	, dataIndex: 'lwlt_valu'		,  width : 60 ,xtype:'numericcolumn'
					},{	text: Language.get('msmt_valu_1fst'		, 'x1'			), dataIndex: 'msmt_valu_1fst'		,  width : 60
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
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						},
					},{	text: Language.get('msmt_valu_2snd', 'x2')	, dataIndex: 'msmt_valu_2snd',  width : 60
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
										grid.plugins[0].startEdit(row, grid.columns[12]);
									}
								}
							}
						},
					},{	text: Language.get('msmt_valu_3trd', 'x3')	, dataIndex: 'msmt_valu_3trd',  width : 60
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
										grid.plugins[0].startEdit(row, grid.columns[13]);
									}
								}
							}
						},
					},{	text: Language.get('msmt_valu_4frt', 'x4'	)	, dataIndex: 'msmt_valu_4frt'	,  width : 60
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
										grid.plugins[0].startEdit(row, grid.columns[14]);
									}
								}
							}
						},
					},{	text: Language.get('msmt_valu_5fit', 'x5')	, dataIndex: 'msmt_valu_5fit'	,  width : 60
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
										grid.plugins[0].startEdit(row, grid.columns[15]);
									}
								}
							}
						},
					},{ text : Language.get('wkct_idcd'			,'공정번호')		, dataIndex: 'wkct_idcd'		, width : 80 , align : 'center',hidden:true
					},{ text : Language.get('insp_cvic_idcd'	,'설비번호')		, dataIndex: 'insp_cvic_idcd'	, width : 80 , align : 'center',hidden:true
					},{	text: Language.get('good_qntt', '양품수량')	, dataIndex: 'good_qntt'	,  width : 70,xtype:'numericcolumn',hidden:true
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents: true ,
							listeners:{
								blur:function(){
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);
									var total = this.getValue()+record.get('poor_qntt');
									if(total > selectMaster.get('indn_qntt')){
										Ext.Msg.alert("알림","양품수량을 확인해주세요.");
										this.setValue(0);
//										record.set('poor_qntt',0);
									}
								},
								keydown : function(self, e) {
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);

									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var total = record.get('good_qntt')+record.get('poor_qntt');
										if(total > selectMaster.get('indn_qntt')){
											Ext.Msg.alert("알림","양품수량을 확인해주세요.");
											record.set('good_qntt',0);
//											record.set('poor_qntt',0);
										}
									}
								}
							}
						},
					},{	text: Language.get('poor_qntt', '불량수량')	, dataIndex: 'poor_qntt'	,  width : 70,xtype:'numericcolumn',hidden:true
						, tdCls : 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: true,
							enableKeyEvents: true ,
							listeners:{
								blur:function(){
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);
									var total = this.getValue()+record.get('good_qntt');
									if(total > selectMaster.get('indn_qntt')){
										Ext.Msg.alert("알림","불량수량을 확인해주세요.");
										this.setValue(0);
//										record.set('good_qntt',0);
									}
								},
								keydown : function(self, e) {
									var a = me.down('grid').getSelectionModel().getCurrentPosition();
									var record = me.down('grid').store.getAt(a.row);
									var total = record.get('good_qntt')+record.get('poor_qntt');
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										if(total > selectMaster.get('indn_qntt')){
											Ext.Msg.alert("알림","불량수량을 확인해주세요.");
//											record.set('good_qntt',0);
											record.set('poor_qntt',0);
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
						, tdCls : 'editingcolumn',
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
					},{ text: Language.get('insp_strt_time'		, '검사시간')	, dataIndex : 'insp_strt_time'	, width:  80, align:'center',
						tdCls	: 'editingcolumn',
						hidden	: true,
						editor	: {
							xtype		:'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							selectOnFocus: true,
							allowBlank	: false,
						},
						renderer:Ext.util.Format.dateRenderer('H:i')
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
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= me.down('grid').getStore(),
			changes = store.getUpdatedRecords().length,
			param = me.popup.params,
			max_seq
		;
		if(changes != 0){
			if(values.wkct_insp_dvcd == ''){
				Ext.Msg.alert("알림","검사구분을 선택해주세요.");
				return;
			}
			if(values.insp_type_idcd == ''){
				Ext.Msg.alert("알림","검사항목을 선택해주세요.");
				return;
			}
			if(values.insp_strt_time == ''){
				Ext.Msg.alert("알림","검사시간을 선택해주세요.");
				return;
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/qc/insp/inspentry2/get/wkct_insp_seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						wkod_numb		: param.wkod_numb,
						wkct_insp_dvcd	: values.wkct_insp_dvcd
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
						max_seq = result.records[0].seqn;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			for(var i = 0; i<changes;i++){
				store.getUpdatedRecords()[i].data.insp_strt_time	= values.insp_strt_time;
				store.getUpdatedRecords()[i].data.insp_type_idcd	= values.insp_type_idcd;
				store.getUpdatedRecords()[i].data.insp_type_name	= values.insp_type_name;
				store.getUpdatedRecords()[i].data.wkct_insp_dvcd	= values.wkct_insp_dvcd;
//				store.getUpdatedRecords()[i].data.wkct_idcd			= values.wkct_idcd;
				store.getUpdatedRecords()[i].data.wkod_numb			= param.wkod_numb;
				store.getUpdatedRecords()[i].data.invc_numb			= param.invc_numb;
				store.getUpdatedRecords()[i].data.insp_date			= values.insp_date;
				store.getUpdatedRecords()[i].data.indn_qntt			= param.indn_qntt;
				store.getUpdatedRecords()[i].data.item_idcd			= param.item_idcd;
				store.getUpdatedRecords()[i].data.crte_idcd			= _global.login_pk;
				store.getUpdatedRecords()[i].data.updt_idcd			= _global.login_pk;
				store.getUpdatedRecords()[i].data.seqn				= max_seq;
			}
			store.sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					me.setResponse();
					store.reload();
				}
			});

		}else{
			Ext.Msg.alert("알림","수정사항이 없습니다.");
		}

	}
});
