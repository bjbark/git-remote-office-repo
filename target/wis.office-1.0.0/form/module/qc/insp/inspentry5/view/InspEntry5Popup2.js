Ext.define('module.qc.insp.inspentry5.view.InspEntry5Popup2', { extend: 'Axt.popup.Search',
	id 		: 'lookup-inspentry5-popup2',
	alias	: 'widget.module-inspentry5-popup2',
	store	: 'module.qc.insp.inspentry5.store.InspEntryPopup2',

	title	: Language.get('inspEntryitem_popup','출하검사성적서 입력'),
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
						{	fieldLabel	: Language.get('invc_numb',''),
							xtype		: 'textfield',
							name		: 'invc_numb',
							hidden		: true,
						},{	fieldLabel	: Language.get('spts_numb','출고의뢰번호'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'spts_numb',
							margin		: '0 0 0 13',
							width		: 130,
							labelWidth	: 65,
							value		: me.popup.param.spts_numb,
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('spts_seqn','출고의뢰번호순서'),
							xtype		: 'textfield',
							name		: 'spts_seqn',
							value		: me.popup.param.spts_seqn,
							hidden		: true,
						},{	fieldLabel	: Language.get('spts_date','출고의뢰날짜'),
							xtype		: 'textfield',
							name		: 'spts_date',
							value		: me.popup.param.spts_date,
							hidden		: true,
						},{	fieldLabel	: Language.get('item_name','품명'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'item_name',
							width		: 200,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: me.popup.param.item_name,
							labelStyle	: 'text-align:right;padding : 0 3 0 0;',
							fieldCls    : 'readonlyfield'
						},{	xtype		: 'textfield',
							name		: 'cstm_idcd',
//							value		: me.popup.params.cstm_idcd,
							hidden		: true
						},{	fieldLabel	: Language.get('deli_date','납기일자'),
							xtype		: 'datefield',
							readOnly	: true,
							name		: 'deli_date',
							width		: 123,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: new Date(me.popup.param.deli_date),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							fieldCls   : 'readonlyfield'
						},{	fieldLabel	: Language.get('lott_numb','Lot No'),
							xtype		: 'textfield',
							readOnly	: true,
							name		: 'lott_numb',
							width		: 130,
							margin		: '0 0 0 25',
							labelWidth	: 45,
							value		: me.popup.param.lott_numb,
							labelStyle	: 'text-align:right;padding : 0 3 0 0;',
							fieldCls    : 'readonlyfield'
						},{	fieldLabel	: Language.get('trst_qntt','출하수량'),
							xtype		: 'numericfield',
							readOnly	: true,
							name		: 'trst_qntt',
							width		: 100,
							margin		: '0 0 0 15',
							labelWidth	: 45,
							value		: me.popup.param.trst_qntt,
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
					width		: 130,
					labelWidth	: 45,
					margin		: '0 0 0 15',
					value		: '4000',
					readOnly	: true,
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
					value		: me.popup.param.insp_type_name,
					clearable	: false ,
					popup		: {
						select	: 'SINGLE',
						widget	: 'lookup-insptype-popup',
						params	: { stor_grp : _global.stor_grp , line_stat : '0'},
						result	: function(records, nameField, pairField) {
							nameField.setValue(records[0].get('insp_type_name'));
							pairField.setValue(records[0].get('insp_type_idcd'));
//							me.down('[name=wkct_insp_dvcd]').setValue('4000');
						}
					}
				},{	xtype 	: 'textfield' ,
					name	: 'insp_type_idcd',
					value	: me.popup.param.insp_type_idcd,
					hidden 	: true,
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
				},{	fieldLabel	: Language.get('','검사담당자'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					width		: 160,
					labelWidth	: 60,
					margin		: '0 0 0 15',
					name		: 'insp_drtr_name',
					itemId		: 'insp_drtr_name',
					pair		: 'insp_drtr_idcd',
					clearable	: true,
					value		: _global.login_nm,
					popup		: {
						widget	: 'lookup-user-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp },
						result	: function(records, nameField, pairField) {
							nameField.setValue(records[0].get('user_name'));
							pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	xtype		: 'textfield', name : 'insp_drtr_idcd', hidden : true,
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
			master = Ext.ComponentQuery.query('module-inspentry5-lister1')[0],
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
				store		: Ext.create('module.qc.insp.inspentry5.store.InspEntry5Popup2'),
				id			: 'grid',
				itemId		: 'grid',
				name		: 'grid',
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
					},{	text: Language.get('insp_sbsc_name'		, '검사항목'		)	, dataIndex: 'insp_sbsc_name'	,  width : 100
					},{ text : Language.get('insp_cond'			, '검사조건'		)	, dataIndex: 'insp_cond'		,  width : 140
					},{ text : Language.get('insp_mthd_dvcd'	, '검사방법구분코드'	)	, dataIndex: 'insp_mthd_dvcd'	,  width : 140	, hidden:true
					},{ text : Language.get('wkct_name'			, '공정명'			)	, dataIndex: 'wkct_name'		,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_uppt'	, '검사수준(상)'	)	, dataIndex: 'insp_levl_uppt'	,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_midl'	, '검사수준(중)'	)	, dataIndex: 'insp_levl_midl'	,  width : 80	, hidden:true
					},{	text : Language.get('insp_levl_lprt'	, '검사수준(하)'	)	, dataIndex: 'insp_levl_lprt'	,  width : 80	, hidden:true
					},{	text : Language.get('goal_levl'			, '목표수준'		)	, dataIndex: 'goal_levl'		,  width : 65 	, xtype:'numericcolumn'
					},{	text : Language.get('uppr_valu'			, '상한값'			)	, dataIndex: 'uppr_valu'		,  width : 60 	, xtype:'numericcolumn'
					},{	text : Language.get('lwlt_valu'			, '하한값'			)	, dataIndex: 'lwlt_valu'		,  width : 60 	, xtype:'numericcolumn'
					},{	text : Language.get('msmt_valu'			, '측정값'			)	, dataIndex: 'msmt_valu'		,  width : 60
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
								},
								blur: function(self) {
									var grid = me.down('grid'),
										store = grid.getStore(),
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);

									var msmtValue = parseFloat(self.getValue());
									var upprValue = parseFloat(selection.get('uppr_valu'));
									var lwltValue = parseFloat(selection.get('lwlt_valu'));

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
							},
						},
						renderer: function(value, meta){
							var unit = meta.record.get('insp_sbsc_name');
							var lineSeqn = meta.record.get('line_seqn');
							if(unit == '외관검사'){
								if(value == '1'){
									value = 'PASS';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit == '색상'){
								if(value == '1'){
									value = 'BROWN';
								}else if(value == '0'){
									value = 'FAIL';
								}
							}
							if(unit.includes('Metal_')){
								if(value == '1'){
									value = 'Non Detect';
								}else if(value == '0'){
									value = 'Detected';
								}
							}
							if(unit.includes('Magnetic_Material_')){
								if(value == '1'){
									value = 'Non Detect';
								}else if(value == '0'){
									value = 'Detected';
								}
							}
							if(unit == 'Structure'){
								if(value == '1'){
									value = 'PAI-NBR';
								}else if(value == '0'){
									value = '-';
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
									var a = me.down('grid').getSelectionModel().getCurrentPosition(),
										record = me.down('grid').store.getAt(a.row),
										total = record.get('pass_qntt')+record.get('poor_qntt')
										;
									var	grid = me.down('grid');
									var	store = grid.getStore();
									var	selection = grid.getSelectionModel().getSelection()[0];
									var	row = store.indexOf(selection);
									var	passQnttColIndex = grid.columns.findIndex(col => col.dataIndex === 'pass_qntt');
									var	poorQnttColIndex = grid.columns.findIndex(col => col.dataIndex === 'poor_qntt');

									if (e.keyCode == e.ENTER || e.keyCode == 9 || e.keyCode == e.Tab ) {

										if(record.get('pass_qntt') > me.popup.param.trst_qntt){
											record.set('pass_qntt',0);
											Ext.Msg.alert("알림","합격수량이 검사수량보다 많습니다.");
											return;
										}

										if(total > me.popup.param.trst_qntt){
											record.set('pass_qntt',0);
											record.set('poor_qntt',0);
											Ext.Msg.alert("알림","검사 수량을 확인해주세요.");
											return;
										}
										grid.plugins[0].startEdit(row, grid.columns[poorQnttColIndex]);
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

									var	grid = me.down('grid');
									var	store = grid.getStore();
									var	selection = grid.getSelectionModel().getSelection()[0];
									var	row = store.indexOf(selection);
									var	passQnttColIndex = grid.columns.findIndex(col => col.dataIndex === 'pass_qntt');
									var	poorQnttColIndex = grid.columns.findIndex(col => col.dataIndex === 'poor_qntt');
									var msmtValuColIndex = grid.columns.findIndex(col => col.dataIndex === 'msmt_valu');

									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										if(record.get('poor_qntt') > me.popup.param.trst_qntt){
											record.set('poor_qntt',0);
											Ext.Msg.alert("알림","불량수량이 검사수량보다 많습니다.");
											return;
										}

										if(total > me.popup.param.trst_qntt){
											record.set('pass_qntt',0);
											record.set('poor_qntt',0);
											Ext.Msg.alert("알림","검사 수량을 확인해주세요.");
											return;
										}

										if(msmtValuColIndex !== -1) {
											var nextRow = row + 1;
											if (nextRow < store.getCount()) {
												grid.plugins[0].startEdit(nextRow, grid.columns[msmtValuColIndex]);
											}
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
			lister1	= Ext.ComponentQuery.query('module-inspentry5-lister1')[0].getStore(),
			store	= me.down('#grid').getStore(),
			changes = store.getUpdatedRecords().length,
			param 	= me.popup.param,
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
			var new_invc_numb;

			Ext.each(store.getUpdatedRecords(),function(rec){
				var msmt_valu = rec.get('msmt_valu');
				if(msmt_valu === 'PASS' || msmt_valu === 'BROWN' || msmt_valu === 'Non Detect' || msmt_valu === 'PAI-NBR'){
					rec.set('msmt_valu', '1');
				}

				if(msmt_valu === 'FAIL' || msmt_valu === 'Detected' || msmt_valu === '-'){
					rec.set('msmt_valu', '0');
				}
			});

			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'ostt_insp'
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					new_invc_numb = result.records[0].seq;
				}
			});

			for(var i = 0; i<store.getCount();i++){
				store.getAt(i).data.invc_numb = new_invc_numb;
				store.getAt(i).data.seqn      = max_seq++;
				store.getAt(i).data.bzpl_idcd = param.bzpl_idcd;
				store.getAt(i).data.acpt_numb = param.acpt_numb;
				store.getAt(i).data.acpt_seqn = param.acpt_seqn;
				store.getAt(i).data.spts_numb = param.spts_numb;
				store.getAt(i).data.spts_seqn = param.spts_seqn;
				store.getAt(i).data.spts_date = param.spts_date;
				store.getAt(i).data.item_idcd = param.item_idcd;
				store.getAt(i).data.spts_qntt = param.trst_qntt;
				store.getAt(i).data.deli_date = param.deli_date;

				store.getAt(i).data.insp_type_idcd = values.insp_type_idcd;
				store.getAt(i).data.insp_drtr_idcd = values.insp_drtr_idcd;
				store.getAt(i).data.insp_qntt = store.getAt(i).data.pass_qntt + store.getAt(i).data.poor_qntt;
				store.getAt(i).data.crte_idcd = _global.login_pk;
				store.getAt(i).data.updt_idcd = _global.login_pk;

				store.getAt(i).setDirty(true);
			}

			store.sync({
				success : function(records, operation){
				}, /* 저장 성공시 */
				failure : function(operation){ results.feedback({success : false });},
				callback: function(operation){
					me.setResponse();
					store.reload();
					lister1.reload();
				}
			});

//			store.update({
//				success : function(operation){ },
//				failure : function(operation){ },
//				callback: function(operation){
//					me.setResponse();
//					store.reload();
//					lister1.reload();
//				}
//			});

		}else{
			Ext.Msg.alert("알림","수정사항이 없습니다.");
		}

	}
});
