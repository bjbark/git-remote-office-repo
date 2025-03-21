Ext.define('module.custom.dehansol.sale.saleorder.view.SaleOrderEditor', { extend: 'Axt.form.Editor',

	 alias: 'widget.module-saleorder-editor',

	height : 490,
	layout : {
	type: 'border'
	},

	title			: Language.get('sale_info','수주정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'invc_numb'	,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()/*, me.createwest1(),*/];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},


	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 450,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acpt_numb','수주번호'),
								name		: 'invc_numb',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								readOnly	: true,
								labelWidth	: 80,
								width		: 220,
							},{	fieldLabel	: Language.get('acpt_date','수주일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
								labelWidth	: 70,
								width		: 170
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
									{	fieldLabel	: Language.get('puch_reqt_numb','주문번호'),
										name		: 'puch_reqt_numb',
										xtype		: 'textfield',
										width		: 220,
									},{	fieldLabel	: Language.get('deli_date','납기일자'),
										xtype		: 'datefield',
										name		: 'deli_date',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										labelWidth	: 70,
										width		: 170
									}
								]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('', '표준품목코드' ),
								name		: 'rpst_item_idcd',
								pair		: 'rpst_item_idcd',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 390,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								popup		: {
									widget	: 'lookup-item-popup-dehansol',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										var panel1 = nameField.up('form');
										var layout = ('[name=sale_info]');
										panel1.down('[name=item_idcd]').setValue(records[0].get('rpst_item_idcd'));
										panel1.down('[name=cstm_idcd]').setValue(records[0].get('cstm_idcd'));
										panel1.down('[name=plmk_size_horz]').setValue(records[0].get('plmk_size_horz'));
										panel1.down('[name=plmk_size_vrtl]').setValue(records[0].get('plmk_size_vrtl'));
										panel1.down('[name=invc_pric]').setValue(records[0].get('sale_pric'));
										panel1.down('[name=sply_amnt]').setValue(records[0].get('sale_pric'));
										nameField.setValue(records[0].get('rpst_item_idcd'));
										pairField.setValue(records[0].get('rpst_item_idcd'));
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm', '거래처' ),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								width		: 390,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('puch_reqt_date','구매요청일자'),
								xtype		: 'datefield',
								name		: 'puch_reqt_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 80,
								width		: 180,
							},{	fieldLabel	: Language.get('chit_elec_date','전표전기일자'),
								xtype		: 'datefield',
								name		: 'chit_elec_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 110,
								width		: 210,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('tool_numb', 'TOOL CODE' ),
								name		: 'tool_numb',
								fieldCls	: 'requiredindex',
								xtype		: 'textfield',
								labelWidth	: 80,
								width		: 220
							},{	fieldLabel	: Language.get('tool_revs', 'TOOL_Rev' ),
								name		: 'tool_revs',
								xtype		: 'textfield',
								fieldCls	: 'requiredindex',
								labelWidth	: 70,
								width		: 170,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('film_numb','필름번호'),
								xtype		: 'textfield',
								name		: 'film_numb',
								labelWidth	: 80,
								width		: 220,
							},{	fieldLabel	: Language.get('film_name','필름명'),
								xtype		: 'textfield',
								name		: 'film_name',
								labelWidth	: 70,
								width		: 170
							}
						]
					},
//					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
//						items	: [
//							{	fieldLabel	: Language.get('film_acpt_offe','필름수령처'),
//								xtype		: 'lookupfield',
//								name		: 'film_acpt_offe',
//								labelWidth	: 80,
//								width		: 220,
//								hidden		: true,
//								lookupValue	: [['자가보유','자가보유'],['발주처 제공','발주처 제공'],['3자업체 수령','3자업체 수령']]
//							},{	fieldLabel	: Language.get('film_acpt_yorn','필름수령여부'),
//								xtype		: 'lookupfield',
//								name		: 'film_acpt_yorn',
//								lookupValue	: resource.lookup('yorn'),
//								labelWidth	: 70,
//								width		: 170,
//								readOnly	: true,
//								hidden		: true
//							}
//						]
//					},
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('', '모델명' ),
								name		: 'cstm_modl_name',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								fieldCls	: 'requiredindex',
								clearable	: true ,
								width		: 390,
								popup		: {
									widget	: 'lookup-item-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1', add : '1'},
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('item_name'));
									}
								}
							},{	name : 'item_idcd', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','가로'),
								xtype		: 'textfield',
								name		: 'plmk_size_horz',
								labelWidth	: 80,
								width		: 220,
							},{	fieldLabel	: Language.get('','세로'),
								xtype		: 'textfield',
								name		: 'plmk_size_vrtl',
								labelWidth	: 70,
								width		: 170
							}
						]
					},{	fieldLabel	: Language.get('','품목모델명'),
						xtype		: 'textfield',
						name		: 'modl_name',
						width		: 390,
						readOnly	: true,
						hidden		: true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('plmk_numb','제판번호'),
								xtype		: 'textfield',
								name		: 'plmk_numb',
								labelWidth	: 80,
								width		: 220,
							},{	fieldLabel	: Language.get('plmk_kind_name','제판종류명'),
								xtype		: 'popupfield',
								name		: 'plmk_kind_name2',
								pair		: 'plmk_kind_code',
								fieldCls	: 'requiredindex',
								labelWidth	: 70,
								width		: 170,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' , prnt_idcd : '3104'},
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'plmk_kind_code', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('plmk_size','제판사이즈'),
								xtype		: 'textfield',
								name		: 'plmk_size',
								labelWidth	: 80,
								width		: 220,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mesh_bacd_name', 'MESH' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								name		: 'mesh_bacd_name',
								pair		: 'mesh_bacd',
								clearable	: false ,
								labelWidth	: 80,
								width		: 220,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' , prnt_idcd : '3101'},
									result	: function(records, nameField, pairField){
										var panel1 = nameField.up('form');
										panel1.down('[name=mesh_name]').setValue(records[0].get('base_name'));
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'mesh_bacd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('mesh','MESH'),
								xtype		: 'textfield',
								name		: 'mesh_name',
								fieldCls	: 'requiredindex',
								labelWidth	: 80,
								width		: 220,
								hidden		: true,
							},{	fieldLabel	: Language.get('mesh_type_dvcd','망사타입'),
								xtype		: 'lookupfield',
								name		: 'mesh_type_dvcd',
								lookupValue : resource.lookup('mesh_type_dvcd'),
								labelWidth	: 70,
								width		: 170
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','수량/단가/금액'),
								xtype		: 'numericfield',
								name		: 'invc_qntt',
								itemId		: 'invc_qntt',
								fieldCls	: 'requiredindex',
								value		: null,
								labelWidth	: 80,
								width		: 170,
								listeners	: {
									change : function(){
										var panel = this.up('form');
										var invc_qntt = panel.down('[name=invc_qntt]').getValue();
										var invc_pric = panel.down('[name=invc_pric]').getValue();

										var qntt = Number(invc_qntt)*Number(invc_pric);
										if(qntt < 0){
											panel.down('[name=invc_pric]').setValue(0);
											panel.down('[name=sply_amnt]').setValue(0);
										}else{
											panel.down('[name=invc_pric]').setValue(invc_pric);
											panel.down('[name=sply_amnt]').setValue(qntt);
										}
									},
								},
							},{ xtype		: 'numericfield',
								name		: 'invc_pric',
								itemId		: 'invc_pric',
								margin		: '0 0 0 5',
								width		: 100,
								listeners	: {
									change : function(){
										var panel = this.up('form');
										var invc_qntt = panel.down('[name=invc_qntt]').getValue();
										var invc_pric = panel.down('[name=invc_pric]').getValue();

										var qntt = Number(invc_qntt)*Number(invc_pric);
										if(qntt < 0){
											panel.down('[name=invc_pric]').setValue(0);
											panel.down('[name=sply_amnt]').setValue(0);
										}else{
											panel.down('[name=invc_pric]').setValue(invc_pric);
											panel.down('[name=sply_amnt]').setValue(qntt);
										}
									},
								},
							},{ xtype		: 'numericfield',
								name		: 'sply_amnt',
								itemId		: 'sply_amnt',
								width		: 110,
								margin		: '0 0 0 5',
							}
						]
					},{	fieldLabel	: Language.get('cstm_prod_numb', '제품번호' ),
						name		: 'cstm_prod_numb',
						xtype		: 'textfield',
						width		: 390,
						clearable	: false ,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('sufc_dvcd','면구분'),
								xtype		: 'lookupfield',
								fieldCls	: 'requiredindex',
								name		: 'sufc_dvcd',
								lookupValue : resource.lookup('sufc_dvcd'),
								labelWidth	: 80,
								width		: 170,
							},{	fieldLabel	: Language.get('trst_name','의뢰자'),
								xtype		: 'textfield',
								fieldCls	: 'requiredindex',
								name		: 'trst_name',
								labelWidth	: 120,
								width		: 220
							}
						]
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [me.createTab1() , me.createTab2()]
			}
		;
		return item;
	},


	createTab1 : function () {
		var me = this,
			item = {
				title		: Language.get('','제작사양'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('revs_numb', '리비젼번호' ),
								name		: 'revs_numb',
								xtype		: 'textfield',
								fieldCls	: 'requiredindex',
								labelWidth	: 90,
								width		: 380,
								clearable	: false ,
							}
						]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wkct_code', '공정코드' ),
								name		: 'wkct_code',
								xtype		: 'textfield',
								labelWidth	: 90,
								width		: 380,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wkct_name', '공정명' ),
								name		: 'wkct_name',
								xtype		: 'textfield',
								labelWidth	: 90,
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm_name2','고객명'),
								xtype		: 'textfield',
								name		: 'cstm_name2',
								labelWidth	: 90,
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: Language.get('pdgr','제품군'),
								xtype		: 'textfield',
								name		: 'pdgr',
								labelWidth	: 90,
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('strt_flor','시작층'),
								xtype		: 'numericfield',
								name		: 'strt_flor',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('endd_flor','종료층'),
								xtype		: 'numericfield',
								name		: 'endd_flor',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('xscl','X스케일'),
								xtype		: 'numericfield',
								name		: 'xscl',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('yscl','Y스케일'),
								xtype		: 'numericfield',
								name		: 'yscl',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('indv_qntt','개체수'),
								xtype		: 'numericfield',
								name		: 'indv_qntt',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('hole_diam','홈파이'),
								xtype		: 'numericfield',
								name		: 'hole_diam',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('jigg_code','지그코드'),
								name		: 'strt_flor',
								labelWidth	: 90,
								width		: 190,
								xtype		: 'textfield',
								name		: 'jigg_code',
							},{	fieldLabel	: Language.get('jigg_grup_code','지그그룹코드'),
								xtype		: 'textfield',
								name		: 'jigg_grup_code',
								labelWidth	: 100,
								width		: 190
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('hpig_proc_mthd','HP지그가공방법'),
								xtype		: 'textfield',
								name		: 'hpig_proc_mthd',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('prjg_proc_mthd','인쇄지그가공방법'),
								xtype		: 'textfield',
								name		: 'prjg_proc_mthd',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('jgup_qntt','지그업수'),
								xtype		: 'numericfield',
								name		: 'jgup_qntt',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('bbtt_pont','BBT포인트'),
								xtype		: 'numericfield',
								name		: 'bbtt_pont',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('yyal_cetr','Y값중심'),
								xtype		: 'numericfield',
								name		: 'yyal_cetr',
								labelWidth	: 90,
								width		: 190
							},{	fieldLabel	: Language.get('hole_qntt','홀수'),
								xtype		: 'numericfield',
								name		: 'hole_qntt',
								labelWidth	: 100,
								width		: 190
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('bbtt_jigg_type', 'BBT지그타입' ),
								name		: 'bbtt_jigg_type',
								xtype		: 'textfield',
								labelWidth	: 90,
								width		: 190,
								clearable	: false ,
							}
						]
					}
				]
			}
		;
		return item;
	},

	createTab2 : function() {
		var me = this,
			item = {
				title		: Language.get('','메모'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 400,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},
});