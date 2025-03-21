Ext.define('module.prod.cvic.cviccheck.view.CvicCheckEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-cviccheck-editor',

	height : 345,
	layout : {
		type: 'border'
	},

	title			: Language.get('cvic_idcd','점검 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'cvic_idcd',

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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	fieldLabel	: Language.get('cvic_name','설비명'),
						name		: 'cvic_name',
						xtype		: 'textfield',
						fieldCls	: 'requiredindex',
						width		: 380,
						readOnly	: true,
						margin		: '0 0 0 0',
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
						items		: [
							{	fieldLabel	: Language.get('cvic_idcd','설비코드'),
								name		: 'cvic_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 200,
								margin		: '5 0 5 0',
								hidden		: false,
								readOnly	: true
							},{	fieldLabel	: Language.get('line_seqn','항번'),
								name		: 'line_seqn',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 180,
								margin		: '5 0 5 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_dvcd','점검구분'),
								xtype		: 'lookupfield',
								name		: 'chek_dvcd',
								width		: 200,
								lookupValue	: resource.lookup('chek_dvcd')
							},{	fieldLabel	: Language.get('chek_date','점검일자'),
								xtype		: 'datefield',
								name		: 'chek_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 180
							}
						]
					},{	fieldLabel	: Language.get('chek_name','점검명'),
						xtype		: 'textfield',
						name		: 'chek_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 380
					},{	fieldLabel	: Language.get('chek_resn','점검사유'),
						xtype		: 'textfield',
						name		: 'chek_resn',
						width		: 380
					},{	fieldLabel	: Language.get('dmge_regn','고장부위'),
						xtype		: 'textarea',
						name		: 'dmge_regn',
						height		: 50,
						width		: 380
					},{	fieldLabel	: Language.get('nxrm_chek_date','차기점검일자'),
						xtype		: 'datefield',
						name		: 'nxrm_chek_date',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						width		: 200
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
				items	: [ me.createTab1()]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title	: '수리정보',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	fieldLabel	: Language.get('repa_date','수리일자'),
							xtype		: 'datefield',
							name		: 'repa_date',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							width		: 200,
							margin		: '10 0 5 0'
						},{	fieldLabel	: Language.get('repa_entr_name','수리업체명'),
							xtype		: 'textfield',
							name		: 'repa_entr_name'
						},{	fieldLabel	: Language.get('repa_sbsc_name','수리항목명'),
							xtype		: 'textfield',
							name		: 'repa_sbsc_name'
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
							items	: [
								{	fieldLabel	: Language.get('repa_need_time','소요시간'),
									xtype		: 'textfield',
									name		: 'repa_need_time',
									width		: 200
								},{	fieldLabel	: Language.get('need_amnt','수리금액'),
									xtype		: 'numericfield',
									name		: 'need_amnt',
									width		: 200
								}
							]
						},{	fieldLabel	: Language.get('repa_resn_dvcd','수리사유'),
							xtype		: 'lookupfield',
							name		: 'repa_resn_dvcd',
							width		: 200,
							lookupValue	: resource.lookup('repa_resn_dvcd')
						},{	fieldLabel	: Language.get('repa_cont','수리내용'),
							xtype		: 'textarea',
							name		: 'repa_cont',
							height		: 50
						}
					]
			}
		;
		return item;
	}
});