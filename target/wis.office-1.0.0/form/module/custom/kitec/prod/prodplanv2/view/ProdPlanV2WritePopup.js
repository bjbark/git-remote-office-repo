Ext.define('module.custom.kitec.prod.prodplanv2.view.ProdPlanV2WritePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-prodplanv2-write-popup',
	store	: 'module.custom.kitec.prod.prodplanv2.store.ProdPlanV2Write',
	title	: '생산계획 작성' ,
	closable: true,
	autoShow: true,
	width	: 1228,
	height	: 600,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(),me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				store2 = this.down('[name=grid2]').getStore(),
				sum_field = this.down('[name=sum_qntt]'),
				upid_field = this.down('[name=upid_qntt]'),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id}, this.popup.params )
			;

			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
					var sum_qntt=0;
					var upid_qntt=0;
					for(var i=0;i<records.length;i++){
						sum_qntt = sum_qntt+Number(records[i].data.invc_qntt);
						upid_qntt = upid_qntt+Number(records[i].data.qntt);
					}
					sum_field.setValue(sum_qntt);
					upid_field.setValue(upid_qntt);
				}
			});
		},
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'south',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype : 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       ,cls: 'button-style'}
					]
				}
			],
			items : [me.editorForm2(),me.createGrid2()],
		};
		return form;
	},

	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				height		: 227,
				name		: 'grid1',
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	:{ selType: 'checkboxmodel', mode : 'MULTI' },
				store		: Ext.create( me.store ),
				paging		:{
					xtype : 'grid-paging'
				},
				columns : [
					{	dataIndex : 'seqn'			, width:  40, text: Language.get('seqn'			,	'순번'		) , align:'center'
					},{	dataIndex : 'line_seqn'		, width:  40, text: Language.get('line_seqn'	,	'번호'		) , align:'center', hidden : true
					},{	dataIndex : 'cstm_lott_numb', width: 100, text: Language.get('cstm_lott_numb',	'고객LOT 번호') , align:'center'
					},{	dataIndex : 'item_code'		, width: 100, text: Language.get('item_code'	,	'품목코드'	) , align:'center'
					},{	dataIndex : 'item_name'		, width: 250, text: Language.get('item_name'	,	'품명'		) , align:'left'
					},{	dataIndex : 'item_spec'		, width:  60, text: Language.get('item_spec'	,	'규격'		) , align:'left'
					},{	dataIndex : 'invc_qntt'		, width:  80, text: Language.get('invc_qntt'	,	'발주수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'qntt'			, width:  80, text: Language.get('qntt'			,	'미납수량'	) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum'
					},{	dataIndex : 'deli_date'		, width:  80, text: Language.get('deli_date'	,	'협력사납기'	) , align:'center', hidden : true
					},{	dataIndex : 'deli_date'		, width:  80, text: Language.get('cstm_deli_date',	'납기일자'	) , align:'center'
					},{	dataIndex : 'invc_date'		, width:  80, text: Language.get('acpt_date'	,	'수주일자'	) , align:'center'
					},{	dataIndex : 'drtr_name'		, width:  80, text: Language.get('cstm_drtr_name',	'담당자'		) , align:'center'
					},{	dataIndex : 'line_stat'		, width:  60, text: Language.get('line_stat'	,	'상태'		) , xtype: 'lookupcolumn'  , lookupValue : resource.lookup('line_stat'), align:'center'
					},{	dataIndex : 'user_memo'		, width:  80, text: Language.get('user_memo'	,	'후공정'		) , align:'center' , hidden : true
					},{	dataIndex : 'deli_chge_resn', width:  80, text: Language.get('deli_chge_resn',	'납기변동사유'	), align:'center' , hidden : true
					},{	dataIndex : 'invc_pric'		, width:  80, text: Language.get('invc_pric'	,	'단가'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum', style: 'text-align:center'
					},{	dataIndex : 'invc_amnt'		, width:  80, text: Language.get('invc_amnt'	,	'금액'		) , xtype: 'numericcolumn', align : 'right', summaryType: 'sum', style: 'text-align:center'
					},{	dataIndex : 'invc_numb'		, width: 150, text: Language.get('pdsd_numb'	,	'생산계획번호'	) , align:'center', hidden : true
					},{	dataIndex : 'stok_used_qntt', width:  80, text: Language.get('stok_used_qntt',	'재고사용'	) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
					},{	dataIndex : 'plan_qntt'		, width:  80, text: Language.get('plan_qntt'	,	'계획수량'	) , align:'center', xtype : 'numericcolumn' , summaryType : 'sum',hidden : true
					},{	dataIndex : 'plan_date'		, width:  80, text: Language.get('plan_date'	,	'시작일시'	) , align:'center',hidden : true
					},{	dataIndex : 'cmpl_schd_date', width:  80, text: Language.get('cmpl_schd_date',	'완료일시'	) , align:'center',hidden : true
					},{	dataIndex : 'item_idcd'		, width:  80, text: Language.get('item_idcd'	,	'품목id'		) , align:'center',hidden : true
					},{	dataIndex : 'cvic_idcd'		, width:  80, text: Language.get('cvic_idcd'	,	'설비id'		) , align:'center',hidden : true
					},{	dataIndex : 'cvic_name'		, width:  80, text: Language.get('cvic_name'	,	'설비명'		) , align:'center',hidden : true
					},{	dataIndex : 'item_lcls_idcd', width:  80, text: Language.get('item_lcls_idcd',	'품목대분류'	) , align:'center',hidden : true
					},{	dataIndex : 'item_mcls_idcd', width:  80, text: Language.get('item_mcls_idcd',	'품목중분류'	) , align:'center',hidden : true
					},{	dataIndex : 'item_scls_idcd', width:  80, text: Language.get('item_scls_idcd',	'품목소분류'	) , align:'center',hidden : true
					},{	dataIndex : 'cstm_idcd'		, width:  80, text: Language.get('cstm_idcd'	,	'거래처'		) , align:'center',hidden : true
					}
				]
			}
		;
		return grid;
	},

	createGrid2: function(){
		var  me = this,
		grid = {
			xtype		: 'grid-panel',
			header		: false,
			region		: 'south',
			name		: 'grid2',
			height		: 253,
			plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
			viewConfig	: {
				loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask })
			},
			selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
			store		: Ext.create( 'module.custom.kitec.prod.prodplanv2.store.ProdPlanV2Entry' ),
			paging		:{
				xtype : 'grid-paging'
			},
			listeners	: {
				render : function(){
					var popup = Ext.ComponentQuery.query('module-prodplanv2-write-popup')[0],
						store2 = popup.down('[name=grid2]').getStore(),
						item_idcd = popup.params.item_idcd[0],
						stok_qntt
					;
					store2.load({ // 동작확인완료
						params : { param:JSON.stringify({item_idcd : item_idcd}) },
						scope:this,
						callback:function(records, operation, success) {
						}
					});
				},
				edit: function(editor, context) {
					var popup  = Ext.ComponentQuery.query('module-prodplanv2-write-popup')[0],
						store = popup.down('[name=grid1]').getStore(),
						store2 = popup.down('[name=grid2]').getStore(),
						stok_used_qntt = popup.down('[name=stok_used_qntt]').getValue(),
						plan_qntt_1fst = popup.down('[name=plan_qntt_1fst]').getValue(),
						plan_qntt= popup.down('[name=plan_qntt]').getValue(),
						total = 0,L_hap = 0, R_hap = 0,r_total = 0, l_total = 0;
					var grid = this;
					var pos = this.view.getSelectionModel().getCurrentPosition().row;
					var models = grid.getStore().getRange();
					var total = 0;
					var L_stock = 0;
					var R_stock = 0;


					store2.each(function(find){
						if(find.get('ostt_qntt') > 0 || find.get('ostt_qntt_1fst') > 0){
							l_total += find.get('ostt_qntt');
							r_total += find.get('ostt_qntt_1fst');
						}
					});

					total = l_total + r_total;

					store.each(function(find){
						if(find.get('item_spec').toUpperCase() == 'RH'){
							R_hap += find.get('invc_qntt');
						}else{
							L_hap += find.get('invc_qntt');
						}
					});

					if(context.field == 'ostt_qntt'){
						if(context.value < 0){
							models[pos].set('ostt_qntt',0);
						}else if (models[pos].get('stok_qntt') < context.value || L_hap < context.value){
							var plan_qntt = popup.down('[name=plan_qntt]').getValue();
							Ext.Msg.alert("알림","수량을 확인하여 주십시오.");
							models[pos].set('ostt_qntt',0);
							popup.down('[name=stok_used_qntt]').setValue(total- context.value);
							popup.down('[name=plan_qntt]').setValue(plan_qntt);
						}else{
							popup.down('[name=stok_used_qntt]').setValue(total);
							popup.down('[name=plan_qntt]').setValue(L_hap-l_total);
						}
					}

					if(context.field == 'ostt_qntt_1fst'){
						if(context.value < 0){
							models[pos].set('ostt_qntt_1fst',0);
						}else if (models[pos].get('stok_qntt_1fst') < context.value || R_hap < context.value){
							var plan_qntt_1fst = popup.down('[name=plan_qntt_1fst]').getValue();
							Ext.Msg.alert("알림","수량을 확인하여 주십시오.");
							models[pos].set('ostt_qntt_1fst',0);
							popup.down('[name=stok_used_qntt]').setValue(total- context.value);
							popup.down('[name=plan_qntt_1fst]').setValue(plan_qntt_1fst);
						}else{
							popup.down('[name=stok_used_qntt]').setValue(total);
							popup.down('[name=plan_qntt_1fst]').setValue(R_hap-r_total);
						}
					}
				},
			},
			columns : [
				{	dataIndex : 'wkct_name', width: 152, text: Language.get('wkct'		,	'공정명'		) , align:'left'  , style: 'text-align:center'
				},{	dataIndex : 'lott_numb', width: 115, text: Language.get('lott_numb'	,	'LOT 번호'	) , align:'center', style: 'text-align:center'
				},{	dataIndex : 'invc_date', width:  88, text: Language.get('invc_date'	,	'생산일자'	) , align:'center', style: 'text-align:center'
				},{	dataIndex : 'prod_qntt', width:  90, text: '<span style ="padding-left: 5;">'+Language.get('prod_qntt'	,	'생산수량 (L)'	)+'</span>' , align:'right', style: 'text-align:center', xtype: 'numericcolumn'
				},{	dataIndex : 'used_qntt', width: 100, text: '<span style ="padding-left: 5;">'+Language.get('used_qntt'	,	'사용한수량 (L)'	)+'</span>' , align:'right', style: 'text-align:center', xtype: 'numericcolumn'
				},{	dataIndex : 'stok_qntt', width:  90, text: '<span style ="padding-left: 5;">'+Language.get('stok_qntt'	,	'재고수량 (L)'	)+'</span>' , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',style: 'text-align:center'
				},{	dataIndex : 'ostt_qntt', width: 100, text: '<span style ="padding-left: 5;">'+Language.get('ostt_qntt'	,	'사용할수량 (L)'	)+'</span>' , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',style: 'text-align:center',
					tdCls	: 'editingcolumn',
					editor		: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = this.up('grid').store,
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									//확인필요
									grid.plugins[0].startEdit(row+1, grid.columns[6]);
								}
							},
						}
					},
				},{	dataIndex : 'prod_qntt_1fst', width:  90, text: '<span style ="padding-left: 5;">'+Language.get('prod_qntt'	,	'생산수량 (R)'	)+'</span>' , align:'right', style: 'text-align:center', xtype: 'numericcolumn'
				},{	dataIndex : 'used_qntt_1fst', width: 100, text: '<span style ="padding-left: 5;">'+Language.get('used_qntt'	,	'사용한수량 (R)'	)+'</span>' , align:'right', style: 'text-align:center', xtype: 'numericcolumn'
				},{	dataIndex : 'stok_qntt_1fst', width:  90, text: '<span style ="padding-left: 5;">'+Language.get('stok_qntt'	,	'재고수량 (R)'	)+'</span>' , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',style: 'text-align:center'
				},{	dataIndex : 'ostt_qntt_1fst', width: 100, text: '<span style ="padding-left: 5;">'+Language.get('ostt_qntt'	,	'사용할수량 (R)'	)+'</span>' , xtype: 'numericcolumn', align : 'right', summaryType: 'sum',style: 'text-align:center',
					tdCls	: 'editingcolumn',
					editor		: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
										store = this.up('grid').store,
										selection = grid.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection);
									//확인필요
									grid.plugins[0].startEdit(row+1, grid.columns[6]);
								}
							},
						}
					},
				}
			],
		}
		;
		return grid;
	},

	editorForm2 : function () {
		var me	= this;
		var form = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				layout	: { type: 'hbox', align: 'stretch' },
				height	: 58,
				itemId	: 'searchform',
				items	: [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 100,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '재고사용수량' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'numericfield',
								margin	: '0 0 0 0',
								height	: 23,
								value	: 0,
								name	: 'stok_used_qntt',
								readOnly: false,
								enableKeyEvents : true,
								listeners: {
									blur : function(self, value) {
										var panel = self.up('form')
											used_qntt = (Number(panel.down('[name=sum_qntt]').getValue())-Number(value)),
											plan_qntt = Number(panel.down('[name=plan_qntt]').getValue()),
											popup  = Ext.ComponentQuery.query('module-prodplanv2-write-popup')[0],
											store = popup.down('[name=grid1]').getStore(),
											store2 = popup.down('[name=grid2]').getStore(),
											total = 0,L_hap = 0, R_hap = 0,r_total = 0, l_total = 0;

											store2.each(function(find){
												if(find.get('ostt_qntt') > 0 || find.get('ostt_qntt_1fst') > 0){
													l_total += find.get('ostt_qntt');
													r_total += find.get('ostt_qntt_1fst');
												}
											});

											total = l_total + r_total;

											store.each(function(find){
												if(find.get('item_spec').toUpperCase() == 'RH'){
													R_hap += find.get('invc_qntt');
												}else{
													L_hap += find.get('invc_qntt');
												}
											});

										;

										if(value < 0){
											this.setValue(0);
										}
										if(used_qntt < 0){
											Ext.Msg.alert("알림", "재고수량을 다시 입력해주십시오.");
											panel.down('[name=stok_used_qntt]').setValue(0);
											used_qntt = (Number(panel.down('[name=sum_qntt]').getValue())-Number(0));
										};

										panel.down('[name=stok_used_qntt]').setValue(total);
									},
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 100,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '계획수량 (L)' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'numericfield',
								margin	: '0 0 0 0',
								height	: 23,
								name	: 'plan_qntt',
								listeners : {
									change : function(self){
										var panel = self.up('form');
										var value = this.getValue();
										var store = me.down('[name=grid1]').getStore();
										var stok_used_qntt = panel.down('[name=stok_used_qntt]').getValue();
										var plan_qntt = panel.down('[name=plan_qntt]').getValue();
										var plan_qntt_1fst = panel.down('[name=plan_qntt_1fst]').getValue();
										var upid_qntt = panel.down('[name=upid_qntt]').getValue();
										var chk = 0, sum = 0;

										if(value < 0){
											this.setValue(0);
										}

										store.each(function(record){
											if(record.get('item_spec').toUpperCase() != 'RH'){
												sum += Number(record.get('invc_qntt'));
												chk++;
											}
										});

										if(chk == 0 && value > 0){
											Ext.Msg.alert("알림","규격을 확인하여 주시기 바랍니다.");
											panel.down('[name=plan_qntt]').setValue(0);
										}

										if(plan_qntt == 0 && plan_qntt_1fst == 0 && stok_used_qntt > 0){
											panel.down('[name=prod_line_idcd]').setValue('WFRCL0004');
											panel.down('[name=prod_line_name]').setValue('가공');
										}
										if(plan_qntt > 0 || plan_qntt_1fst > 0){
											console.log(plan_qntt);
											console.log(plan_qntt_1fst);
											console.log(stok_used_qntt);
											panel.down('[name=prod_line_idcd]').setValue('WFRCL0003');
											panel.down('[name=prod_line_name]').setValue('주조->가공');
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 100,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '계획수량 (R)' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'numericfield',
								margin	: '0 0 0 0',
								height	: 23,
								name	: 'plan_qntt_1fst',
								listeners : {
									change : function(self){
										var panel = self.up('form');
										var value = this.getValue();
										var store = me.down('[name=grid1]').getStore();
										var plan_qntt = panel.down('[name=plan_qntt]').getValue();
										var plan_qntt_1fst = panel.down('[name=plan_qntt_1fst]').getValue();
										var stok_used_qntt = panel.down('[name=stok_used_qntt]').getValue();
										var upid_qntt = panel.down('[name=upid_qntt]').getValue();
										var chk = 0, sum = 0;

										if(value < 0){
											this.setValue(0);
										}

										store.each(function(record){
											if(record.get('item_spec') == 'LH' || record.get('item_spec') == '' ||
												record.get('item_spec') == null){
											}else{
												chk++;
												sum += record.get('invc_qntt');
											}
										});

										if(chk == 0 && value > 0){
											Ext.Msg.alert("알림","규격을 확인하여 주시기 바랍니다.");
											panel.down('[name=plan_qntt_1fst]').setValue(0);
										}

										if(plan_qntt == 0 && plan_qntt_1fst == 0 && stok_used_qntt > 0){
											panel.down('[name=prod_line_idcd]').setValue('WFRCL0004');
											panel.down('[name=prod_line_name]').setValue('가공');
										}
										if(plan_qntt > 0 || plan_qntt_1fst > 0){
											console.log(plan_qntt);
											console.log(plan_qntt_1fst);
											console.log(stok_used_qntt);
											panel.down('[name=prod_line_idcd]').setValue('WFRCL0003');
											panel.down('[name=prod_line_name]').setValue('주조->가공');
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 100,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						hidden	: true,
						items	: [
							{	text	: '미납수량' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'numericfield',
								margin	: '0 0 0 0',
								height	: 23,
								name	: 'qntt',
								readOnly: false,
								fieldCls: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 90,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '시작일자' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height		: 20
							},{	xtype		: 'datefield',
								margin		: '0 0 0 0',
								height		: 23,
								name		: 'plan_sttm1',
								readOnly	: false,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								fieldCls	: 'readonlyfield',
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											plan_sttm1 = panel.down('[name=plan_sttm1]').getValue()
											plan_sttm = Ext.Date.format(plan_sttm1, 'Ymd'),
											plan_edtm1 = panel.down('[name=plan_edtm1]').getValue()
											plan_edtm = Ext.Date.format(plan_edtm1, 'Ymd')
										;
										if(plan_edtm!=''){
											if(plan_sttm > plan_edtm){
												Ext.Msg.alert("알림", "시작일자를 다시 입력해주십시오.");
												panel.down('[name=plan_sttm1]').setValue(0);
											};
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 80,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						hidden	: true,
						items	: [
							{	text		: '시작시간' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height		: 20
							},{	xtype		: 'timefield',
								margin		: '0 0 0 0',
								height		: 23,
								name		: 'plan_sttm2',
								readOnly	: false,
								fieldCls	: 'readonlyfield',
								format		: 'H:i',
								submitFormat: 'H:i',
//								value		: '0900',
								increment	: 30,
								anchor		: '100%',
								fieldStyle	: 'text-align: center;'
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 80,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text		: '우선순위' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height		: 20
							},{	xtype		: 'textfield',
								margin		: '0 0 0 0',
								height		: 23,
								name		: 'pref_rank',
								readOnly	: false,
//								value		: '0900',
								increment	: 30,
								anchor		: '100%',
								fieldStyle	: 'text-align: center;'
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 90,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						hidden	: true,
						items	: [
							{	text		: '완료일자' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height		: 20
							},{	xtype		: 'datefield',
								margin		: '0 0 0 0',
								height		: 23,
								name		: 'plan_edtm1',
								readOnly	: false,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								fieldCls	: 'readonlyfield',
								listeners: {
									change : function(self, value) {
										var panel = self.up('form')
											plan_sttm1 = panel.down('[name=plan_sttm1]').getValue()
											plan_sttm = Ext.Date.format(plan_sttm1, 'Ymd'),
											plan_edtm1 = panel.down('[name=plan_edtm1]').getValue()
											plan_edtm = Ext.Date.format(plan_edtm1, 'Ymd')
										;
										if(plan_sttm > plan_edtm){
											Ext.Msg.alert("알림", "완료일자를 다시 입력해주십시오.");
											panel.down('[name=plan_edtm1]').setValue(0);
										};

									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 80,
						height	: 120,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						hidden	: true,
						items	: [
							{	text		: '완료시간' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height		: 20
							},{	xtype		: 'timefield',
								margin		: '0 0 0 0',
								height		: 23,
								name		: 'plan_edtm2',
								readOnly	: false,
								format		: 'H:i',
								submitFormat: 'H:i',
//								value		: '18:00',
								fieldCls	: 'readonlyfield',
								increment	: 30,
								anchor		: '100%',
								fieldStyle	: 'text-align: center;'
							}
						]
					},{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' },
							width	: 145,
							height	: 120,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
							margin	: '3 0 3 3',
							items	: [
								{	text		: '생산라인' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
									height		: 20
								},{	xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									margin		: '0 0 0 0',
									height		: 23,
									readOnly	: false,
									name		: 'prod_line_name',
									pair		: 'prod_line_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: true,
									popup 		: {
										widget	: 'lookup-wkfw-popup',
										select	: 'SINGLE',
										params	: { stor_id : _global.stor_id },
										result	: function(records, nameField, pairField ){

											nameField.setValue(records[0].get('wkfw_name'));
											pairField.setValue(records[0].get('wkfw_idcd'));
										}
									}
								},{	xtype : 'textfield',  name : 'prod_line_idcd' , hidden: true
								}
							]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 352,
						height	: 120,
						hidden	: true,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '비고' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'textarea',
								margin	: '0 0 0 0',
								height	: 23,
								name	: 'user_memo',
								readOnly: false,
								fieldCls: 'readonlyfield',
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 340,
						height	: 120,
						hidden	: true,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: 'invoic번호' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'textfield',
								margin	: '0 0 0 0',
								height	: 40,
								name	: 'invc_numb',
								readOnly: false,
								hidden	: false,
								fieldCls: 'readonlyfield'
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 340,
						height	: 120,
						hidden	: true,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '품목코드' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'textfield',
								margin	: '0 0 0 0',
								height	: 40,
								name	: 'item_idcd',
								readOnly: false,
								hidden	: false,
								fieldCls: 'readonlyfield'
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 340,
						height	: 120,
						hidden	: true,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '수주번호' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'textfield',
								margin	: '0 0 0 0',
								height	: 40,
								name	: 'acpt_numb',
								readOnly: false,
								hidden	: false,
								fieldCls: 'readonlyfield'
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						width	: 340,
						height	: 120,
						hidden	: true,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
						margin	: '3 0 3 3',
						items	: [
							{	text	: '수주순번' , xtype : 'label',	style : 'text-align:center;, font-size: 13px !important;font-weight:bold;, background-color:silver;',
								height	: 20
							},{	xtype	: 'numericfield',
								margin	: '0 0 0 0',
								height	: 40,
								name	: 'acpt_seqn',
								readOnly: false,
								hidden	: false,
								fieldCls: 'readonlyfield'
							}
						]
					},{xtype : 'textfield', name : '_set'		, hidden : true
					},{xtype : 'textfield', name : 'sum_qntt'	, hidden : true
					},{xtype : 'textfield', name : 'upid_qntt'	, hidden : true
					},{xtype : 'textfield', name : 'seqn'		, hidden : true
					}
				]
			}
		;
		return form;
	},

	//조회
	selectAction : function(){
		var  me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
	},

	//확인
	finishAction: function(){
		var me = this,
			_set,
			selects = me.down('grid').getSelectionModel().getSelection()[0],
			invc_numb,
			store = me.down('grid').getStore(),
			store2 = me.down('[name=grid2]').getStore(),
			product = new Array(),
			item_idcd = store.data.items[0].data.item_idcd,
			cstm_idcd = store.data.items[0].data.cstm_idcd,
			lister1 = Ext.ComponentQuery.query('module-prodplanv2-lister1')[0],
			records = [],wk_records = [],
			a =  me.down('[name=plan_qntt]').getValue()
			b =  me.down('[name=plan_qntt_1fst]').getValue(),
			Lsum = 0, Rsum = 0,Lhap = 0, Rhap= 0;
		;

		store.each(function(record){
			if(record.get('item_spec').toUpperCase() == 'RH'){
				Rsum += record.get('invc_qntt');
			}else{
				Lsum += record.get('invc_qntt');
			}
		});

		store2.each(function(record){
			if(record.get('ostt_qntt') > 0){
				Lhap += record.get('ostt_qntt');
			}
			if(record.get('ostt_qntt_1fst') > 0){
				Rhap += record.get('ostt_qntt_1fst');
			}
		});

		if(Rsum > 0 && Rhap < Rsum){
			if(b == '' || b == null || b < 0 || b == 'null'){
				Ext.Msg.alert("알림","계획수량 (R)을 확인하여주십시오.");
				return;
			}
			if(b > Rsum ){
				Ext.Msg.alert("알림","계획수량 (R)을 확인하여주십시오.");
				return;
			}
		}

		if(Lsum > 0 && Lhap < Lsum){
			if(a == '' || a == null || a < 0 || a == 'null'){
				Ext.Msg.alert("알림","계획수량 (L)을 확인하여주십시오.");
				return;
			}
			if(a > Lsum){
				Ext.Msg.alert("알림","계획수량 (L)을 확인하여주십시오.");
				return;
			}
		}

		if(me.down('[name=prod_line_idcd]').getValue()==''||me.down('[name=prod_line_idcd]').getValue()==null){
			Ext.Msg.alert("알림","생산라인을 반드시 입력해주십시오.");
		}else if(me.down('[name=plan_sttm1]').getValue()==''||me.down('[name=plan_sttm1]').getValue()==null){
			Ext.Msg.alert("알림","시작일자를 반드시 입력해주십시오.");
		}else if(me.down('[name=pref_rank]').getValue()==''||me.down('[name=plan_sttm1]').getValue()==null){
			Ext.Msg.alert("알림","우선순위를 반드시 입력해주십시오.");
		}else{
			for (var i = 0; i < store.data.length; i++) {
				records.push({
					invc_numb : store.data.items[i].data.invc_numb,
					line_seqn : store.data.items[i].data.line_seqn,
				});
			}
			store2.each(function(find){
				if(find.get('ostt_qntt') > 0 || find.get('ostt_qntt_1fst')){
					wk_records.push({
						work_numb : find.get('invc_numb'),
						item_idcd : find.get('item_idcd'),
						ostt_qntt : find.get('ostt_qntt'),
						ostt_qntt_1fst : find.get('ostt_qntt_1fst')
					});
				}
			});

			var strt_date	= Ext.Date.format(me.down('[name=plan_sttm1]').getValue(),'Ymd');
			var strt_time	= Ext.Date.format(me.down('[name=plan_sttm2]').getValue(),'His');
			var endd_date	= Ext.Date.format(me.down('[name=plan_edtm1]').getValue(),'Ymd');
			var endd_time	= Ext.Date.format(me.down('[name=plan_edtm2]').getValue(),'His');

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			var val = JSON.stringify({
				strt_date		: strt_date,
				strt_time		: strt_time,
				endd_date		: endd_date,
				endd_time		: endd_time,
				stok_used_qntt	: Number(me.down('[name=stok_used_qntt]').getValue()),
				invc_qntt		: Number(me.down('[name=plan_qntt]').getValue()),
				invc_qntt_1fst	: Number(me.down('[name=plan_qntt_1fst]').getValue()),
				pref_rank		: me.down('[name=pref_rank]').getValue(),
				wkfw_idcd		: me.down('[name=prod_line_idcd]').getValue(),
				records			: records,
				wk_records		: wk_records
			})
			mask.show();
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kitec/prod/prodplanv2/set/work_order_create.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						param : val
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
						var store = me.down('grid').getStore(),
							param = Ext.merge( me.down('form').getValues(), { hq_id : _global.hq_id
							}, me.popup.params )
						;

						store.reload({
							params : { param:JSON.stringify(param) }, scope:me,
							callback:function(records, operation, success) {
								var sum_qntt=0;
								for(var i=0;i<records.length;i++){
									sum_qntt = sum_qntt+Number(records[i].data.invc_qntt);
								}
							}
						});
						lister1.getStore().reload();
						me.down('form').getForm().reset();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){
					mask.hide();
				}
			});
			this.close();
		}
	},

	close : function(){
		this.destroy();
	}
});