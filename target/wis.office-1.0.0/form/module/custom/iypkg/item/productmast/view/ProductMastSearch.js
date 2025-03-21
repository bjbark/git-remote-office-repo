Ext.define('module.custom.iypkg.item.productmast.view.ProductMastSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-productmast-search',



	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 제품코드 또는 제품명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					},
				]
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			wmld_widget_search
		;
		var	line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								editable	: true,
								clearable	: true,
								enableKeyEvents	: true,
								allowBlank	: true,
								width		: 300,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-cstm-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' , sale_cstm_yorn:1},
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
								listeners:{
									change	: function(){
										this.popup.params.find = this.getValue();
									},
								}
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true,
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
								items	: [
									{	fieldLabel	: Language.get('prod_leng', '장'),
										xtype		: 'numericfield',
										name		: 'prod_leng',
										labelStyle	: 'text-align:right;',
										enableKeyEvents : true,
										labelWidth	: 50,
										width		: 110,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=prod_widh]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=find_name]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('prod_widh', '폭'),
										xtype		: 'numericfield',
										name		: 'prod_widh',
										labelStyle	: 'text-align:right;',
										enableKeyEvents : true,
										labelWidth	: 40,
										width		: 100,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
													me.down('[name=prod_hght]').focus(true , 10)
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=prod_leng]').focus(true , 10)
													}
												});
											}
										}
									},{	fieldLabel	: Language.get('prod_hght', '고'),
										xtype		: 'numericfield',
										name		: 'prod_hght',
										labelStyle	: 'text-align:right;',
										enableKeyEvents : true,
										labelWidth	: 40,
										width		: 100,
										listeners	:{
											keydown : function(self, e) {
												if (e.keyCode == e.ENTER) {
													var searchButton = self.up('form').down('[action=selectAction]');
													searchButton.fireEvent('click', searchButton); //조회버튼클릭
												}
												this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
													scope: this,
													key: Ext.EventObject.TAB,
													shift:true,
													fn: function () {
														me.down('[name=prod_widh]').focus(true , 10)
													}
												});
											}
										}
									},{ xtype  : 'button',
										text   : '<span class="write-button">초기화</span>'	,
										cls    : 'button1-style',
										margin : '0 0 0 10',
										handler: function() {
											me.down('[name=prod_widh]').setValue('');
											me.down('[name=prod_leng]').setValue('');
											me.down('[name=prod_hght]').setValue('');
										}
									}
								]
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								labelWidth	:  60,
								width		: 140,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: ''
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						hidden	: !(_global.hqof_idcd.toUpperCase()=='N1000LIEBE'),
						items	: [
							{	fieldLabel	: Language.get('wmld_numb','목형'),
								xtype		: 'popupfield',
								name		: 'wmld_numb',
								pair		: 'wmld_idcd',
								editable	: true,
								clearable	: true,
								enableKeyEvents	: true,
								width		: 300,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-mold-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' , sale_cstm_yorn:1},
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mold_name'));
										pairField.setValue(records[0].get('mold_idcd'));
									}
								},
								listeners:{
									change	: function(){
										this.popup.params.find = this.getValue();
									},
								}
							},{	name		: 'wmld_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('cpst_numb','조판번호'),
								name		: 'cpst_numb',
								xtype		: 'textfield' ,
								enableKeyEvents : true,
								labelWidth	: 50,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					}
				]
			};
		return line;
	},

});