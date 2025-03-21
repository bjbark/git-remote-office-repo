Ext.define('module.qc.insp.inspreport2.view.InspReport2Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-inspreport2-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic()
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
							},{	fieldLabel	: Language.get('invc_numb','작업지시번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								pair		: 'wkfw_idcd',
								width		: 180,
								margin		: '3 1 0 0',
								clearable	: true,
								emptyText	:'작업지시번호를 입력하세요',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-pror-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
										pairField.setValue(records[0].get('wkfw_idcd'));
									}
								}
							},{	fieldLabel	: Language.get('invc_numb','검사일자'),
								xtype		: 'datefield',
								name		: 'insp_date',
								width		: 160,
								labelWidth	: 60,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	name		: 'wkfw_idcd', xtype : 'textfield' , hidden : true
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '',
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
});