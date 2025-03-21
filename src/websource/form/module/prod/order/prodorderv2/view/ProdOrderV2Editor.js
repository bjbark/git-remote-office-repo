Ext.define('module.prod.order.prodorderv2.view.ProdOrderV2Editor', { extend : 'Axt.form.Editor',

	alias: 'widget.module-prodorderv2-editor',

	height : 330,
	layout : {
	type: 'border'
	},

	title			: Language.get('',''),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: '',

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
				width			: 360,
//				border			: 0,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('invc_numb','지시번호'),
								name		: 'invc_numb',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls   : 'readonlyfield',
								readOnly	: true,
								width		: 280
							},{	xtype		: 'numericfield',
								name		: 'line_seqn',
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								fieldCls   : 'readonlyfield',
								readOnly	: true,
							}
						]
					},{	fieldLabel	: Language.get('item','품목'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'item_name',
						pair		: 'item_idcd',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-item-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
								me.down('[name=item_spec]').setValue(records[0].get('item_spec'))
								me.down('[name=modl_name]').setValue(records[0].get('modl_name'))
							}
						}
					},{ fieldLabel	: Language.get('item_idcd','품목ID'),
						name		: 'item_idcd',
						xtype		: 'textfield',
						hidden		: true
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						width		: 340
					},{	fieldLabel	: Language.get('modl_name','모델명'),
						xtype		: 'textfield',
						name		: 'modl_name',
						width		: 340
					},{	fieldLabel	: Language.get('wkct_name','공정명'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						},

					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true,
						listeners:{
							render:function(){
								me.down('[name=cvic_name]').popup.params= {stor_grp : _global.stor_grp , line_stat : '0', wkct_idcd:this.getValue()};
							},
							change:function(){
								me.down('[name=cvic_name]').popup.params= {stor_grp : _global.stor_grp , line_stat : '0', wkct_idcd:this.getValue()};
							}
						}
					},{	fieldLabel	: Language.get('cvic_name','설비명'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						clearable	: true ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cvic-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mold_name',
						pair		: 'mold_idcd',
						width		: 340,
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
					},{	fieldLabel	: Language.get('wkct_item_name','공정품명'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_item_name',
						pair		: 'wkct_item_idcd',
						width		: 340,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-item-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
							}
						}
					},{ name	: 'wkct_item_idcd',xtype		: 'textfield',hidden		: true
					},
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
//				xtype	: 'tabpanel',
				region	: 'center',
				layout	: 'fit',
				margin	: 0,
				border	: 0,
				plain	: true,
				items	: [
					me.createTab1()
				]
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
				xtype	: 'form-panel',
				name	: 'edit_tab1',
				dock	: 'left',
				border	: 0,
				region	: 'center',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 341, labelWidth : 75, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('prod_dept_name','생산부서'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'prod_dept_name',
											pair		: 'prod_dept_idcd',
											width		: 170,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-dept-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('dept_name'));
													pairField.setValue(records[0].get('dept_idcd'));
												}
											}
										},{	name	: 'prod_dept_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('dayn_dvcd','주 / 야'),
											xtype		: 'lookupfield',
											name		: 'dayn_dvcd',
											lookupValue : resource.lookup('dayn_dvcd'),
											width		: 170,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('unit_name','단위'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'unit_name',
											pair		: 'unit_idcd',
											width		: 170,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-unit-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('unit_name'));
													pairField.setValue(records[0].get('unit_idcd'));
												}
											}
										},{	name	: 'unit_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('mtrl_bacd_name','재질'),
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											name		: 'mtrl_bacd_name',
											pair		: 'mtrl_bacd',
											width		: 170,
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
										},
									]
								},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',hidden : (_global.stor_id.toUpperCase() == 'N1000INKOP1000'?true:false),
									items		: [
										{	fieldLabel	: Language.get('pckg_cotr_bacd','포장용기'),
											xtype		: 'lookupfield',
											name		: 'pckg_cotr_bacd',
											width		: 170,
											lookupValue	: resource.lookup('pckg_cotr_bacd'),

										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('plan_strt_dttm','착수일자'),
											xtype		: 'datefield',
											name		: 'plan_strt_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 170
										},{	xtype		: 'timefield',
											name		: 'plan_strt_time',
											width		: 70,
											editable	: false,
											format		: 'H:i',
											submitFormat: 'Hi'
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('pref_rank','우선순위'),
											xtype		: 'numericfield',
											name		: 'pref_rank',
											width		: 170
										},{	fieldLabel	: Language.get('acpt_qntt','수주수량'),
											xtype		: 'numericfield',
											name		: 'acpt_qntt',
											width		: 170
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('indn_qntt','지시수량'),
											xtype		: 'numericfield',
											name		: 'indn_qntt',
											width		: 170
										},{	fieldLabel	: Language.get('stok_used_qntt','재고사용수량'),
											xtype		: 'numericfield',
											name		: 'stok_used_qntt',
											width		: 170,
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('last_wkct_yorn','최종공정'),
											xtype		: 'lookupfield',
											name		: 'last_wkct_yorn',
											width		: 170,
											lookupValue	: resource.lookup('yorn')
										},{	fieldLabel	: Language.get('insp_wkct_yorn','검사공정'),
											xtype		: 'lookupfield',
											name		: 'insp_wkct_yorn',
											lookupValue	: resource.lookup('yorn'),
											width		: 170
										}
									]
								},{	fieldLabel	: Language.get('prog_stat_dvcd','진행상태'),
									xtype		: 'lookupfield',
									name		: 'prog_stat_dvcd',
									readOnly	: true,
									lookupValue	: resource.lookup('prog_stat_dvcd'),
									width		: 170
								}
							]
						}
					]
			}
			;
			return item;
	},
});