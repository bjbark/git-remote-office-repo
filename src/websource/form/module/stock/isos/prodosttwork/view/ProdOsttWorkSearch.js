Ext.define('module.stock.isos.prodosttwork.view.ProdOsttWorkSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-prodosttwork-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
//			me.createLine1(),
			me.addonSearch()
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
								emptyText	: '조회할 작업지시번호를 입력하세요...',
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
					}
				]
			};
		return line;
	},
	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('fr_dt','출고일자'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								root		: true,
								width		: 182,
								labelWidth	: 77,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: '~',
								xtype		: 'betweenfield',
								name		: 'to_dt',
								pair		: 'fr_dt',
								width		: 115,
								labelWidth	: 15,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 250,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
								hidden		: true,
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wkct_name','공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								labelWidth	: 99,
								width		: 250,
								margin		: '0 2 0 0',
								pair		: 'wkct_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wkct-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								},
								//hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_stat' )),
								value		: '',
								width		: 170
							}
						]
					},{
						xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('', '출고창고' ),
								name		: 'ostt_wrhs_name',
								pair		: 'ostt_wrhs_idcd',
								xtype		: 'popupfield',
								width		: 298,
								labelWidth	: 77,
								//margin		: '0 2 0 20',
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: true,
								popup		: {
									widget	: 'lookup-wrhs-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
										//nameField.up('form').down('[name=proc_dept_idcd]').setValue(records[0].get('dept_idcd'));
										//nameField.up('form').down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
										//nameField.up('form').down('[name=bzpl_name]').setValue(records[0].get('bzpl_name'));
									}
								},
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							},{	name		: 'ostt_wrhs_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('', '작업지시번호' ),
								name		: 'orig_invc_numb',
								pair		: 'orig_seqn',
								xtype		: 'popupfield',
								labelWidth	: 99,
								width		: 250,
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								popup		: {
									widget	: 'lookup-pror-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('invc_numb'));
											// pairField.setValue(records[0].get('pdod_date')); //2022.02.22 - 이강훈 - orig_seqn에 생산일자가 등록되어 주석처리
									}
								},
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							},{	name		: 'orig_seqn', xtype	: 'textfield', hidden : true
							}
						]
					}
				]
			};
		return line;
	}

});