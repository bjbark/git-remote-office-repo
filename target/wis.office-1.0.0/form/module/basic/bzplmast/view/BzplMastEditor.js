Ext.define('module.basic.bzplmast.view.BzplMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-bzplmast-editor',

	height : 260,
	layout : {
	type: 'border'
	},

	title			: Language.get('bzpl_info','사업장 정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'dept_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				xtype			: 'form-panel'		,
				dock			: 'left'			,
				width			: 333				,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 320, labelWidth : 55, labelSeparator : '' },
				items			: [
				{
					xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
					items	: [
						{	fieldLabel	: Language.get( 'bzpl_code','사업장코드'),
							name		: 'bzpl_code',
							xtype		: 'textfield',
							readOnly	: false,
							emptyText	: Const.invalid.emptyValue,
							allowBlank	: false,
							width		: 235,
							fieldCls	: '',
						},{ xtype		: 'lookupfield',
							name		: 'line_stat',
							lookupValue	: resource.lookup('line_stat')	,
							width		: 80,
							margin		: '0 0 0 5'
						}
					]
				},{ fieldLabel	: Language.get( 'bzpl_name','사업장명'),
					xtype		: 'textfield',
					name		: 'bzpl_name',
					readOnly	: false,
					allowBlank	: true,
					fieldCls	: '',
				},{	fieldLabel	: Language.get('bzct_dvcd','사업부문구분코드'),
					name		: 'bzct_dvcd',
					xtype		: 'lookupfield',
					readOnly	: false,
					editable	: false,
					hidden		: true,
					lookupValue	: resource.lookup('bzct_dvcd'),
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('prod_bzpl_yorn','생산사업부여부'),
							name		: 'prod_bzpl_yorn',
							xtype		: 'lookupfield',
							readOnly	: false,
							editable	: false,
							width		: 155,
							lookupValue	: resource.lookup('yorn'),
						},{ fieldLabel	: Language.get('rpst_bzpl_yorn','대표사업장여부'),
							name		: 'rpst_bzpl_yorn',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('yorn'),
							width		: 155,
							margin		: '0 5 0 10'
						}
					]
				},
			]
		}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center'	,
				margin	: 0	,
				plain	: true	,
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var item = {
				title		: '사업장정보',
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				region		: 'center',
				fieldDefaults: { labelWidth : 60, labelSeparator : '' },
				items		: [
					{	xtype 	: 'panel',
						layout	: 'hbox',
						border	: 0,
						items	: [
							{	xtype		: 'form-panel',
								border		: 0,
								width		: 240,
								fieldDefaults: { width : 215, labelWidth : 50, labelSeparator : '' },
								items		: [
									{	fieldLabel	: '사업명'			, name : 'buss_name'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									},{ fieldLabel	: '대표자명'			, name : 'boss_name'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '업태'				, name : 'buss_type'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '업종'				, name : 'buss_kind'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									}
								]
							},{	xtype		: 'form-panel',
								border		:   0,
								width		: 250,
								fieldDefaults: { width : 245, labelWidth : 80, labelSeparator : '' },
								items		: [
									{	fieldLabel	: '사업자등록번호'	, name : 'buss_numb'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true , vtype : 'bizno'
									},{ fieldLabel	: '법인번호'			, name : 'corp_numb'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '전화번호'			, name : 'tele_numb'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									},{	fieldLabel	: '팩스번호'			, name : 'faxi_numb'	, xtype : 'textfield'	, readOnly : false	, onwerEditing : true
									}
								]
							}
						]
					},{	xtype	: 'fieldset',
						layout	: 'hbox' ,
						padding	:'0',
						border	: 0,
						margin	: '0 0 0 0',
						items	: [
							{	xtype	: 'fieldset',
								layout	: 'hbox',
								padding	: '0',
								border	:  0,
								margin	: '0 0 5 0' ,
								items	: [
									{	fieldLabel	: '주소',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										name		: 'post_code',
										pair		: '',
										allowBlank	: true,
										clearable	: false ,
										width		: 130,
										labelWidth	: 50,
										popup		: {
											select	: 'DAUM',
											widget	: 'popup-zipcode-search',
											params	: { },
											result	: function(records, nameField, pairField){
												var panel   = nameField.up('form');
												if	(	records.length > 0 ){
													var address = records[0];
														nameField.setValue( address.zonecode );
														panel.down('[name=addr_1fst]' ).setValue( address.roadAddress );
														panel.down('[name=addr_2snd]').focus(true , 10);
												}
											}
										}
									}
								]
							},{ name : 'addr_1fst' , width : 345 , xtype  : 'textfield' ,  margin : '0 0 2 10'
						},{	fieldLabel	: Language.get('addr_engl_1fst','영문주소'),
							name		: 'addr_engl_1fst',
							xtype		: 'textfield',
							hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							labelWidth	: 80,
							width		: 350
						}
					]
				},{	xtype	: 'fieldset',
					layout	: 'hbox' ,
					padding	:'0',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset',
							layout	: 'hbox',
							padding	: '0',
							border	:  0,
							margin	: '0 0 5 0' ,
							items	: [
								{	fieldLabel	: '상세주소',
									xtype		: 'textfield',
									name		: 'addr_2snd',
									width		: 485,
									readOnly	: false,
									maxLength	: 100,
									labelWidth	: 50,
									maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.',
									margin		: '0 0 5 0'
								}
							]
						},{	fieldLabel	: '영문상세주소',
							xtype		: 'textfield',
							name		: 'addr_engl_2snd',
							width		: 350,
							hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							labelWidth	: 80,
							maxLength	: 100,
						}
					]
				}
			]
		}
		return item;
	}
});