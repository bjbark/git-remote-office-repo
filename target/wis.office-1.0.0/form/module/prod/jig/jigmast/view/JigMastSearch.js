Ext.define('module.prod.jig.jigmast.view.JigMastSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-jigmast-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.addonSearch(),];
		me.callParent();
	},
	searchBasic : function()
	{
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
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 지그코드 또는 지그명을 입력하세요...',
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

	addonSearch : function(){
		var me = this,
			line = {
				xtype		: 'fieldset',
				title		: '상세검색',
				collapsible : true,
				collapsed	: true,
				layout		: 'vbox',
				defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('jigg_name','지그명'),
								xtype		: 'textfield',
								name		: 'jigg_name',
								width		: 230,
								margin		: '0 0 0 5',
								labelWidth	: 100,
							},{	fieldLabel	: Language.get('jigg_kind_dvcd','지그종류'),
								xtype		: 'lookupfield',
								name		: 'jigg_kind_dvcd',
								width		: 160,
								labelWidth	: 70,
								lookupValue	: resource.lookup('jigg_kind_dvcd')
							},{	fieldLabel	: Language.get('jigg_stat_dvcd','지그상태'),
								xtype		: 'lookupfield',
								name		: 'jigg_stat_dvcd',
								lookupValue	: resource.lookup('jigg_stat_dvcd'),
								width		: 160,
								labelWidth	: 70
							},{	fieldLabel	: Language.get('dept_name','관리부서'),
								width		: 200,
								labelWidth	: 70,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								pair		: 'mngt_dept_idcd',
								clearable	: true,
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
							},{	fieldLabel	: Language.get('puch_cstm_name','구매거래처명'),
								xtype		: 'textfield',
								name		: 'puch_cstm_name',
								width		: 250,
								labelWidth	: 90
							},
						]
					}
				]
			};
		return line;
	}
});