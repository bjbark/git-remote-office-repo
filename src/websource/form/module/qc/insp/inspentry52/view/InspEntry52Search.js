Ext.define('module.qc.insp.inspentry52.view.InspEntry52Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-inspentry52-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
//		me.items =[ me.searchBasic(),me.createLine1(), me.createLine2(), me.addonSearch()];
		me.items =[ me.searchBasic()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
						,height	: 34
						,margin : '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout	: 'hbox'
						,items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
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
			}
		;
		return line;
	},
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
		line = {
			xtype: 'fieldset',
			title: '상세검색',
			collapsible: true,
			collapsed: true,
			layout: 'vbox',
			defaults: {
					xtype: 'fieldset',
					layout: 'vbox',
					margin: '0 0 5 0',
					padding: '0',
					border: 0,
				},
				fieldDefaults: {
					width: 341,
					labelWidth: 100,
					labelSeparator: ''
				},
				items: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						items: [
							{	fieldLabel	:'지시일자',
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								width		: 200,
								root		: true,
								value		: '',
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: '',
							},{	fieldLabel	: '주문번호',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								margin		: '0 0 0 2',
								clearable	: true ,
								width		: 315,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									params	: { stor_grp : _global.stor_grp , row_sts : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	fieldLabel	: Language.get('line_stat', '상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 250,
								multiSelect	: false ,
								editable	: true,
								lookupValue	: resource.lookup('line_stat')
							}
						]
					},{	xtype: 'fieldset',	layout: 'hbox',
					items: [
						{	fieldLabel	: Language.get('item','품목'),
							xtype		: 'popupfield'		,
							editable	: true,
							enableKeyEvents : true,
							name		: 'item_name'	,
							pair		: 'item_idcd'		,
							width		: 315,
							clearable	: true ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
						},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	:'납기일자',
							xtype		: 'betweenfield',
							name		: 'fr_dt2',
							pair		: 'to_dt2',
							margin		: '0 0 0 2',
							width		: 200,
							root		: true,
							value		: '',
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'to_dt2',
							pair		: 'fr_dt2',
							labelWidth	: 15,
							width		: 115,
							value		: '',
						}
					]
				}
			]
		};
		return line;
	}

});