Ext.define('module.custom.sjflv.custom.hantop.item.itemgroup.view.ItemMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmast-editor',

	height : 620,
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
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style',itemId	: 'UPDATE', hidden:true},
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style',itemId	: 'CANCEL'}, '-'
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
				width			: 390,
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
								width		: 310
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
						width		: 370,
						margin : '0 0 5 0'
					},{	fieldLabel	: Language.get('item_egnm','영문명'),
						xtype		: 'textfield',
						name		: 'item_egnm',
						width		: 370,
						margin : '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						hidden		: !(_global.options.item_size_used_yorn == 1),
						items	: [
							{	fieldLabel	: Language.get('','사이즈'),
								xtype		: 'textfield',
								name		: 'item_leng',
								width		: 120,
								value		: 0,
								minValue	: 0,
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_leng = panel.down('[name=item_leng]').getValue();
										if(isNaN(Number(item_leng))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_leng]').reset();
										}
									}
								}
							},{	fieldLabel	: 'X',
								xtype		: 'textfield',
								name		: 'item_widh',
								labelWidth	: 10,
								width		: 65,
								value		: 0,
								minValue	: 0,
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_widh = panel.down('[name=item_widh]').getValue();
										if(isNaN(Number(item_widh))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_widh]').reset();
										}
									}
								}
							}
							,{	fieldLabel	: Language.get('','두께'),
								xtype		: 'textfield',
								name		: 'item_tick',
								width		: 150,
								value		: 0,
								minValue	: 0,
								margin		: '0 0 0 5',
								regex: /^[0-9]+\.?[0-9]*$/,
								listeners	: {
									blur	: function(){
										var panel = this.up('form'),
											item_tick = panel.down('[name=item_tick]').getValue();
										if(isNaN(Number(item_tick))){
											Ext.Msg.alert("알림","숫자이외의 값이 들어간다면 규격에 입력하여 주십시오.");
											panel.down('[name=item_tick]').reset();
										}else{
											panel.down('[name=item_tick]').setValue(Ext.util.Format.number(item_tick, '0.0'));
										}
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 370,
						margin : '0 0 5 0'
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								width		: 185,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: true ,
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
										var hidden1 = false;
										var hidden2 = false;

										if(code=='2001'||code=='2002'||code=='3000'||code=='2003'){
											if((_global.options.item_adon_disp_yorn==0)){
												hidden2 = true;
											}
											hidden1 = true;
										}
										var a = code;
										switch (a) {
											case '1001' : {  /* 원재료  */
												adon.tab.show();
												purc.tab.hide();
												tabs.setActiveTab(adon);
												break;
											};
											case '1002' : {  /* 원재료  */
												adon.tab.show();
												purc.tab.hide();
												tabs.setActiveTab(adon);
												break;
											};
											case '2001': {	/* 제공품  */
												adon.tab.show();
												purc.tab.hide();
												tabs.setActiveTab(adon);
												break;
											};
											case '2002': {	/* 제품  */
												purc.tab.show();
												adon.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '3000': {	/* 제품  */
												purc.tab.show();
												adon.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											case '2003': {	/* 품목보고서  */
												purc.tab.show();
												adon.tab.hide();
												tabs.setActiveTab(purc);
												break;
											};
											default : {
											}
										};
									}
								}
							},{	fieldLabel	: '수불단위'/*Language.get('','수불단위')*/,
								xtype		: 'popupfield',
								width		: 180,
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
							{	fieldLabel	: Language.get('yorn','Batch 관리'),
								xtype		: 'lookupfield',
								name		: 'lott_mngt_yorn',
								width		: 185,
								margin		: '0 0 0 0',
								lookupValue	: resource.lookup('yorn'),
							},{	fieldLabel	: Language.get('yorn','재고관리'),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								margin		: '0 0 0 0',
								width		: 185,
								labelWidth	: 70,
								lookupValue	: resource.lookup('yorn'),
							}
						]
					},{	fieldLabel	: Language.get('lott_idnf_code','Batch 식별'),
						width		: 370,
						xtype		: 'textfield',
						name		: 'lott_idnf_code',
						margin		: '0 0 5 0',
						hidden		: _global.options.mes_system_type =='Frame',
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('insp_type_name','검사유형'),
								width		: 370,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'insp_type_name',
								pair		: 'insp_type_idcd',
								clearable	: true ,
								hidden		: (_global.options.item_insp_type_yorn==0), /* 여기를 수정할 경우 금형 등록 Editor 부분을 수정하여야 한다.  */
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-insptype-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('insp_type_name'));
										pairField.setValue(records[0].get('insp_type_idcd'));
									}
								}
							},{	name		: 'insp_type_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: Language.get('clss_desc','품목분류'),
						width		: 370,
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
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('modify','수정'),
						xtype		: 'textfield',
						name		: 'modify',
						width		: 170,
						hidden		: true
					},{	fieldLabel	: Language.get('','HS Code'),
						xtype		: 'textfield',
						name		: '',
						width		: 370,
						listeners	:{
							blur:function(){
								me.setSpec();
							}
						}
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','내수/수출'),
								xtype		: 'lookupfield',
								name		: 'expt_dmst_dvcd',
								width		: 185,
								lookupValue	: resource.lookup('expt_dmst_dvcd'),
							},{	fieldLabel	: Language.get('rtil_ddln_dcnt','유통기한'),
								xtype		: 'numericfield',
								name		: 'rtil_ddln_dcnt',
								width		: 155,
								labelWidth	: 70,
								margin		: '0 5 0 0',
							},{	xtype	: 'label',
								text	: '개월',
								margin	: '5 10 0 3'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','할랄'),
								xtype		: 'lookupfield',
								name		: 'hala_yorn',
								width		: 185,
								lookupValue	: resource.lookup('yorn'),
							},
							{	fieldLabel	: Language.get('','OEM여부'),
								 xtype		: 'lookupfield',
								 name		: 'otod_yorn',
								 width		: 185,
								 labelWidth	: 70,
								 lookupValue: resource.lookup('yorn'),
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','보관창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'stor_wrhs_name',
								width		: 185,
								pair		: 'stor_wrhs_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));

										var Form = Ext.ComponentQuery.query('module-itemmast-editor')[0];
										Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = records[0].get('wrhs_idcd');
										Form.down('[name=stor_plac_idcd]').setValue(null);
										Form.down('[name=stor_plac_name]').setValue(null);
									}
								}
							},{	name : 'stor_wrhs_idcd', xtype : 'textfield' , hidden : true,
								listeners	: {
									change	: function(){
										var Form = Ext.ComponentQuery.query('module-itemmast-editor')[0];
										Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = this.getValue();
										if(this.value == ''){
											me.down('[name=stor_wrhs_idcd]').setValue(null);
											Form.down('[name=stor_plac_name]').popup.params.wrhs_idcd = null;
											Form.down('[name=stor_plac_idcd]').setValue(null);
											Form.down('[name=stor_plac_name]').setValue(null);
										}
									}
								}
							},{	fieldLabel	: Language.get('','보관장소'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'stor_plac_name',
								width		: 180,
								pair		: 'stor_plac_idcd',
								clearable	: true,
								margin		: '0 0 0 5',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-zone-popup',
									params : { stor_grp : _global.stor_grp },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('zone_name'));
										pairField.setValue(records[0].get('zone_idcd'));
									}
								},
							},{	name : 'stor_plac_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','안전재고'),
								xtype		: 'numericfield',
								name		: 'safe_stok',
								width		: 185,
							},{	fieldLabel	: Language.get('lead_time','리드타임'),
								xtype		: 'numberfield',
								name		: 'lead_time',
								margin		: '0 5 0 5',
								width		: 155,
								labelWidth	: 70,
							},{	xtype	: 'label',
								text	: '일',
								margin	: '5 10 0 3'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','loss율'),
								xtype		: 'numericfield',
								name		: 'incm_loss_rate',						
								width		: 185,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','제조국'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'make_natn_name',
								width		: 185,
								pair		: 'make_natn',
								clearable	: true,
//								margin		: '0 0 0 -1',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp,prnt_idcd : '3300' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
							},{	name : 'make_natn', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','제조회사'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'make_cmpy_name2',
								width		: 180,
								pair		: 'make_cmpy_name',
								clearable	: true,
								margin		: '0 0 0 5',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp,prnt_idcd : '3200'  },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								},
							},{	name : 'make_cmpy_name', xtype : 'textfield' , hidden : true
							},{	name : 'make_cmpy_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: Language.get('pcmt','특이사항'),
						width		: 370,
						xtype		: 'textfield',
						name		: 'pcmt',
						margin		: '0 0 5 0',
						hidden		: _global.hq_id.toUpperCase() != 'N1000SJFLV'
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
					me.createTab1(), me.createTab2(),
					{title : '첨부파일',xtype: 'module-itemmast-editorlister'},
					me.createTab5(),
					{title : '메모',xtype: 'module-itemmast-memolister'},
					{title : '관리항목',xtype: 'module-itemmast-mngtlister'},
					{title : '포장정보',xtype: 'module-itemmast-pkgelister'},
				]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '제품정보',
				xtype	: 'form-panel',
				name	: 'edit_tab1',
				dock	: 'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','품목보고번호'),
								xtype		: 'textfield',
								name		: 'item_make_numb',
								labelWidth	: 90,
								width		: 205,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								value		: '19840445117',
								margin		: '0 0 0 10',
								maxLength	: 15
							},{	fieldLabel	: Language.get('','개발일자'),
								xtype		: 'datefield',
								name		: 'devl_date',
								labelWidth	: 100,
								width		: 195,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 0 0',
								items	: [
									{	fieldLabel	: Language.get('','보고일자'),
										xtype		: 'datefield',
										name		: 'rept_date',
										labelWidth	: 80,
										width		: 175,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										margin		:'0 10 0 16',
									}
								]
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								editable	: true,
								width		: 260,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('','비중'),
								xtype		: 'numericfield',
								name		: 'spgr_valu',
								width		: 150,
								labelWidth	: 55,
								margin		: '0 5 0 0',
							},{	fieldLabel	: Language.get('','굴절율'),
								xtype		: 'numericfield',
								name		: 'rfct_valu',
								width		: 165,
								labelWidth	: 70,
								margin		: '0 5 0 20',
							}
						]
					},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	:  Language.get( '' , '제조방법'),
								name		: 'make_mthd',
								xtype		: 'textarea',
								height		: 90,
								width		: 600,
							},{	fieldLabel	:  Language.get( '' , '식품의 유형'),
								name		: 'food_type',
								xtype		: 'textarea',
								width		: 600,
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('labl_prnt_type_dvcd','원료성분출력'),
										xtype		: 'lookupfield',
										name		: 'labl_prnt_type_dvcd',
										hidden		: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true,
										width		: 185,
										labelWidth	: 70,

										margin		: '0 5 5 30',
										lookupValue	: resource.lookup('labl_prnt_type_dvcd'),
									},
									{	fieldLabel	: Language.get('labl_algy_code','라벨알러지'),
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'labl_algy_name',
										pair		: 'labl_algy_code',
										width		: 185,
										labelWidth	: 70,
										margin		: '0 5 5 30',
										hidden		: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true,
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-base-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8007'},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('base_name'));
												pairField.setValue(records[0].get('base_code'));
											}
										}
									},{	name : 'labl_algy_code', xtype : 'textfield' , hidden : true,
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 0 0',
										items	: [
													{	fieldLabel	: Language.get('labl_chck_yorn','라벨확인'),
														name		: 'labl_chck_yorn',
														xtype		: 'lookupfield',
														width		: 185,
														margin		: '0 5 5 -30',
														lookupValue	: resource.lookup('yorn'),
														hidden		: _global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true,
													}
												]
											}
										]
							},{	fieldLabel	:  Language.get( '' , '원료명 및 성분'),
								name		: 'labl_cont',
								xtype		: 'textarea',
								height		: 90,
								width		: 600,
							},{	fieldLabel	:  Language.get( '' , '성상'),
								name		: 'aprn',
								xtype		: 'textarea',
								width		: 600,
							},
						]
					},{	fieldLabel	: Language.get('usge','용도, 용법'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'usge',
						labelWidth	: 100,
						width		: 600,
						pair		: 'usge_code',
						clearable	: true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-refn-popup2',
							params : { stor_grp : _global.stor_grp , line_stat : '0',refn_dvcd: '1'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('refn_cont_1fst'));
								pairField.setValue(records[0].get('refn_code'));
							}
						}
					},{	name : 'usge_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('stmt','보존방법'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'stmt',
						pair		: 'stmt_code',
						labelWidth	: 100,
						width		: 600,
						clearable	: true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-refn-popup2',
							params : { stor_grp : _global.stor_grp , line_stat : '0',refn_dvcd : '2'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('refn_cont_1fst'));
								pairField.setValue(records[0].get('refn_code'));
							}
						}
					},{	name : 'stmt_code', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('trac','취급사항'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'trac',
						pair		: 'trac_code',
						labelWidth	: 100,
						width		: 600,
						clearable	: true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-refn-popup2',
							params : { stor_grp : _global.stor_grp , line_stat : '0',refn_dvcd : '3'},
							result : function(records, nameField, pairField) {
								var refn_cont_1fst = '(' + records[0].get('user_memo') + ')' + records[0].get('refn_cont_1fst');
								nameField.setValue(refn_cont_1fst);
								pairField.setValue(records[0].get('refn_code'));
							}
						}
					},{	name : 'trac_code', xtype : 'textfield' , hidden : true
					}
				]
			}
		;
		return item;
	},
	createTab2 : function() {
		var me = this,
			item = {
				title	: '자재정보',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab2',
				region	: 'center',
				fieldDefaults	: { width : 360, labelWidth : 100, labelSeparator : '',margin:'0 0 0 0'},
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'10 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','KFDA'),
									xtype		: 'textfield',
									name		: 'kfda',
									width		: 250,
								},{	fieldLabel	: Language.get('','조달구분'),
									xtype		: 'lookupfield',
									name		: 'supl_dvcd',
									width		: 250,
									lookupValue	: resource.lookup('supl_dvcd'),
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','FEMA'),
									xtype		: 'textfield',
									name		: 'fema',
									width		: 250,
								},{	fieldLabel	: Language.get('','안전납기'),
									xtype		: 'numericfield',
									name		: 'safe_deli_dcnt',
									width		: 250,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','GB'),
									xtype		: 'textfield',
									name		: 'wdgb',
									width		: 250,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
							 	{	fieldLabel	: Language.get('','CA'),
									xtype		: 'textfield',
									name		: 'caca',
									width		: 250,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','납'),
									xtype		: 'textfield',
									name		: 'lead',
									width		: 250,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('','비소'),
									xtype		: 'textfield',
									name		: 'biso',
									width		: 250,
								},{	xtype		: 'lookupfield',
									fieldLabel	: Language.get('algy_yorn','알러지'),
									name		: 'algy_yorn',
									width		: 250,
									editable	: false,
									lookupValue	: resource.lookup('yorn')
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('algy_yorn','라벨'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'mtrl_labl_name',
									width		: 250,
									pair		: 'mtrl_labl_code',
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp ,prnt_idcd : '8006'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_code'));
										}
									}
								},{	name : 'mtrl_labl_code', xtype : 'textfield' , hidden : true
								},{	xtype		: 'numericfield',
									fieldLabel	: Language.get('incm_cost','수입원가'),
									name		: 'incm_cost',
									width		: 250,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('hala_numb','할랄번호'),
									xtype		: 'textfield',
									name		: 'hala_numb',
									width		: 250,
								},{	xtype		: 'textfield',
									fieldLabel	: Language.get('natr_name','천연이름'),
									name		: 'natr_name',
									width		: 250,
									editable	: false,

								}
							]
						},{	xtype		: 'textarea',
							fieldLabel	: Language.get('mtrl_labl_cont','발행내용'),
							name		: 'mtrl_labl_cont',
							width		: 500,
							editable	: false,
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