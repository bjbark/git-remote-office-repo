Ext.define('module.custom.iypkg.mtrl.purc.dailypurclist.view.DailyPurcListSearch', { extend: 'Axt.form.Search',


	alias: 'widget.module-dailypurclist-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
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
								emptyText	: '조회할 품목코드 또는 품목명을 입력하세요...',
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

	createLine1 : function () {
		var me	= this,
			item =
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('','조회기간'),
									xtype		: 'betweenfield',
									name		: 'invc_date1',
									pair		: 'invc_date2',
									labelWidth	: 70,
									width		: 175,
									margin		: '0 0 0 2',
									root		: true,
									value		: new Date()
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc_date2',
									pair		: 'invc_date1',
									labelWidth	: 13,
									width		: 118,
									value		: new Date(),
									clearable	: true,
								},{	fieldLabel	: Language.get('','거래처'),
									xtype		: 'popupfield',
									name		: 'cstm_name1',
									pair		: 'cstm_code1',
									labelWidth	: 99,
									width		: 305,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_code'));
										}
									}
								},{	fieldLabel	: '~',
									xtype		: 'popupfield',
									name		: 'cstm_name2',
									pair		: 'cstm_code2',
									labelWidth	: 10,
									width		: 200,
									clearable	: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_code'));
										}
									}
								},{	name : 'cstm_code1', xtype : 'textfield' , hidden : true
								},{	name : 'cstm_code2', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('','합계구분'),
										xtype		: 'lookupfield',
										name		: 'chk',
										lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
										multiSelect	: true ,
										editable	: false,
										labelWidth	: 70,
										width		: 250,
										margin		: '0 0 0 0',
										value		: ["1","2","3","4"]
									}
								]
							}
						]
					};
	return item;
	},

});