Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-asmtmast-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
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
							emptyText		: '조회할 부자재코드 또는 부자재명을 입력하세요...',
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
			collapsed		: false ,
			layout			: 'vbox',
			defaults		: {	xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 },
			fieldDefaults	: {	width: 341, labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox',
					items	: [
						{	fieldLabel	: Language.get('asmt_dvcd','자재구분'),
							xtype		: 'lookupfield',
							name		: 'asmt_dvcd',
							lookupValue	: resource.lookup('search_all').concat(resource.lookup('asmt_dvcd')),
							labelWidth	: 99,
							width		: 200,
							editable	: false,
						},{	fieldLabel	: Language.get('cstm_name','거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							labelWidth	: 99,
							width		: 300,
							clearable	: true,
							editable	: true,
							enableKeyEvents : true,
							labelWidth	: 99,
							width		: 315,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								// 거래처가 매출이면 sale_cstm_yorn, 매입이면 puch_cstm_yorn
								params : { stor_grp : _global.stor_grp , line_stat : '0', sale_cstm_yorn : '1'},
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype		: 'textfield',
							name		: 'cstm_idcd',
							hidden		: true,
						},{	fieldLabel	: Language.get('prod_name','제품코드'),
							xtype		: 'popupfield',
							name		: 'prod_name',
							pair		: 'prod_idcd',
							labelWidth	: 99,
							width		: 300,
							clearable	: true,
							editable	: true,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-prod-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('prod_name'));
									pairField.setValue(records[0].get('prod_idcd'));
								}
							}
						},{	xtype		: 'textfield',
							name		: 'prod_idcd',
							hidden		: true,
						},
					]
				}
			]
		};
	return line;
	}
});