Ext.define('module.custom.sjflv.haccp.docmcheck.view.DocmCheckEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-sjflv-docmcheck-editor',
	
	layout: 'border',
	height: 152,
	
	initComponent: function(config){
		var me = this;
		me.items = [me.createWest(), me.createCenter()];
		me.callParent(arguments);
	},

	createWest: function() {
		var me	= this,
			item = {
				xtype		: 'form-panel',
				region		: 'west',
				margin		: '2 0 0 0',
				width		: 450,
				border		: 0,
				bodyStyle	: {
					padding: '5px'
				},
				items		: [
					{	xtype	: 'fieldcontainer',
						width	: '100%',
						layout	: 'vbox',
						items	: [
							{	xtype	: 'fieldcontainer',
								width	: '100%',
								layout	: 'hbox',
								items	: [
									{	xtype		: 'textfield',
										name		: 'mngt_numb',
										width		: 325,
										fieldLabel	: Language.get('', '관리번호'),
									},{	xtype		: 'lookupfield',
										name		: 'line_stat',
										margin		: '1 0 0 0',
										width		: 70,
										editable	: false,
										lookupValue	: resource.lookup('dele_yorn'),
										value		: '0'
									}
								]
							},{	xtype	: 'fieldcontainer',
								width	: '100%',
								layout	: 'hbox',
								items	: [
									{	xtype		: 'textfield',
										name		: 'docm_bacd',
										fieldLabel	: Language.get('', '분류기준'),
										width		: 395,
									},{	xtype	: 'hiddenfield',
										name	: 'bzpl_idcd',
									}
								]
							},{	xtype	: 'fieldcontainer',
								width	: '100%',
								layout	: 'hbox',
								items	: [
									{	xtype		: 'textfield',
										name		: 'docm_name',
										width		: 395,
										fieldLabel	: Language.get('', '문서명'),
									}
								]
							},{	xtype	: 'fieldcontainer',
								width	: '100%',
								layout	: 'hbox',
								items	: [
									{	xtype		: 'textfield',
										name		: 'docm_numb',
										fieldLabel	: Language.get('', '문서번호'),
									},{	xtype		: 'lookupfield',
										name		: '',
										fieldLabel	: Language.get('', '작성주기'),
										margin		: '1 0 0 0',
										width		: 180,
										editable	: false,
										lookupValue	: resource.lookup('dwup_ccle_dvcd'),
									}
								]
							},{	xtype	: 'fieldcontainer',
								width	: '100%',
								layout	: 'hbox',
								items	: [
									{	xtype		: 'datefield',
										name		: '',
										fieldLabel	: Language.get('', '작성일자'),
										format		: "Y-m-d",
										value		: new Date()
									},{	xtype		: 'textfield',
										name		: 'apvl_drtr_name_1fst',
										fieldLabel	: Language.get('', '작성담당자'),
										width		: 180,
										value	: _global.login_nm
									},{	xtype	: 'hiddenfield',
										name	: 'apvl_drtr_idcd_1fst',
										value	: _global.login_id
									}
								]
							}
						]
					}
				]
			};
		return item;
	},
	
	createCenter: function() {
		var me = this,
			form = {
				xtype	: 'form-search',
				region	: 'center',
				margin	: 0,
				items	: [
					{	xtype	: 'fieldset',
						margin	: '72 0 0 0',
						items	: [
							{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	xtype	: 'label',
										text	: '결재명#1',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_1fst',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '작성담당자',
										xtype	: 'label',
										style : 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_drtr_name_1fst',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									},{	xtype	: 'hiddenfield',
										name	: 'apvl_drtr_idcd_1fst',
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재명#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_2snd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재담당자#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_drtr_name_2snd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									},{	xtype	: 'hiddenfield',
										name	: 'apvl_drtr_idcd_2snd',
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재명#3',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_name_3trd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									}
								]
							},{	xtype	: 'fieldcontainer',
								layout	: {
									type	: 'vbox', 
									align	: 'stretch'
								},
								width	: 140,
								style	: Const.borderLine.top + Const.borderLine.bottom + Const.borderLine.left + Const.borderLine.right,
								margin	: '3 0 3 3',
								items	: [
									{	text	: '결재담당자#2',
										xtype	: 'label',
										style	: 'text-align:center;'
									},{	xtype		: 'textfield',
										editable	: true,
										enableKeyEvents : true,
										margin		: 2,
										name		: 'apvl_drtr_name_3trd',
										editable	: true ,
										enableKeyEvents: true ,
										listeners	: {
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER ) {
												} else if (e.keyCode == e.ESC) {
												}
											}
										}
									},{	xtype	: 'hiddenfield',
										name	: 'apvl_drtr_idcd_3trd',
									}
								]
							}
						]
					}
				]
			};
		return form;
	}
});