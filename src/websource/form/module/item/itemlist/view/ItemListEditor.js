Ext.define('module.item.itemlist.view.ItemListEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemlist-editor',

	height : 420,
	layout : {
	type: 'border'
	},

	title			: Language.get('item_info','품목코드 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
//		me.dockedItems = [ me.createDock()];
		me.dockedItems = [ me.createDock(), me.createwest()];
//		me.items = [me.createTabs(), me.createForm()];
		me.items = [me.createTabs()];
//		            , me.createForm()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
//				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
//				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
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
				width			: 360,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '', readOnly:true },
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
							}
						]
					},{	fieldLabel	: Language.get('item_name', '품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 340
					},{	fieldLabel	: Language.get('modl_name','모델명'),
						xtype		: 'textfield',
						name		: 'modl_name',
						width		: 340,
						hidden: _global.options.mes_system_type =='Frame',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('acct_bacd_name','계정구분'),
								width		: 170,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								clearable	: false ,
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
								listeners	: {
									change : function(val,code){
										var purc    = me.down('[name=edit_tab1]');
										var tabs    = me.down('[name=edit_tab1]').up('tabpanel');
										var adon    = me.down('[name=edit_tab2]');
										var desc    = me.down('[name=edit_tab3]');
										var cont    = me.down('[name=edit_tab4]');
										var hidden1 = false;
										var hidden2 = false;

										if(code=='2001'||code=='2002'||code=='3000'){
											if((_global.options.item_adon_disp_yorn==0)){
												hidden2 = true;
											}
											hidden1 = true;
										}

										if(hidden1==true && hidden2 ==false){
											purc.tab.hide();
											adon.tab.show();
											tabs.setActiveTab(adon);
											cont.down('[name=cont_pric]').setFieldLabel('판매단가');
										}else if(hidden1==true && hidden2==true){
											adon.tab.hide();
											purc.tab.hide();
											tabs.setActiveTab(desc);
											cont.down('[name=cont_pric]').setFieldLabel('판매단가');
										}else{
											adon.tab.hide();
											purc.tab.show();
											tabs.setActiveTab(purc);
											cont.down('[name=cont_pric]').setFieldLabel('구매단가');
										}
									}
								}
							},{	fieldLabel	: Language.get('unit_name','수불단위'),
								width		: 170,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'unit_name',
								pair		: 'unit_idcd',
								clearable	: false ,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-unit-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('unit_name'));
										pairField.setValue(records[0].get('unit_code'));
									}
								}
							},{	name : 'unit_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	fieldLabel	: Language.get('clss_desc','품목분류'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'clss_desc',
						pair		: 'lcls_idcd',
						clearable	: false ,
						hidden: _global.options.mes_system_type =='Frame',
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
					},{	fieldLabel	: Language.get('colr_bacd','재질'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mtrl_bacd_name',
						pair		: 'mtrl_bacd',
						width		: 340,
						hidden		: _global.options.mes_system_type =='Frame',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-base-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3101' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						}
					},{	name	: 'mtrl_bacd', xtype : 'textfield' , hidden : true

					},{	fieldLabel	: Language.get('make_cmpy_name','제조사'),
						xtype		: 'textfield',
						name		: 'make_cmpy_name',
						hidden: _global.options.mes_system_type =='Frame',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('yorn','LOT관리'),
								xtype		: 'lookupfield',
								name		: 'lott_mngt_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
								hidden: _global.options.mes_system_type =='Frame',
							},{	fieldLabel	: Language.get('yorn','재고관리'),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								width		: 170,
								lookupValue	: resource.lookup('yorn'),
							}
						]

					},{	fieldLabel	: Language.get('lott_idnf_code','LOT식별'),
						xtype		: 'textfield',
						name		: 'lott_idnf_code',
						hidden: _global.options.mes_system_type =='Frame',
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('insp_type_name','검사유형'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'insp_type_name',
								pair		: 'insp_type_idcd',
								clearable	: false ,
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
					},{	name		: 'imge_chek1', xtype : 'textfield' , hidden : true
					},{	name		: 'imge_chek2', xtype : 'textfield' , hidden : true
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
				items	: [ me.createTab1(), me.createTab2(), me.createTab3(),me.createTab4(),me.createTab5()]
			}
		;
		return item;
	},

//	createForm : function(){
//		var  me = this,
//			form = {
//				xtype		: 'form-layout',
//				region		: 'center',
//				border		: false,
//				dockedItems : [ me.searchForm()],
//				items		: [ me.createGrid()]
//			}
//			;
//			return form;
//	},

	createTab1 : function() {
		var me = this,
			item = {
				title	: '자재정보',
				xtype	: 'form-panel',
				name	: 'edit_tab1',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '', readOnly:true },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('istt_wrhs_name','입고창고'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'istt_wrhs_name',
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
								},{	fieldLabel	: Language.get('base_vend_idcd','기본구매처'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'base_vend_name',
									pair		: 'base_vend_idcd',
									clearable	: false ,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name	: 'base_vend_idcd', xtype : 'textfield' , hidden : true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('yorn','자동입고'),
											xtype		: 'lookupfield',
											name		: 'auto_istt_yorn',
											lookupValue	: resource.lookup('yorn'),
											width		: 170
										},{	fieldLabel	: Language.get('coun_iout_dvcd','국내/수입'),
											xtype		: 'lookupfield',
											name		: 'coun_iout_dvcd',
											width		: 171,
											lookupValue	: resource.lookup('coun_iout_dvcd')
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('rtil_ddln_dcnt','유통기한'),
											xtype		: 'numericfield',
											name		: 'rtil_ddln_dcnt',
											width		: 185,
											margin		: '0 5 0 0'
										},{	fieldLabel	: Language.get('rtil_ddln_dvcd'),
											xtype		: 'lookupfield',
											name		: 'rtil_ddln_dvcd',
											width		: 151,
											lookupValue	: resource.lookup('rtil_ddln_dvcd'),
											editable	: false
										}
									]
								},{	fieldLabel	: Language.get('drtr_name','구매담당'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									clearable	: false ,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('yorn','인수검사여부'),
									xtype		: 'lookupfield',
									name		: 'rcpt_insp_yorn',
									width		: 170,
									lookupValue	: resource.lookup('yorn')
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('minm_puch_qntt','최소구매량'),
											xtype		: 'numericfield',
											name		: 'minm_puch_qntt',
											width		: 170
										},{	fieldLabel	: Language.get('puch_itvl_qntt','구매간격량'),
											xtype		: 'numericfield',
											name		: 'puch_itvl_qntt',
											width		: 171,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
									items	: [
										{	fieldLabel	: Language.get('avrg_supl_dcnt','평균조달일수'),
											xtype		: 'numericfield',
											name		: 'avrg_supl_dcnt',
											width		: 170
										},{	fieldLabel	: Language.get('optm_offr_volm','적정발주량'),
											xtype		: 'numericfield',
											name		: 'optm_offr_volm',
											width		: 171
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
				title	: '제품정보',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab2',
				region	: 'center',
				hidden	: (_global.options.item_adon_disp_yorn==0),
				fieldDefaults	: { width : 360, labelWidth : 100, labelSeparator : '', readOnly:true},
					items	: [
						{	fieldLabel	: Language.get('ostt_wrhs_name','출고창고'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'ostt_wrhs_name',
							pair		: 'ostt_wrhs_idcd',
							clearable	: false ,
							margin		: '10 0 2 0',
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
						},{	fieldLabel	: Language.get('colr_bacd_name','색상'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'colr_bacd_name',
							pair		: 'colr_bacd',
							margin		: '2 0 2 0',
							hidden		: _global.options.mes_system_type =='Frame',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-base-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '3104' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('base_name'));
									pairField.setValue(records[0].get('base_code'));
								}
							}
						},{	name	: 'colr_bacd', xtype : 'textfield' , hidden : true
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
						},{	fieldLabel	: Language.get('wkfw_name','생산라인'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'wkfw_name',
							pair		: 'wkfw_idcd',
							clearable	: false ,
							margin		: '2 0 2 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-wkfw-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('wkfw_name'));
									pairField.setValue(records[0].get('wkfw_idcd'));
								}
							}
						},{	name		: 'wkfw_idcd', xtype : 'textfield' , hidden : true
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
				title	: '속성정보',
				xtype	: 'form-panel',
				name	: 'edit_tab3',
				dock	:'left',
				region	: 'center',
				hidden	: (_global.options.item_spec_disp_yorn==0),
				fieldDefaults	: { width : 290, labelWidth : 100, labelSeparator : '', readOnly:true},
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 2 0',
								items	: [
									{	fieldLabel	: Language.get('drwg_numb','도면번호'),
										xtype		: 'textfield',
										name		: 'drwg_numb',
										width		: 245,
										labelWidth	: 70
									},{	fieldLabel	: Language.get('ansi_name','ANSI호칭'),
										xtype		: 'textfield',
										name		: 'ansi_name',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('ansi_mntn_qntt','ANSI산수'),
										xtype		: 'numericfield',
										name		: 'ansi_mntn_qntt',
										labelWidth	: 70,
										width		: 150,
									},{	fieldLabel	: Language.get('bolt_name','호칭'),
										xtype		: 'numericfield',
										name		: 'bolt_name',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('bolt_pith','PITCH'),
										xtype		: 'numericfield',
										name		: 'bolt_pith',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('leng_valu','이동길이'),
										xtype		: 'numericfield',
										name		: 'leng_valu',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('leng_valu_2snd','고정길이'),
										xtype		: 'numericfield',
										name		: 'leng_valu_2snd',
										labelWidth	: 70,
										width		: 150,
									},{	fieldLabel	: Language.get('widh_valu','높이'),
										xtype		: 'numericfield',
										name		: 'widh_valu',
										labelWidth	: 70,
										width		: 150,
										margin		: '2 0 4 0',
									},{	xtype		: 'textfield',
										name		: 'widh_unit',
										width		: 40,
										emptyText	: '단위',
										hidden		: true
									},{	fieldLabel	: Language.get('tick_valu','두께'),
										xtype		: 'numericfield',
										name		: 'tick_valu',
										labelWidth	: 70,
										width		: 150
									},{	xtype		: 'textfield',
										name		: 'tick_unit',
										width		: 40,
										emptyText	: '단위',
										hidden		: true
									}
								]
//								},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '2 0 2 0',
//									items	: [
//										{	fieldLabel	: Language.get('spgr_valu','비중'),
//											xtype		: 'numericfield',
//											name		: 'spgr_valu',
//											labelWidth	: 70,
//											width		: 150
//										},{	fieldLabel	: Language.get('item_wigt','중량'),
//											xtype		: 'numericfield',
//											name		: 'item_wigt',
//											labelWidth	: 70,
//											width		: 150
//										}
//									]
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '2 0 2 0',
								items	: [
									{	fieldLabel	: Language.get('half_pith','반피치'),
										xtype		: 'numericfield',
										name		: 'half_pith',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('sinn_valu','SIN값'),
										xtype		: 'numericfield',
										name		: 'sinn_valu',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('a_valu','a값'),
										xtype		: 'numericfield',
										name		: 'a_valu',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('b_valu','b값'),
										xtype		: 'numericfield',
										name		: 'b_valu',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('bolt_dpth','깊이'),
										xtype		: 'numericfield',
										name		: 'bolt_dpth',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('mntn_dpth','산깊이'),
										xtype		: 'numericfield',
										name		: 'mntn_dpth',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('lead_angl','리드각'),
										xtype		: 'numericfield',
										name		: 'lead_angl',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('lead_angl_stte','리드각도'),
										xtype		: 'numericfield',
										name		: 'lead_angl_stte',
										labelWidth	: 70,
										width		: 150
									},{	fieldLabel	: Language.get('lead_angl_mint','리드각분'),
										xtype		: 'numericfield',
										name		: 'lead_angl_mint',
										labelWidth	: 70,
										width		: 150
									}
								]
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '2 0 2 0',
								items	: [
									{	fieldLabel	: Language.get('tper_dpth','TAPER깊이'),
										xtype		: 'numericfield',
										name		: 'tper_dpth',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('tper_leng','TAPER길이'),
										xtype		: 'numericfield',
										name		: 'tper_leng',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('tper_angl','TAPER각'),
										xtype		: 'numericfield',
										name		: 'tper_angl',
										labelWidth	: 120,
										width		: 200,
									},{	fieldLabel	: Language.get('tper_angl_stte','TAPER각도'),
										xtype		: 'numericfield',
										name		: 'tper_angl_stte',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('tper_angl_mint','TAPER각분'),
										xtype		: 'numericfield',
										name		: 'tper_angl_mint',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('a_valu_scpe','a값범위'),
										xtype		: 'textfield',
										name		: 'a_valu_scpe',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('b_valu_scpe','b값범위'),
										xtype		: 'textfield',
										name		: 'b_valu_scpe',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('mntn_dpth_scpe','산깊이 범위'),
										xtype		: 'textfield',
										name		: 'mntn_dpth_scpe',
										labelWidth	: 120,
										width		: 200
									},{	fieldLabel	: Language.get('tolr_valu','공차'),
										xtype		: 'numericfield',
										name		: 'tolr_valu',
										labelWidth	: 120,
										width		: 200
									}
								]
							}
						]
					},{	fieldLabel	: Language.get('unit_name2','단위명'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'unit_name2',
						pair		: 'unit_idcd2',
						clearable	: false ,
						hidden		: true,
						margin		: '10 0 2 0',
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-unit-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('unit_name'));
								pairField.setValue(records[0].get('unit_idcd'));
							}
						}
					},{	name	: 'unit_idcd2'	, xtype : 'textfield'	, hidden  : true
					}
				]
			}
		;
		return item;
	},

	createTab4 : function() {
		var me = this,
//		me.dockedItems = [ me.searchForm()];
//		me.items = [me.createTabs(), me.createForm()];
//		me.items = [me.createTabs()];
//		me.callParent(arguments)  ;
//	},
//	searchForm: function(){
//		var me = this,
//			form = {
//			xtype		: 'form-panel',
//			bodyStyle	: { padding: '0', background: 'transparent' },
//			dockedItems	: [
//				{	xtype	: 'toolbar',
//					dock	: 'top',
//					items	: [
			item = {
				title	: '계약사항',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab4',
				region	: 'center',
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' , readOnly:true},
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 , margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('cont_cstm_name','거래처'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									width		: 400,
									name		: 'cont_cstm_name',
									pair		: 'cont_cstm_idcd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cont_cstm_idcd', xtype : 'textfield' , hidden :true
								},{	fieldLabel	: Language.get('cont_date','계약일자'),
									xtype		: 'datefield',
									name		: 'cont_date',
									width		: 200,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('cont_pric','단가'),
											xtype		: 'numericfield',
											width		: 200,
											name		: 'cont_pric'
										},{	fieldLabel	: Language.get('deli_dcnt','납기일수'),
											xtype		: 'numericfield',
											width		: 201,
											name		: 'deli_dcnt'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'5 5 5 0',
									items	: [
										{	fieldLabel	: Language.get('trnt_mthd_dvcd','운송방법'),
											xtype		: 'lookupfield',
											name		: 'trnt_mthd_dvcd',
											lookupValue	: resource.lookup('trnt_mthd_dvcd'),
											editable	: false
										},{	fieldLabel	: Language.get('cont_drtr_name','담당자'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'cont_drtr_name',
											pair		: 'cont_drtr_idcd',
											clearable	: false ,
											width		: 201,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'cont_drtr_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
									items	: [
												{	xtype		: 'label',
													width		: 105,
													margin		: '0 0 2 125',
													text		: '초물'
												},{	xtype		: 'label',
													width		: 100,
													margin		: '0 0 2 0',
													text		: '중물'
												},{	xtype		: 'label',
													width		: 50,
													margin		: '0 0 2 0',
													text		: '종물'
												}
											]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('yorn','검사여부'),
											xtype		: 'lookupfield',
											name		: 'ftmr_insp_yorn',
											width		: 185,
											margin		: '0 5 0 0',
											lookupValue	: resource.lookup('yorn')
										},{	xtype		: 'lookupfield',
											name		: 'mdmr_insp_yorn',
											width		: 103,
											margin		: '0 5 0 0',
											lookupValue	: resource.lookup('yorn')
										},{	xtype		: 'lookupfield',
											name		: 'ltmr_insp_yorn',
											width		: 104,
											lookupValue	: resource.lookup('yorn')
										}
									]
								}
							]
						}
					]
				}
		;
		return item;
//		return form;
	},
	createTab5 : function() {
		var me = this,
			item = {
				title	: '이미지',
				name	: 'imge_info',
				xtype	: 'form-panel',
				dock	:'left',
				name	: 'edit_tab5',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype 	: 'panel',
							layout	: 'hbox',
							border	: 0,
							margin	: '5 0 0 45',
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
		var form = this.up('form').up('[name=edit_tab5]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');

		form.down('[name=files]').fileInputEl.dom.value = '';
	},
	imgCancle2:function(){
		var form = this.up('form').up('[name=edit_tab5]');
		form.down('[name=image2]').setSrc('');
		form.down('[name=item_imge2]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	}
});