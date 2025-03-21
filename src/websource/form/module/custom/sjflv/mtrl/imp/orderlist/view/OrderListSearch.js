Ext.define('module.custom.sjflv.mtrl.imp.orderlist.view.OrderListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-orderlist-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !impant;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								width		: 220,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-bzpl-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name	: 'bzpl_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('','Order No'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 220,
								clearable	: true,
							},{	fieldLabel	: Language.get('','등록기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								width		: 195,
								value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -1),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 110,
								labelWidth	: 17,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							}
	 					]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','Vendor'),
								xtype		: 'textfield',
								name		: '',
								width		: 220,
							},{	fieldLabel	: Language.get('','중개인'),
								xtype		: 'textfield',
								name		: 'mdtn_prsn',
								width		: 220,
							},{	fieldLabel	: Language.get('','선적예정일'),
								xtype		: 'betweenfield',
								name		: 'ship_schd_date1',
								pair		: 'ship_schd_date2',
								root		: true,
								width		: 195,
								value		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'ship_schd_date2',
								pair		: 'ship_schd_date1',
								width		: 110,
								labelWidth	: 17,
								value		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							}
	 					]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','수입구분'),
								xtype		: 'lookupfield',
								name		: 'incm_dvcd',
								lookupValue	: resource.lookup('incm_dvcd'),
								width		: 220
							},{	fieldLabel	: Language.get('','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								width		: 220,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
							},{	fieldLabel	: Language.get('','진행상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.getList('search_all').concat(resource.lookup('line_clos')),
								width		: 195
							}
	 					]
					}
				]
			};
			return line;
		}
});