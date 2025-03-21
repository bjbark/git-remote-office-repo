Ext.define('module.workshop.sale.order.ordermast.view.OrderMastSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-ordermast-search',
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
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype		: 'searchfield',
								flex		: 4,
								emptyText	: '조회할 수주일자 또는 거래처코드를 입력하세요...',
								enableKeyEvents : true,
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
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items : [
							{	fieldLabel	: Language.get('','견적기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 198,
								labelWidth	: 100,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							//	value		: Ext.Date.getFirstDateOfMonth(new Date()),
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 116,
								labelWidth	: 19,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							//	value		: new Date(),
								value		: '',
								clearable	: true
							},{	fieldLabel	: Language.get('item','회원'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								margin		: '0 0 0 -35',
								clearable	: true,
								width		: 200,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-mmbr-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mmbr_name'));
										pairField.setValue(records[0].get('mmbr_idcd'));
									}
								}
							},{	name		: 'mmbr_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('','수주확정'),
								xtype		: 'lookupfield',
								name		: 'cofm_yorn',
								margin		: '0 0 0 0',
								width		: 193,
								labelWidth	: 95,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('yorn' )),
								value		: ''
							},{	fieldLabel	: Language.get('regi_path_dvcd','등록구분'),
								xtype		: 'lookupfield',
								name		: 'regi_path_dvcd',
								margin		: '0 0 0 0',
								width		: 193,
								labelWidth	: 95,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('regi_dvcd' )),
								value		: ''
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
						{	fieldLabel	: '품목분류'	,
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							width		: 450,
							name		: 'clss_desc',
							pair		: '',
							margin		: '0 5 0 0',
							clearable	: true ,
							hidden		: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-clss-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('clss_desc'));
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
								}
							},
							listeners	: {
								change	: function(){
									var val = this.getValue();
									if( val == '' || val == null ){
										me.down('[name=lcls_idcd]').reset();
										me.down('[name=mcls_idcd]').reset();
										me.down('[name=scls_idcd]').reset();
									}
								}
							}
						},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
						},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
						},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('item','거래처'),
							xtype		: 'popupfield', editable : true, enableKeyEvents : true,
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							margin		: '0 5 0 0',
							clearable	: true,
							width		: 315,
							popup		: {
								select  : 'SINGLE',
								widget  : 'lookup-cstm-popup',
								params  : { stor_grp : _global.stor_grp , line_stat : '0' },
								result  : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true,
						},{	fieldLabel	: Language.get('line_stat','상태'),
							xtype		: 'lookupfield',
							name		: 'line_stat',
							margin		: '0 0 0 0',
							labelWidth	:  60,
							width		: 158,
							lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
							value		: '0'
						}
					]
				},
			]
		};
		return line;
	}
});