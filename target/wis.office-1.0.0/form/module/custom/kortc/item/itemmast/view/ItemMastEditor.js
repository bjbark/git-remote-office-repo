Ext.define('module.custom.kortc.item.itemmast.view.ItemMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast-editor',

	height : 390,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','품목코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
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
				itemId			: 'mainForm',
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('item_code','품목코드'),
								name		: 'item_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							},{ fieldLabel	: Language.get('item_idcd','품목ID'),
								name		: 'item_idcd',
								xtype		: 'textfield',
								hidden		: true
							}
						]
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
						margin : '0 0 5 0'
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 340,
						margin : '0 0 5 0'
					},{	fieldLabel	: Language.get('item_mtrl','재질'),
						xtype		: 'textfield',
						name		: 'item_mtrl',
						width		: 340,
						margin		: '0 0 5 0'
					},{	fieldLabel	: Language.get('clss_desc','품목분류'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'clss_desc',
						pair		: 'lcls_idcd',
						clearable	: true ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-item-clss-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
								me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
								me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								nameField.setValue(records[0].get('clss_desc'));
							}
						}
					},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								width		: 185,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: false,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								allowBlank	: false,
								value		: '',
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '1102'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name : 'acct_bacd', xtype : 'textfield' , hidden : true,
								listeners : {
									change : function(val,code){
										var purc    = me.down('[name=edit_tab1]');
										var tabs    = me.down('[name=edit_tab1]').up('tabpanel');
										var adon    = me.down('[name=edit_tab2]');
										var desc    = me.down('[name=edit_tab3]');
//										var cont    = me.down('[name=edit_tab4]');
										var hidden1 = false;
										var hidden2 = false;

										if(code=='2001'||code=='2002'||code=='3000'){
											if((_global.options.item_adon_disp_yorn==0)){
												hidden2 = true;
											}
											hidden1 = true;
										}
										adon.tab.hide();
										desc.tab.hide();
										switch (code) {
											case '1001' : {  /* 원재료  */
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '1002': {  /* 부재료  */
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '1003': {  /* 소모품  */
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '2001': {	/* 제공품  */
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '2002': {	/* 반제품  */
												purc.tab.hide();
												desc.tab.show();
												tabs.setActiveTab(desc);
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												break;
											};
											case '3000': {	/* 제품  */
												purc.tab.hide();
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												if	(_global.options.item_spec_disp_yorn==1) {
													desc.tab.show();
													tabs.setActiveTab(desc);
												}
												break;
											};
											case '4000': {	/* 상품  */
												purc.tab.hide();
//												cont.tab.show();
//												tabs.setActiveTab(cont);
												break;
											};
											case '5000': {	/* 집기비품  */
												purc.tab.show();
//												cont.tab.hide();
//												tabs.setActiveTab(cont);
												break;
											};
											case '6000': {	/* 공구기구  */
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											default : {
												purc.tab.show();
//												cont.tab.hide();
												tabs.setActiveTab(purc);
											}
										};
									}
								}
							},{	fieldLabel	: '수불단위'/*Language.get('','수불단위')*/,
								xtype		: 'popupfield',
								width		: 150,
								margin		: '0 0 0 5',
								editable	: true,
								enableKeyEvents : true,
								name		: 'unit_name',
								pair		: 'unit_idcd',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_idcd'));
									}
								}
							},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('yorn','재고관리'),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								width		: 185,
								lookupValue	: resource.lookup('yorn'),
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('istt_wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'istt_wrhs_name1',
								pair		: 'istt_wrhs_idcd',
								clearable	: false ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhs-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{	name		: 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('','보관위치'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'zone_name',
								pair		: 'zone_idcd',
								clearable	: true ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-zone-popup',
									params : { stor_grp : _global.stor_grp, line_stat : '0'  },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('zone_name'));
										pairField.setValue(records[0].get('zone_idcd'));
									}
								},
							},{	name : 'zone_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-cstm-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name	: 'cstm_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mker_name','제조사명'),
								xtype		: 'textfield',
								name		: 'mker_name',
							}
						]
					},{	fieldLabel	: Language.get('modify','수정'),
						xtype		: 'textfield',
						name		: 'modify',
						width		: 170,
						hidden		: true
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
				items	: [
					me.createTab1(), me.createTab2(), me.createTab3(),
					{title : '첨부파일',xtype: 'module-itemmast-editorlister'},
					me.createTab5(),
					{title : '관리항목',xtype: 'module-itemmast-mngtlister'},
					{title : '메모',xtype: 'module-itemmast-memolister'},
				]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '자재정보',
				xtype	: 'form-panel',
				name	: 'edit_tab1',
				dock	: 'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [

								{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('supl_dvcd','조달방법'),
											xtype		: 'lookupfield',
											name		: 'supl_dvcd',
											width		: 200,
											lookupValue	: resource.lookup('supl_dvcd')
										},{	fieldLabel	: Language.get('safe_stok','안전재고'),
											xtype		: 'numericfield',
											name		: 'safe_stok',
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
												{	fieldLabel	: Language.get('yorn','인수검사'),
													xtype		: 'lookupfield',
													name		: 'rcpt_insp_yorn',
													width		: 200,
													lookupValue	: resource.lookup('yorn')
												},{	fieldLabel	: Language.get('safe_deli_dcnt','안전납기'),
													xtype		: 'numericfield',
													name		: 'safe_deli_dcnt',
													width		: 200,
												}
											]
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
											items	: [
										{	fieldLabel	: Language.get('minm_puch_qntt','발주매듭량'),
											xtype		: 'numericfield',
											name		: 'minm_puch_qntt',
											width		: 200
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('','색상'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'colr_bacd_name',
											pair		: 'colr_bacd',
											clearable	: false ,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-base-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3104' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('base_name'));
													pairField.setValue(records[0].get('base_code'));
												}
											}
										},{	name		: 'colr_bacd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
									{	fieldLabel	: Language.get('','2D도면번호'),
										xtype		: 'textfield',
										name		: 'flat_drwg_numb',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','3D도면번호'),
										xtype		: 'textfield',
										name		: 'sold_drwg_numb',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','MSL'),
										xtype		: 'textfield',
										name		: 'msll_valu',
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','표면처리'),
										xtype		: 'textfield',
										name		: 'srfc_proc',
									}
								]
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
				title	: '생산정보',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab2',
				region	: 'center',
				hidden	: (_global.options.item_adon_disp_yorn==0&&_global.hq_id != 'N1000dooin'),
				fieldDefaults	: { width : 360, labelWidth : 100, labelSeparator : ''},
					items	: [
						{	fieldLabel	: Language.get('ostt_wrhs_name','출고창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'ostt_wrhs_name',
							pair		: 'ostt_wrhs_idcd',
							clearable	: false ,
							margin		: '0 0 2 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-wrhs-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wrhs_name'));
									pairField.setValue(records[0].get('wrhs_idcd'));
								}
							}
						},{	name	: 'ostt_wrhs_idcd', xtype : 'textfield' , hidden : true
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_01','수출용'),
									xtype		: 'numericfield',
									name		: 'item_pkge_01',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_02','수출용(물결)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_02',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_03','수출용(후가공)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_03',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_04','플라스틱인박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_04',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_13','두인단프라'),
									xtype		: 'numericfield',
									name		: 'item_pkge_05',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_06','두인단프라2'),
									xtype		: 'numericfield',
									name		: 'item_pkge_06',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_07','두인단프라(트레이)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_07',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_08','단프라(벌크)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_08',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_09','두인단프라(물결)'),
									xtype		: 'numericfield',
									name		: 'item_pkge_09',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_10','연우종이/단프라'),
									xtype		: 'numericfield',
									name		: 'item_pkge_10',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_11','연우중박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_11',
									width		: 182,
									labelWidth	: 100,
								},{	fieldLabel	: Language.get('item_pkge_12','연우대박스'),
									xtype		: 'numericfield',
									name		: 'item_pkge_12',
									labelWidth	: 88,
									width		: 178
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 2 0',
							items	: [
								{	fieldLabel	: Language.get('item_pkge_13','트레이'),
									xtype		: 'numericfield',
									name		: 'item_pkge_13',
									width		: 182,
									labelWidth	: 100,
								}
							]
						},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'mold_name',
							pair		: 'mold_idcd',
							clearable	: false ,
							margin		: '2 0 2 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-mold-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('mold_name'));
									pairField.setValue(records[0].get('mold_idcd'));
								}
							}
						},{	name	: 'mold_idcd', xtype : 'textfield' , hidden : true
						}
					]
			}
			;
			return item;
	},
	createTab3 : function() {
		var me = this,
			item = {
				title	: '제품정보',
				xtype	: 'form-panel',
				name	: 'edit_tab3',
				dock	:'left',
				region	: 'center',
				hidden	: (_global.options.item_spec_disp_yorn==0),
				fieldDefaults	: { width : 290, labelWidth : 100, labelSeparator : ''},
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('cstm_itid','거래처품번'),
												xtype		: 'textfield',
												name		: 'cstm_itid',
												width		: 250,
												labelWidth	: 70
											}
										]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
											items	: [
												{	fieldLabel	: Language.get('cstm_item_name','거래처품명'),
													xtype		: 'textfield',
													name		: 'cstm_item_name',
													width		: 250,
													labelWidth	: 70
												}

											]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('cstm_spec','거래처규격'),
												xtype		: 'textfield',
												name		: 'cstm_spec',
												width		: 250,
												labelWidth	: 70
											}

										]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('dely_cstm_modl','납품처모델명'),
												xtype		: 'textfield',
												name		: 'dely_cstm_modl',
												width		: 250,
												labelWidth	: 70
											}

										]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('dely_cstm_itid','납품처품번'),
												xtype		: 'textfield',
												name		: 'dely_cstm_itid',
												width		: 250,
												labelWidth	: 70
											}

										]
									},{xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('dely_cstm_item_name','납품처품명'),
												xtype		: 'textfield',
												name		: 'dely_cstm_item_name',
												width		: 250,
												labelWidth	: 70
											}

										]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
										items	: [
											{	fieldLabel	: Language.get('dely_cstm_spec','납품처규격'),
												xtype		: 'textfield',
												name		: 'dely_cstm_spec',
												width		: 250,
												labelWidth	: 70
											}

										]
									},{	xtype : 'fieldset' ,
										layout : 'hbox',
										padding:'0',margin : '0 0 4 0',
										border: 0,
										items : [
											{	fieldLabel	: Language.get('','차종'),
												xtype		: 'popupfield',
												name		: 'crty_bacd_name',
												pair		: 'crty_bacd',
												labelWidth	: 70,
												width		: 250,
												popup		: {
													select  : 'SINGLE',
													widget  : 'lookup-base-popup',
													params  : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '9001'},
													result  : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('base_name'));
														pairField.setValue(records[0].get('base_code'));
													}
												}
											},{	name	: 'crty_bacd'		, xtype : 'textfield', hidden : true
											}
										]
									},{	xtype : 'fieldset' ,
										layout : 'hbox',
										padding:'0',margin : '0 0 4 0',
										border: 0,
										items : [
											{	fieldLabel	: Language.get('base_name','생산라인'),
												xtype		: 'popupfield',
												name		: 'base_name',
												pair		: 'base_code',
												labelWidth	: 70,
												width		: 250,
												popup		: {
													select  : 'SINGLE',
													widget  : 'lookup-base-popup',
													params  : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001'},
													result  : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('base_name'));
														pairField.setValue(records[0].get('base_code'));
													}
												}
											},{	name	: ''		, xtype : 'textfield', hidden : true
											}
										]
									}
								]
							}
						]
					}
				]
		}
		;
		return item;
	},

	createTab5 : function() {
		var me = this,
			item = {
				title	: '이미지',
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 0',
							items	: [
								{	xtype		: 'form-panel',
									border		: 0,
									fieldDefaults: { width : 245, labelWidth : 70, labelSeparator : '' },
									items		: [
										{	xtype	: 'form-panel',
											name	: 'uploadForm',
											region	: 'center',
											standardSubmit: false,
											border	:  false,
											url		: 'system/item/itemmast/set/fileUpload.do',
											timeout	: 120000,
											method	: 'POST',
											layout	: { type: 'vbox', align: 'stretch' } ,
											padding	: 10 ,
											layout	: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
											items	:[
												{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지1',
													itemId		: 'files1',
													msgTarget	: 'side',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png|jpeg)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader(),
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek1]').setValue('Y');
																	form.down('[name=image]').setSrc(event.target.result)
//																	Ext.get('prjt_work_imge').dom.src = event.target.result;
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek1]').setValue('');
																form.down('[name=image]').setSrc('')
															}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle
												},{	xtype		: 'filefield',
													name		: 'files',
													fieldLabel	: '이미지2',
													msgTarget	: 'side',
													itemId		: 'files2',
													allowBlank	: true,
													clearable	: true ,
													anchor		: '100%',
													margin		: '0 3 0 0 ',
													width		: 350,
													buttonText	: '선택',
													regex		: new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
													listeners	: {
														change	: function (field) {
															var file = field.fileInputEl.dom.files[0],
																reader = new FileReader()
																form = this.up('form').up('form').up('panel').up('form')
															;
															if (file) {
																reader.addEventListener('load', function (event) {
																	me.down('[name=imge_chek2]').setValue('Y');
																	form.down('[name=image2]').setSrc(event.target.result)
																});
																reader.readAsDataURL(file);
															}else{
																me.down('[name=imge_chek2]').setValue('');
																form.down('[name=image2]').setSrc('');
															}Ext.ComponentQuery.query('module-itemmast-editor')[0].down('[name=modify]').setValue('Y');
														}
													}
												},{xtype:'button', text:'삭제', maxWidth: 35,handler: me.imgCancle2
												},{xtype:'hiddenfield', name:'param', value:''
												},{xtype:'hiddenfield', name:'token', value:_global.token_id }
											]
										}
									]
								}
							]
						},{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '0 0 0 45',
							autoscroll : true,
							items : [
								{	xtype	: 'image',
									name	: 'image',
									id		: 'prjt_work_imge',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55',
									hidden	: false
								},{	xtype	: 'image',
									name	: 'image2',
									id		: 'prjt_work_imge2',
									src		: '',
									width	: 195,
									height	: 260,
									margin	: '20 55 0 160',
									hidden	: false
								}
							]
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype		:'textfield',
							name		: 'item_imge2',
							hidden		: true,
							listeners	: {
								change:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image2]').setSrc(url);
									}else{
										this.up('form').down('[name=image2]').setSrc('');
									}
								}
							}
						}
					]
				}
			;
		return item;
	},
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	imgCancle2:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},

	calc:function(){
		var me			= this,
			form		= me.up('form'),
			leng_valu	= form.down('[name=leng_valu]'),
			leng_valu_2snd	= form.down('[name=leng_valu_2snd]'),
			widh_valu	= form.down('[name=widh_valu]'),
			tick_valu	= form.down('[name=tick_valu]'),
			jiss_name	= form.down('[name=jiss_name]'),
			inch_name	= form.down('[name=inch_name_code]'),
			jiss_pich	= form.down('[name=jiss_pich]'),
			inch_mtct	= form.down('[name=inch_mtct]'),
			inch_otsd_dimt= form.down('[name=inch_otsd_dimt]'),
			mntn_dpth	= form.down('[name=mntn_dpth]'),
			mtrl_dimt	= form.down('[name=mtrl_dimt]'),
			bolt_unit_dvcd = form.down('[name=bolt_unit_dvcd]'),
			bolt_dvcd	= form.down('[name=bolt_dvcd]'),
			mtty_dvcd	= form.down('[name=mtty_dvcd]'),
			otsd_dimt	= form.down('[name=inch_otsd_dimt]'),
			tper_dprt	= form.down('[name=tper_dprt]'),
			mainForm	= form.up('form').down('form'),
			store		= Ext.ComponentQuery.query('module-itemmast-lister')[0],
			item_idcd	= mainForm.down('[name=item_idcd]'),
			param_pich	= undefined,
			param_name	= undefined	,
			param_otsd	= undefined	;
		if	(bolt_unit_dvcd.getValue() == 'JIS') {
			param_name	= jiss_name.getValue();
			param_pich	= jiss_pich.getValue();
			param_otsd	= otsd_dimt.getValue();
		} else {
			param_name	= inch_name.getValue();
			param_pich	= inch_mtct.getValue();
			param_otsd	= otsd_dimt.getValue();
		};
		if(    leng_valu.getValue()      == null || leng_valu.getValue()      == ''
			|| leng_valu_2snd.getValue() == null || leng_valu_2snd.getValue() == ''
			|| widh_valu.getValue()      == null || widh_valu.getValue()      == ''
			|| tick_valu.getValue()      == null || tick_valu.getValue()      == ''){
			Ext.Msg.alert("알림","규격을 입력해주세요.");
			return;
		}else if(bolt_unit_dvcd.getValue() == null || bolt_unit_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","JIS 혹은 Inch를 입력해주세요.");
			return;
		}else if(mtty_dvcd.getValue() == null || mtty_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","산형구분을 선택해주세요.");
			return;
		}else if(bolt_dvcd.getValue() == null || bolt_dvcd.getValue() == ''){
			Ext.Msg.alert("알림","TAPER길이를 선택해주세요.");
			return;
		}else if(param_name == null || param_name == ''){
			Ext.Msg.alert("알림","호칭을 입력해주세요.");
			return;
		}else if(param_pich == null){
			Ext.Msg.alert("알림","피치를 입력해주세요.");
			return;
//		}else if(mntn_dpth.getValue() == null || !(mntn_dpth.getValue()>0) ){
//			Ext.Msg.alert("알림","산깊이를 입력해주세요.");
//			return;
//		}else if(mtrl_dimt.getValue() == null || !(mtrl_dimt.getValue()>0) ){
//			Ext.Msg.alert("알림","소재경을 입력해주세요.");
//			return;
		}else {
			var spec = leng_valu.getValue()+'/'+leng_valu_2snd.getValue()+'-'+widh_valu.getValue()+'-'+tick_valu.getValue();
			Ext.Ajax.request({
				url		: _global.location.http() + '/item/itemmast/set/item_bolt_calc.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id		,
						hqof_idcd		: _global.hqof_idcd		,
						bolt_unit_dvcd	: bolt_unit_dvcd.getValue(),
						bolt_dvcd		: bolt_dvcd.getValue()	,
						mtty_dvcd		: mtty_dvcd.getValue()	,
						mntn_dpth		: mntn_dpth.getValue()	,
						mtrl_dimt		: mtrl_dimt.getValue()	,
						bolt_name		: param_name,
						pitch			: param_pich,
//						otsd_dimt		: param_otsd,
						item_idcd		: item_idcd.getValue()	,
						item_spec		: spec,
						tper_dprt		: tper_dprt.getValue(),
						runn_dvcd		: 'run'		//run , test
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
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			Ext.Ajax.request({
				url		: _global.location.http() + '/item/itemmast/get/item_bolt_calc.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id		,
						hqof_idcd		: _global.hqof_idcd		,
						bolt_unit_dvcd	: bolt_unit_dvcd.getValue(),
						bolt_dvcd		: bolt_dvcd.getValue()	,
						mtty_dvcd		: mtty_dvcd.getValue()	,
						mntn_dpth		: mntn_dpth.getValue()	,
						mtrl_dimt		: mtrl_dimt.getValue()	,
						bolt_name		: param_name,
						pitch			: param_pich,
//						otsd_dimt		: param_otsd,
						item_idcd		: item_idcd.getValue()	,
						item_spec		: spec,
						tper_dprt			: tper_dprt.getValue(),
						runn_dvcd		: 'test'		//real , test
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
						form.down('[name=tper_leng]').setValue(result.records[0].tper_leng);
						form.down('[name=tper_dpth]').setValue(result.records[0].tper_dpth);
						form.down('[name=tper_angl]').setValue(result.records[0].tper_angl);
						form.down('[name=h_valu]').setValue(result.records[0].h_valu);
						form.down('[name=a_valu]').setValue(result.records[0].a_valu);
						form.down('[name=b_valu]').setValue(result.records[0].b_valu);
						form.down('[name=ra_valu]').setValue(result.records[0].ra_valu);
						form.down('[name=rb_valu]').setValue(result.records[0].rb_valu);
						form.down('[name=h2_valu]').setValue(result.records[0].h2_valu);
						form.down('[name=mntn_dpth]').setValue(result.records[0].mntn_dpth);
						form.down('[name=mtrl_dimt]').setValue(result.records[0].mtrl_dimt);
						form.down('[name=half_pich]').setValue(result.records[0].half_pich);
						form.down('[name=sinn_valu]').setValue(result.records[0].sinn_valu);
						form.down('[name=tolr_valu]').setValue(result.records[0].tolr_valu);
						form.down('[name=a_valu_scpe]').setValue(result.records[0].a_valu_scpe);
						form.down('[name=b_valu_scpe]').setValue(result.records[0].b_valu_scpe);
						form.down('[name=lead_angl]').setValue(result.records[0].lead_angl);
						form.down('[name=h_valu_scpe]').setValue(result.records[0].h_valu_scpe);
						form.down('[name=a_valu_scpe]').setValue(result.records[0].a_valu_scpe);
						form.down('[name=b_valu_scpe]').setValue(result.records[0].b_valu_scpe);

						Ext.Msg.alert('알림','특성재계산을 완료하였습니다.');
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	chk:function(comp){
		var me = this,
			jiss_pich		= me.down('[name=jiss_pich]').getValue(),
			jiss_name		= me.down('[name=jiss_name]').getValue(),
			inch_name_code	= me.down('[name=inch_name_code]').getValue(),
			inch_mtct		= me.down('[name=inch_mtct]').getValue()
			bolt_unit_dvcd		= me.down('[name=bolt_unit_dvcd]')
		;
		if(comp == "JIS"){
			if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)||(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
				Ext.Msg.alert('알림',"JIS와 Inch중 하나만 입력하여주세요.");
				me.down('[name=jiss_pich]').setValue("");
				me.down('[name=jiss_name]').setValue("");
				return;
			}else{
				if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)&&(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
					bolt_unit_dvcd.setValue(comp);
				}else{
					if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)&&(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
						bolt_unit_dvcd.setValue("Inch");
					}
					else{
						bolt_unit_dvcd.setValue("");
					}
				}
			}
		}else{
			if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)||(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
				Ext.Msg.alert('알림',"JIS와 Inch중 하나만 입력하여주세요.");
				me.down('[name=inch_name_code]').setValue("");
				me.down('[name=inch_mtct]').setValue("");
				return;
			}
			if((inch_name_code != "" && inch_name_code != null && inch_name_code!=0)&&(inch_mtct != "" && inch_mtct !=null && inch_mtct !=0)){
				bolt_unit_dvcd.setValue(comp);
			}else{
				if((jiss_pich != "" && jiss_pich != null && jiss_pich != 0)&&(jiss_name != "" && jiss_name !=null && jiss_name != 0)){
					bolt_unit_dvcd.setValue("JIS");
				}else{
					bolt_unit_dvcd.setValue("");
				}
			}
		}
	},
	setSpec:function(){
		var me = this,
			leng_valu		= me.down('[name=leng_valu]').getValue(),
			leng_valu_2snd	= me.down('[name=leng_valu_2snd]').getValue(),
			widh_valu		= me.down('[name=widh_valu]').getValue(),
			tick_valu		= me.down('[name=tick_valu]').getValue(),
			form			= me.down('#mainForm')
		;
		if(    leng_valu != null && leng_valu != ""
			&& leng_valu_2snd != null && leng_valu_2snd != ""
			&& widh_valu != null && widh_valu != ""
			&& tick_valu != null && tick_valu != ""		){
			var val = leng_valu+'/'+leng_valu_2snd+'-'+widh_valu+'-'+tick_valu;
			form.down('[name=item_spec]').setValue(val);
		}
	}
});