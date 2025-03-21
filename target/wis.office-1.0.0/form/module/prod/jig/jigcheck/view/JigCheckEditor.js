Ext.define('module.prod.jig.jigcheck.view.JigCheckEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-jigcheck-editor',

	height : 305,
	layout : {
		type: 'border'
	},

	title			: Language.get('jigg_idcd',''),
	collapsible		: true	,
	collapsed		: true	,
	defaultFocus	: 'jigg_idcd',

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
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-',
				{text : Const.DELETE.text , iconCls: Const.DELETE.icon , action : Const.DELETE.action, cls: 'button-style' } , '-',
				{text : Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action, cls: 'button-style' } ,
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
				width			: 430,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('line_seqn','항번'),
								name		: 'line_seqn',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 200,
							},{	fieldLabel	: Language.get('chek_date','점검일자'),
								xtype		: 'datefield',
								name		: 'chek_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 180
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_name','점검명'),
								xtype		: 'textfield',
								name		: 'chek_name',
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_dvcd','점검구분'),
								name		: 'chek_dvcd',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('chek_dvcd'),
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_resn','점검사유'),
								xtype		: 'textfield',
								name		: 'chek_resn',
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('nxrm_chek_date','차기점검일자'),
								xtype		: 'datefield',
								name		: 'nxrm_chek_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('dmge_regn','고장부위'),
								xtype		: 'textfield',
								name		: 'dmge_regn',
								height		: 70,
								width		: 380
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
				border:0,
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(),{title : '첨부파일',xtype: 'module-jigcheck-editorlister'}]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
		item = {
				xtype			: 'form-panel',
				title			: '수리정보',
				dock			: 'left',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : ''},
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('repa_date','수리일자'),
								xtype		: 'datefield',
								name		: 'repa_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 180
							},{	fieldLabel	: Language.get('need_amnt','소요금액'),
								xtype		: 'numericfield',
								name		: 'need_amnt',
								width		: 200
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('repa_entr_name','수리업체명'),
								xtype		: 'textfield',
								name		: 'repa_entr_name',
								width		: 380
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
										{	fieldLabel	: Language.get('repa_sbsc_name','수리항목명'),
											xtype		: 'textfield',
											name		: 'repa_sbsc_name',
											width		: 380
										}
									]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('line_seqn','소요시간(분)'),
								name		: 'repa_need_time',
								xtype		: 'textfield',
								width		: 200,
								fieldStyle	: 'text-align: right;'
							},{	fieldLabel	: Language.get('trtm_dvcd','조치'),
								name		: 'trtm_dvcd',
								xtype		: 'lookupfield',
								lookupValue	: resource.lookup('trtm_dvcd'),
								width		: 180,
							}
						]
					},{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: Language.get('repa_cont','수리내용'),
								xtype		: 'textarea',
								name		: 'repa_cont',
								height		: 70,
								width		: 380
							}
						]
					}
				]
			}
		;
		return item;
	}
});