Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-purcordr2-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
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
								emptyText	: '조회할 품목코드 또는 품목명을 입력하세요.',
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
	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me = this,
		line = {
			xtype			: 'fieldset',
			title			: '상세검색',
			collapsible		: true,
			collapsed		: true,
			name			: 'collapsed',
			layout			: 'vbox',
			defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding: '0', border: 0 , },
			fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
			items			: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('istt_date','발주기간'),
							xtype		: 'betweenfield',
							name		: 'fr_dt',
							pair		: 'to_dt',
							width		: 198,
							labelWidth	: 100,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
							root		: true
						},{	fieldLabel	: '~',
							xtype		: 'betweenfield',
							name		: 'to_dt',
							pair		: 'fr_dt',
							width		: 116,
							labelWidth	: 19,
						},{	fieldLabel	: Language.get('', '부자재' ),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'asmt_name',
							pair		: 'asmt_idcd',
							width		: 315,
							emptyText	: Const.infoNull.queryAll,
							clearable	: true,
							popup		: {
								widget	: 'lookup-asmt-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp , line_stat : '0'},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].data.asmt_name);
									pairField.setValue(records[0].data.asmt_idcd);
								}
							}
						},{	name : 'asmt_idcd', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('', '~' ),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'asmt_name2',
							pair		: 'asmt_idcd2',
							labelWidth	: 12,
							width		: 235,
							emptyText	: Const.infoNull.queryAll,
							clearable	: true,
							popup		: {
								widget	: 'lookup-asmt-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp , line_stat : '0'},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].data.asmt_name);
									pairField.setValue(records[0].data.asmt_idcd);
								}
							}
						},{	name : 'asmt_idcd2', xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
	return line;
	},


});