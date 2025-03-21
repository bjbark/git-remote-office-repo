Ext.define('module.prod.jig.jigmast.view.JigMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-jigmast-editor',

	height : 280,
	layout : {
		type: 'border'
	},

	title			: Language.get('jigg_idcd','지그 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'jigg_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			jig = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return jig;
	},

	createwest : function () {
		var me = this,
			jig = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('jigg_code','지그코드'),
								name		: 'jigg_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 55,
								margin		: '0 0 0 5',
								lookupValue	: resource.lookup('line_stat')
							}
						]
					},{	fieldLabel	: Language.get('jigg_name','지그명'),
						xtype		: 'textfield',
						name		: 'jigg_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340
					},{	fieldLabel	: Language.get('jigg_spec','지그규격'),
						xtype		: 'textfield',
						name		: 'jigg_spec',
						width		: 340
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('jigg_kind_dvcd','지그종류'),
								xtype		: 'lookupfield',
								name		: 'jigg_kind_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('jigg_kind_dvcd')
							},{	fieldLabel	: Language.get('jigg_stat_dvcd','지그상태'),
								width		: 170,
								xtype		: 'lookupfield',
								name		: 'jigg_stat_dvcd',
								width		: 170,
								lookupValue	: resource.lookup('jigg_stat_dvcd')
							}
						]
					},{	fieldLabel	: Language.get('jigg_qntt','수량'),
						xtype		: 'numericfield',
						name		: 'jigg_qntt',
						width		: 170
					},{	fieldLabel	: Language.get('dept_name','관리부서'),
						width		: 340,
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'dept_name',
						pair		: 'mngt_dept_idcd',
						clearable	: false ,
						popup : {
							select : 'SINGLE',
							widget : 'lookup-dept-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'mngt_dept_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('chek_ccle_dvcd','점검주기'),
						xtype		: 'lookupfield',
						name		: 'chek_ccle_dvcd',
						width		: 170,
						lookupValue	: resource.lookup('chek_ccle_dvcd'),
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('sral_numb_strt','시리얼번호'),
								xtype		: 'textfield',
								name		: 'sral_numb_strt',
								width		: 200
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'textfield',
								name		: 'sral_numb_endd',
								width		: 140,
								labelWidth	: 15
							}
						]
					}
				]
			}
		;
		return jig;
	},

	createTabs : function () {
		var me = this,
			jig = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2(), me.createTab3(), {title : '첨부파일',xtype: 'module-jigmast-editorlister'}]
			}
		;
		return jig;
	},

	createTab1 : function() {
		var me = this,
			jig = {
				title	: '구매.제조사',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('puch_cstm','구매거래처'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cstm_name',
									pair		: 'puch_cstm_idcd',
									clearable	: false ,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_code'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'puch_cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('puch_cstm_name','구매거래처명'),
									xtype		: 'textfield',
									name		: 'puch_cstm_name'
								},{	fieldLabel	: Language.get('vend_tele_numb','거래처전화번호'),
									xtype		: 'textfield',
									name		: 'vend_tele_numb'
								},{	fieldLabel	: Language.get('afsv_tele_numb','AS전화번호'),
									xtype		: 'textfield',
									name		: 'afsv_tele_numb'
								},{	fieldLabel	: Language.get('puch_amnt','구매금액'),
									xtype		: 'numericfield',
									name		: 'puch_amnt'
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('puch_date','구매일자'),
											xtype		: 'datefield',
											name		: 'puch_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											width		: 200
										},{	fieldLabel	: Language.get('jigg_usge','용도'),
											xtype		: 'lookupfield',
											name		: 'jigg_usge',
											labelWidth	: 50,
											width		: 141,
											lookupValue	: resource.lookup('jigg_usge')
										}
									]
								}
							]
						}
					]
			}
		;
		return jig;
	},
	createTab2 : function() {
		var me = this,
			jig = {
				title	: '추가정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 , margin : '10 0 0 0',
							items	: [
								{	fieldLabel	: Language.get('norm_ivst_date','양산투입일자'),
									xtype		: 'datefield',
									name		: 'norm_ivst_date',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									width		: 200
								},{	fieldLabel	: Language.get('aset_idcd','자산번호'),
									xtype		: 'textfield',
									name		: 'aset_idcd'
								},{	fieldLabel	: Language.get('cvic_type_dvcd','설비형식'),
									xtype		: 'lookupfield',
									name		: 'cvic_type_dvcd',
									lookupValue	: resource.lookup('cvic_type_dvcd')
								},{	fieldLabel	: Language.get('cvic_abty','설비능력'),
									xtype		: 'textfield',
									name		: 'cvic_abty'
								}
							]
						}
					]
			}
		;
		return jig;
	},

	createTab3 : function() {
		var me = this,
			jig = {
				title	: '생산품목',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' },
					items	: [
					]
				}
		;
		return jig;
	}
});